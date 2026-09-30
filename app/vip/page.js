'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const usdtRates = {
  UGX: 3600, KES: 129.5, TZS: 2680, RWF: 1320, NGN: 1600, GHS: 15.8, ZAR: 18.7,
  INR: 83.5, GBP: 0.79, USD: 1, CAD: 1.36, EUR: 0.92, CNY: 7.2, BRL: 5.1,
  ETB: 125, EGP: 50.5, AED: 3.67, SAR: 3.75, TRY: 32, JPY: 153, KRW: 1340,
  PHP: 57.5, PKR: 278, BDT: 117, UZS: 12650, ZMW: 26.5, ZWL: 6000,
  XOF: 605, XAF: 605, MWK: 1740, MZN: 63.5, MAD: 10.1, BWP: 13.6,
  DZD: 134, TND: 3.1, LKR: 300, NPR: 133, THB: 36.5, VND: 25000,
  IDR: 16100, MYR: 4.7, SGD: 1.32, AUD: 1.52, MXN: 17.1, ARS: 900,
  COP: 3900, PEN: 3.7, CLP: 940, UYU: 38.5, GMD: 68, GNF: 8600,
  SOS: 570, SLL: 22500, LRD: 193, SZL: 18.7, LSL: 18.7, NAD: 18.7,
  MGA: 4600, MUR: 46.5, MRU: 39.5, CVE: 102, KMF: 455, DJF: 177,
  ERN: 15, SSP: 800, SDG: 600, LYD: 4.8, TJS: 10.9, KGS: 89,
  KZT: 450, GEL: 2.7, AZN: 1.7, AMD: 390, ALL: 93, BAM: 1.8,
  MKD: 56.5, RSD: 108, RON: 4.6, BGN: 1.8, CZK: 23, PLN: 4,
  HUF: 365, SEK: 10.8, NOK: 10.6, DKK: 6.9, ISK: 139, CHF: 0.9,
  ILS: 3.7, JOD: 0.71, IQD: 1310, IRR: 42000, LBP: 89500, SYP: 13000,
  YER: 530, OMR: 0.38, QAR: 3.64, KWD: 0.30, BHD: 0.37, AFN: 72,
  HKD: 7.82, TWD: 32.2, MOP: 8.05, KHR: 4050, LAK: 21600, BND: 1.32,
  FJD: 2.26, TOP: 2.36, WST: 2.77, PGK: 3.9, SBD: 8.4, VUV: 119,
  XPF: 110, XCD: 2.7, BBD: 2, BSD: 1, BZD: 2, BMD: 1, KYD: 0.82,
  JMD: 155, TTD: 6.78, AWG: 1.8, ANG: 1.8, HTG: 132, DOP: 58.8,
  GTQ: 7.76, HNL: 24.7, NIO: 36.7, CRC: 510, PAB: 1, PYG: 7400,
  BOB: 6.91, GYD: 208, SRD: 33, CUP: 24, VES: 36
}

// VIP in USDT - base currency
const vipLevels = [
  { level: 0, name: "VIP0", color: "#111111", deposit: 0, daily: 0.5, videos: 3, perVideo: 0.16, require: "0 active members" },
  { level: 1, name: "VIP1", color: "#FF1493", deposit: 19.44, daily: 0.5, videos: 3, perVideo: 0.16, require: "0 active members" },
  { level: 2, name: "VIP2", color: "#0096FF", deposit: 66.67, daily: 2.17, videos: 6, perVideo: 0.36, require: "0 active members" },
  { level: 3, name: "VIP3", color: "#00AA44", deposit: 166.67, daily: 5.28, videos: 10, perVideo: 0.53, require: "2 active members" },
  { level: 4, name: "VIP4", color: "#8A2BE2", deposit: 250, daily: 8.33, videos: 15, perVideo: 0.56, require: "10 active members" },
  { level: 5, name: "VIP5", color: "#D4AF37", deposit: 416.67, daily: 13.89, videos: 20, perVideo: 0.69, require: "15 active members" },
  { level: 6, name: "VIP6", color: "#FF0000", deposit: 833.33, daily: 27.78, videos: 25, perVideo: 1.11, require: "25 active members" },
  { level: 7, name: "VIP7", color: "#4B0082", deposit: 1388.89, daily: 69.44, videos: 40, perVideo: 1.74, require: "30 active members" },
];

function VipBadge({ color = "#111", size = 80, level = 0 }){
  return(
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `conic-gradient(from 0deg, #FDE68A, #D4AF37, #8B6914, #FDE68A, #D4AF37)`,
      padding: size*0.08,
      boxShadow: `0 3px 10px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.8)`,
      position: 'relative', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {[...Array(12)].map((_,i)=>(
        <div key={i} style={{
          position:'absolute', width:size*0.18, height:size*0.18,
          background:'linear-gradient(180deg, #FDE68A, #8B6914)',
          clipPath:'polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%)',
          left:'50%', top:'50%',
          transform:`translate(-50%,-50%) rotate(${i*30}deg) translateY(-${size*0.5}px)`,
          zIndex:0
        }}/>
      ))}
      <div style={{
        width: '100%', height: '100%', borderRadius: '50%',
        background: `radial-gradient(circle at 35% 30%, ${color}FF, ${color} 60%, #000)`,
        border: `2px solid #5a4200`,
        display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        boxShadow: 'inset 0 3px 8px rgba(255,255,255,0.4), inset 0 -4px 8px rgba(0,0,0,0.8)',
        position:'relative', zIndex:1, overflow:'hidden'
      }}>
        <div style={{position:'absolute', top:'6%', left:'15%', width:'60%', height:'32%', background:'linear-gradient(180deg, rgba(255,255,255,0.55), transparent)', borderRadius:'50%'}} />
        <svg width={size*0.40} height={size*0.30} viewBox="0 0 24 24" style={{zIndex:2, filter:'drop-shadow(0 1px 1px black)'}}>
          <path d="M2 18 L2 20 Q12 22 22 20 L22 18 Z M3 16 L5 8 L9 12 L12 6 L15 12 L19 8 L21 16 Z" fill="url(#gold)" stroke="#5a4200" strokeWidth="0.4"/>
          <defs><linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFF7CC"/><stop offset="100%" stopColor="#D4AF37"/></linearGradient></defs>
        </svg>
        <span style={{fontSize:size*0.15, fontWeight:900, color:'#FDE68A', zIndex:2, textShadow:'0 1px 2px black', marginTop:2}}>VIP{level}</span>
      </div>
    </div>
  )
}

export default function VipPage(){
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [balance, setBalance] = useState(0)
  const [currentVip, setCurrentVip] = useState(0)
  const [currency, setCurrency] = useState('UGX')
  const [symbol, setSymbol] = useState('USh')
  const [rate, setRate] = useState(3600)

  useEffect(()=>{
    try{
      const saved = localStorage.getItem('user')
      const cur = localStorage.getItem('myCurrency') || 'UGX'
      const sym = localStorage.getItem('myCurrencySymbol') || 'USh'
      const r = usdtRates[cur] || 3600
      setCurrency(cur)
      setSymbol(sym)
      setRate(r)
      if(saved){
        const u = JSON.parse(saved)
        setUser(u)
        setBalance(Number(u.balance || 0))
        setCurrentVip(Number(u.vip?? u.vipLevel?? 0))
        if(u?.currency){
          setCurrency(u.currency)
          setSymbol(u.currencySymbol || sym)
          setRate(usdtRates[u.currency] || 3600)
        }
      }
    }catch{}
  },[])

  const handleUpgrade = (vip) => {
    if(vip.level <= currentVip){
      alert(`You are already ${vipLevels[currentVip].name} or higher`)
      return
    }
    const cost = vip.deposit
    if(balance < cost){
      alert(`Insufficient balance. Need $${cost.toFixed(2)} USDT (≈ ${symbol} ${(cost*rate).toLocaleString()} ${currency}), you have $${balance.toFixed(2)} USDT`)
      return
    }
    const newBalance = balance - cost
    const updatedUser = {...user, vip: vip.level, vipLevel: vip.level, balance: newBalance, currentVipColor: vip.color }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    localStorage.setItem('balance', String(newBalance))
    setBalance(newBalance)
    setCurrentVip(vip.level)
    setUser(updatedUser)
    alert(`Upgraded to ${vip.name} successfully!`)
  }

  return(
    <div className="min-h-screen bg-white pb-[100px]">
      <div className="h-[56px] w-full px-4 flex items-center justify-between sticky top-0 z-50" style={{background: '#191970'}}>
        <button onClick={()=>router.back()} className="text-[20px] font-black" style={{color: '#FDE68A'}}>‹</button>
        <h1 className="font-black text-[20px] tracking-wide" style={{color: '#FDE68A'}}>VIP LEVELS</h1>
        <div className="w-[20px]" />
      </div>

      <div className="bg-[#0a0a0a] text-white p-4 min-h-[calc(100vh-56px)]">
        {user && (
          <div className="max-w-4xl mx-auto mt-2 mb-4 bg-[#1e1e1e] rounded-2xl p-4 flex items-center justify-between border border-zinc-800">
            <div className="flex items-center gap-3">
              <VipBadge color={vipLevels[currentVip]?.color || "#111"} size={54} level={currentVip} />
              <div>
                <div className="font-black text-[16px]">Current: {vipLevels[currentVip]?.name}</div>
                <div className="text-[12px] text-zinc-400">$ {balance.toFixed(2)} USDT ≈ {symbol} {(balance*rate).toLocaleString()} {currency}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-zinc-400">VIP</div>
              <div className="font-black text-[20px] text-yellow-300">{currentVip}</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-2">
          {vipLevels.map(vip=>{
            const isCurrent = vip.level === currentVip
            const isOwned = vip.level <= currentVip
            const localDeposit = vip.deposit * rate
            const localDaily = vip.daily * rate
            const localPerVideo = vip.perVideo * rate
            return(
              <div key={vip.level} className={`rounded-[26px] p-5 flex flex-col items-center border ${isCurrent? 'border-yellow-400' : 'border-zinc-800'} ${isOwned? 'bg-[#2a2a1e]' : 'bg-[#1e1e1e]'}`}>
                <VipBadge color={vip.color} size={88} level={vip.level} />
                <h2 className="text-xl font-black mt-3">{vip.name} {isCurrent && <span className="text-[11px] ml-2 px-2 py-1 rounded-full bg-yellow-400 text-black">CURRENT</span>}</h2>
                <div className="w-full mt-4 bg-black/40 rounded-2xl p-4 space-y-3 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Deposit</span>
                    <span className="text-right">
                      <span className="font-bold text-yellow-300 block">$ {vip.deposit.toFixed(2)} USDT</span>
                      <span className="text-[11px] text-zinc-400">≈ {symbol} {localDeposit.toLocaleString()} {currency}</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Daily</span>
                    <span className="text-right">
                      <span className="font-bold text-green-400 block">$ {vip.daily.toFixed(2)} USDT</span>
                      <span className="text-[11px] text-zinc-400">≈ {symbol} {localDaily.toLocaleString()} {currency}</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Videos</span>
                    <span className="text-right">
                      <span className="font-bold block">{vip.videos} @ $ {vip.perVideo.toFixed(2)}</span>
                      <span className="text-[11px] text-zinc-400">≈ {symbol} {localPerVideo.toLocaleString()} {currency} each</span>
                    </span>
                  </div>
                  <div className="flex justify-between"><span className="text-zinc-400">Require</span><span className="font-bold">{vip.require}</span></div>
                </div>
                <button
                  onClick={()=>handleUpgrade(vip)}
                  disabled={isOwned}
                  className={`mt-4 w-full py-3 rounded-xl font-black text-[14px] tracking-wide active:scale-95 ${isOwned? 'opacity-50' : ''}`}
                  style={{
                    background: isOwned? '#333' : 'linear-gradient(90deg, #CFA85B, #FDE68A, #CFA85B)',
                    color: isOwned? '#888' : '#0A1433'
                  }}
                >
                  {isCurrent? 'CURRENT VIP' : isOwned? 'OWNED' : `UPGRADE - $${vip.deposit.toFixed(2)} USDT`}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}