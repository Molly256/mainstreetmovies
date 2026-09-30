'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const vipLevels = [
  { level: 0, name: "VIP0", color: "#111111" },
  { level: 1, name: "VIP1", color: "#FF1493" },
  { level: 2, name: "VIP2", color: "#0096FF" },
  { level: 3, name: "VIP3", color: "#00FF7F" },
  { level: 4, name: "VIP4", color: "#8A2BE2" },
  { level: 5, name: "VIP5", color: "#FFD700" },
  { level: 6, name: "VIP6", color: "#FF0000" },
  { level: 7, name: "VIP7", color: "#800080" },
];

// USDT -> local currency rates (approx, you can update from admin later)
const usdtRates = {
  UGX: 3850, KES: 129.5, TZS: 2680, RWF: 1320, NGN: 1600, GHS: 15.8, ZAR: 18.7,
  INR: 83.5, GBP: 0.79, USD: 1, CAD: 1.36, EUR: 0.92, CNY: 7.2, BRL: 5.1,
  ETB: 125, EGP: 50.5, AED: 3.67, SAR: 3.75, TRY: 32, JPY: 153, KRW: 1340,
  PHP: 57.5, PKR: 278, BDT: 117, UZS: 12650, ZMW: 26.5, ZWL: 6000,
  XOF: 605, XAF: 605, MWK: 1740, MZN: 63.5, MAD: 10.1, BWP: 13.6,
  DZD: 134, TND: 3.1, LKR: 300, NPR: 133, MMK: 2100, THB: 36.5,
  VND: 25000, IDR: 16100, MYR: 4.7, SGD: 1.32, AUD: 1.52, NZD: 1.63,
  MXN: 17.1, ARS: 900, COP: 3900, PEN: 3.7, CLP: 940, UYU: 38.5,
  GMD: 68, GNF: 8600, SOS: 570, SLL: 22500, LRD: 193, SZL: 18.7,
  LSL: 18.7, NAD: 18.7, MGA: 4600, MUR: 46.5, MRU: 39.5, CVE: 102,
  KMF: 455, DJF: 177, ERN: 15, SSP: 800, SDG: 600, LYD: 4.8,
  TJS: 10.9, KGS: 89, KZT: 450, GEL: 2.7, AZN: 1.7, AMD: 390,
  ALL: 93, BAM: 1.8, MKD: 56.5, RSD: 108, RON: 4.6, BGN: 1.8,
  CZK: 23, PLN: 4, HUF: 365, SEK: 10.8, NOK: 10.6, DKK: 6.9,
  ISK: 139, CHF: 0.9, ILS: 3.7, JOD: 0.71, IQD: 1310, IRR: 42000,
  LBP: 89500, SYP: 13000, YER: 530, OMR: 0.38, QAR: 3.64, KWD: 0.30,
  BHD: 0.37, AFN: 72, PKR: 278, HKD: 7.82, TWD: 32.2, MOP: 8.05,
  KHR: 4050, LAK: 21600, MMK: 2100, BND: 1.32, FJD: 2.26, TOP: 2.36,
  WST: 2.77, PGK: 3.9, SBD: 8.4, VUV: 119, XPF: 110, NZD: 1.63,
  XCD: 2.7, BBD: 2, BSD: 1, BZD: 2, BMD: 1, KYD: 0.82, JMD: 155,
  TTD: 6.78, AWG: 1.8, ANG: 1.8, HTG: 132, DOP: 58.8, GTQ: 7.76,
  HNL: 24.7, NIO: 36.7, CRC: 510, PAB: 1, PYG: 7400, BOB: 6.91,
  GYD: 208, SRD: 33, CUP: 24, BWP: 13.6, ETB: 125, MGA: 4600,
  MZN: 63.5, STN: 22.5, ANG: 1.8, SBD: 8.4, VES: 36, YER: 530,
  ZMW: 26.5
}

function VipBadge({ color = "#111", size = 56, level = 0 }){
  return(
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `conic-gradient(from 0deg, #FDE68A, #D4AF37, #8B6914, #FDE68A, #D4AF37)`,
      padding: size*0.08,
      boxShadow: `0 3px 10px rgba(0,0,0,0.6)`,
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
        <svg width={size*0.40} height={size*0.30} viewBox="0 0 24 24" style={{zIndex:2}}>
          <path d="M2 18 L2 20 Q12 22 22 20 L22 18 Z M3 16 L5 8 L9 12 L12 6 L15 12 L19 8 L21 16 Z" fill="url(#gold)" stroke="#5a4200" strokeWidth="0.4"/>
          <defs><linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFF7CC"/><stop offset="100%" stopColor="#D4AF37"/></linearGradient></defs>
        </svg>
        <span style={{fontSize:size*0.15, fontWeight:900, color:'#FDE68A', zIndex:2, textShadow:'0 1px 2px black', marginTop:2}}>VIP{level}</span>
      </div>
    </div>
  )
}

function MoneyBox({ usdt, currency, symbol, label, colorClass }){
  const rate = usdtRates[currency] || 1
  const localAmount = usdt * rate
  return(
    <div className="py-3 border-b border-gray-100 last:border-0">
      <p className={`font-black ${colorClass}`}>$ {usdt.toFixed(2)} USDT</p>
      <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">≈ {symbol} {localAmount.toLocaleString(undefined,{maximumFractionDigits:2})} {currency}</p>
      <p className="text-[10px] text-gray-400 mt-1">{label}</p>
    </div>
  )
}

export default function MyPage() {
  const router = useRouter()
  const [activeBtn, setActiveBtn] = useState(null)
  const [copied, setCopied] = useState(false)
  const [userData, setUserData] = useState(null)
  const [displayPhone, setDisplayPhone] = useState('753185973')
  const [invitecode, setInvitecode] = useState('185973MS')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('user')
      if (saved) {
        const u = JSON.parse(saved)
        setUserData(u)
        const rawFallback = '256753185973'
        const raw = u?.rawPhone || rawFallback
        const dPhone = u?.displayPhone || u?.myDisplayPhone || raw.slice(-9) || localStorage.getItem('myDisplayPhone') || rawFallback.slice(-9)
        const inv = u?.invitecode || localStorage.getItem('myInvitecode') || raw.slice(-6) + 'MS'
        setDisplayPhone(dPhone)
        setInvitecode(inv)
      } else {
        const d = localStorage.getItem('myDisplayPhone')
        const inv = localStorage.getItem('myInvitecode')
        if(d) setDisplayPhone(d)
        if(inv) setInvitecode(inv)
      }
    } catch {}
  }, [])

  const currentVip = Number(userData?.vip?? userData?.vipLevel?? 0)
  const currentVipColor = vipLevels[currentVip]?.color || "#111111"
  const balance = Number(userData?.balance?? 0)
  const currency = userData?.currency || localStorage.getItem('myCurrency') || 'UGX'
  const symbol = userData?.currencySymbol || localStorage.getItem('myCurrencySymbol') || 'USh'
  const rate = usdtRates[currency] || 3850

  const copyCode = async () => {
    await navigator.clipboard.writeText(invitecode)
    setCopied(true)
    setTimeout(()=>setCopied(false), 2000)
  }

  const tabs = [
    { label: 'Income details', href: '/income', emoji: '📋', bg: '#ffe2f0' },
    { label: 'Recharge Record', href: '/recharge-record', emoji: '📄', bg: '#f0e6ff' },
    { label: 'Withdrawal records', href: '/withdraw-record', emoji: '↗️', bg: '#e6fbe6' },
    { label: 'Change password', href: '/change-password', emoji: '🔓', bg: '#ffe2f0' },
    { label: 'Change fund password', href: '/change-fund-password', emoji: '🔒', bg: '#fff0e0' },
    { label: 'APP Download', href: '/app-download', emoji: '⬇️', bg: '#e6f0ff' },
    { label: 'Switch language', href: '/language', emoji: '⚙️', bg: '#f2f2f2' },
  ]

  return (
    <div className="min-h-screen bg-white pb-[100px]">
      <div className="h-[56px] w-full px-4 flex items-center justify-between" style={{background: '#191970'}}>
        <h1 className="font-black text-[20px] tracking-wide" style={{color: '#FDE68A'}}>My</h1>
        <button className="w-8 h-8 rounded-full flex items-center justify-center border" style={{background: 'rgba(253,230,138,0.15)', borderColor: 'rgba(253,230,138,0.3)'}}>
          <span className="text-[16px]" style={{color: '#FDE68A'}}>🎧</span>
        </button>
      </div>

      <div className="bg-white p-4 flex items-start gap-3 border-b border-gray-100">
        <VipBadge color={currentVipColor} size={56} level={currentVip} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-black text-[20px] text-black">{displayPhone}</span>
            <span className="px-[10px] py-[2px] rounded-full text-[11px] font-black text-white" style={{background: '#191970', border: '1px solid #FDE68A'}}>VIP {currentVip}</span>
          </div>
          <div onClick={copyCode} className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer active:scale-95 transition" style={{background: '#191970'}}>
            <span className="text-[12px] font-bold" style={{color: '#FDE68A'}}>invitecode: {invitecode}</span>
            <span className="text-[11px]" style={{color: '#FDE68A'}}>{copied? '✅' : '📋'}</span>
          </div>
          <div className="mt-2 text-[11px] text-gray-500">{userData?.flag || '🇺🇬'} {currency} rate: 1 USDT ≈ {symbol} {rate.toLocaleString()} </div>
        </div>
      </div>

      <div className="bg-white mx-3 mt-3 rounded-2xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-3 text-center divide-x divide-y divide-gray-100">
          <div className="py-3 px-1">
            <p className="font-black text-black text-[13px]">$ {balance.toFixed(2)} USDT</p>
            <p className="text-[9px] text-gray-500">≈ {symbol} {(balance*rate).toLocaleString()} {currency}</p>
            <p className="text-[10px] text-gray-400 mt-1">Balance</p>
          </div>
          <div className="py-3 px-1">
            <p className="font-black text-[#00a651] text-[13px]">$ 0.00 USDT</p>
            <p className="text-[9px] text-gray-500">≈ {symbol} 0 {currency}</p>
            <p className="text-[10px] text-gray-400 mt-1">Recharge</p>
          </div>
          <div className="py-3 px-1">
            <p className="font-black text-[#2563eb] text-[13px]">$ 0.00 USDT</p>
            <p className="text-[9px] text-gray-500">≈ {symbol} 0 {currency}</p>
            <p className="text-[10px] text-gray-400 mt-1">Withdrawal</p>
          </div>
          <div className="py-3 px-1">
            <p className="font-black text-[#d4a017] text-[13px]">$ 0.00 USDT</p>
            <p className="text-[9px] text-gray-500">≈ {symbol} 0 {currency}</p>
            <p className="text-[10px] text-gray-400 mt-1">Task Income</p>
          </div>
          <div className="py-3 px-1">
            <p className="font-black text-[#e11d48] text-[13px]">$ 0.00 USDT</p>
            <p className="text-[9px] text-gray-500">≈ {symbol} 0 {currency}</p>
            <p className="text-[10px] text-gray-400 mt-1">Team</p>
          </div>
          <div className="py-3 px-1">
            <p className="font-black text-[#00a651] text-[13px]">$ 0.00 USDT</p>
            <p className="text-[9px] text-gray-500">≈ {symbol} 0 {currency}</p>
            <p className="text-[10px] text-gray-400 mt-1">Fund Income</p>
          </div>
        </div>

        <div className="mx-2 mt-2 rounded-xl px-4 py-3.5 flex items-center justify-between" style={{background: '#191970'}}>
          <div className="flex items-center gap-2">
            <VipBadge color={currentVipColor} size={32} level={currentVip} />
            <span className="font-black text-[14px]" style={{color: '#FDE68A'}}>{vipLevels[currentVip]?.name} Active</span>
          </div>
          <button onClick={()=>router.push('/vip')} className="px-4 py-1.5 rounded-full text-[13px] font-black text-black" style={{background: 'linear-gradient(90deg, #FDE68A, #CFA85B)'}}>Upgrade ›</button>
        </div>

        <div className="flex gap-3 p-3">
          {[
            {id:'recharge', label:'Recharge', href:'/recharge'},
            {id:'withdraw', label:'Withdrawal', href:'/withdraw'}
          ].map(b=>(
            <button key={b.id}
              onTouchStart={()=>setActiveBtn(b.id)} onTouchEnd={()=>setTimeout(()=>setActiveBtn(null),150)}
              onMouseDown={()=>setActiveBtn(b.id)} onMouseUp={()=>setTimeout(()=>setActiveBtn(null),150)}
              onClick={()=>router.push(b.href)}
              className="flex-1 py-3.5 rounded-full font-black text-[15px] border transition-all"
              style={{background: activeBtn===b.id? '#191970' : 'white', color: activeBtn===b.id? 'white' : 'black', borderColor: activeBtn===b.id? '#191970' : '#e5e7eb'}}>
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white mx-3 mt-3 rounded-2xl border border-gray-100 overflow-hidden">
        {tabs.map((item, idx)=>(
          <Link key={item.label} href={item.href} className={`flex items-center gap-3 px-4 py-[18px] ${idx!== tabs.length-1? 'border-b border-gray-100' : ''} active:bg-gray-50`}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[18px]" style={{background: item.bg}}>{item.emoji}</div>
            <span className="flex-1 font-medium text-[14.5px] text-black">{item.label}</span>
            <span className="text-gray-300 text-[18px]">›</span>
          </Link>
        ))}
      </div>
    </div>
  )
}