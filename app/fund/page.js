'use client'
import { useState, useEffect } from 'react'

const RATES = {
  UGX: 3850, KES: 130, TZS: 2650, NGN: 1600, GHS: 15.5, ZAR: 18.5,
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83,
}

const FUND_PLANS = [
  { id: 1, name: 'mainstreetmovies Fund Project #1', cycle: 5, invest: 5, daily: 1.10 },
  { id: 2, name: 'mainstreetmovies Fund Project #2', cycle: 30, invest: 150, daily: 5.30 },
  { id: 3, name: 'mainstreetmovies Fund Project #3', cycle: 90, invest: 300, daily: 3.80 },
  { id: 4, name: 'mainstreetmovies Fund Project #4', cycle: 180, invest: 900, daily: 6.00 },
]

export default function FundPage() {
  const [tab, setTab] = useState('plans')
  const [user, setUser] = useState(null)
  const [myFunds, setMyFunds] = useState([])

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user') || 'null')
    setUser(u)
    setMyFunds(JSON.parse(localStorage.getItem('myFunds') || '[]'))
  }, [])

  const currency = user?.currency || 'USD'
  const symbol = user?.currencySymbol || '$'
  const rate = RATES[currency] || 1
  const convert = (usd) => currency === 'USD'? null : `${symbol} ${(usd * rate).toLocaleString()}`

  const joinPlan = (plan) => {
    const updated = [...myFunds, {...plan, joinedAt: Date.now(), status: 'Active' }]
    setMyFunds(updated)
    localStorage.setItem('myFunds', JSON.stringify(updated))
    setTab('myfunds')
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] pb-[100px]">
      <div className="h-[65px] bg-[#4169E1] flex items-center px-5 border-b border-[#CFA85B]/20">
        <h1 className="text-[#FDE68A] font-black tracking-[0.2em] text-[18px]">FUND</h1>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <div className="rounded-[20px] p-5 bg-[#4169E1]">
          <div className="inline-block bg-white/10 rounded-full px-3 py-1 mb-3">
            <p className="text-[#CFA85B] text-[11px] font-bold">mainstreetmovies Fund Project</p>
          </div>
          <h2 className="text-white font-black text-[22px]">mainstreetmovies Fund Project</h2>
          <p className="text-white/60 text-[12px] mt-1">Fixed-cycle USDT plans with daily income automatically credited.</p>
        </div>

        <div className="flex bg-white rounded-full p-1 border border-slate-100">
          <button onClick={() => setTab('plans')} className={`flex-1 h-10 rounded-full font-bold text-[13px] ${tab === 'plans'? 'bg-[#4169E1] text-[#FDE68A]' : 'text-slate-500'}`}>Fund Plans</button>
          <button onClick={() => setTab('myfunds')} className={`flex-1 h-10 rounded-full font-bold text-[13px] ${tab === 'myfunds'? 'bg-[#4169E1] text-[#FDE68A]' : 'text-slate-500'}`}>My Funds</button>
        </div>

        {tab === 'plans' && (
          <div className="flex flex-col gap-3">
            {FUND_PLANS.map(plan => (
              <div key={plan.id} className="bg-white rounded-[16px] p-4 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-[#FEF3C7] text-[#92400E] text-[10px] font-bold px-2 py-1 rounded-full">Featured</span>
                  <span className="text-[10px] text-slate-400">Daily income automatically credited</span>
                </div>
                <h4 className="font-black text-[14px] mb-3">{plan.name}</h4>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-[#f8fafc] rounded-[10px] p-2.5">
                    <p className="text-[10px] text-slate-400">Cycle</p>
                    <p className="font-bold text-[13px]">{plan.cycle} day</p>
                  </div>
                  <div className="bg-[#f8fafc] rounded-[10px] p-2.5">
                    <p className="text-[10px] text-slate-400">Investment</p>
                    <p className="font-bold text-[13px]">{plan.invest.toFixed(2)} USDT</p>
                    {convert(plan.invest) && <p className="text-[10px] text-[#4169E1] font-bold mt-1">{convert(plan.invest)}</p>}
                  </div>
                  <div className="bg-[#f8fafc] rounded-[10px] p-2.5">
                    <p className="text-[10px] text-slate-400">Daily income</p>
                    <p className="font-bold text-[13px] text-[#4169E1]">{plan.daily.toFixed(2)} USDT</p>
                    {convert(plan.daily) && <p className="text-[10px] text-[#4169E1] font-bold mt-1">{convert(plan.daily)}</p>}
                  </div>
                </div>
                <button onClick={() => joinPlan(plan)} className="w-full h-11 bg-[#4169E1] text-[#FDE68A] rounded-full font-black text-[13px]">Join now</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'myfunds' && (
          <div className="flex flex-col gap-3">
            {myFunds.length === 0? <div className="bg-white rounded-[16px] p-10 text-center border"><p className="text-slate-400 text-[13px]">No active funds yet</p></div> :
              myFunds.map((f,i) => (
                <div key={i} className="bg-white rounded-[16px] p-4 border">
                  <div className="flex justify-between"><h4 className="font-bold text-[13px]">{f.name}</h4><span className="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-full font-bold">{f.status}</span></div>
                  <p className="text-[12px] mt-2">Daily: <b>{f.daily} USDT</b> {convert(f.daily) && <span className="text-[#4169E1] font-bold">/ {convert(f.daily)}</span>}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}