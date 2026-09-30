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

function VipBadge({ color = "#111", size = 56, level = 0 }){
  return(
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `radial-gradient(circle at 35% 35%, ${color}, #000 70%)`,
      border: `3.5px solid ${color}`,
      boxShadow: `0 0 18px ${color}99, inset 0 0 12px rgba(255,255,255,0.2)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontWeight: 900, fontStyle: 'italic', color: '#fff', lineHeight: 1, flexShrink: 0
    }}>
      <span style={{ fontSize: size*0.20 }}>VIP</span>
      <span style={{ fontSize: size*0.30 }}>{level}</span>
    </div>
  )
}

export default function MyPage() {
  const router = useRouter()
  const [activeBtn, setActiveBtn] = useState(null)
  const [copied, setCopied] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) {
      try { setUserData(JSON.parse(saved)) } catch {}
    }
  }, [])

  const rawPhoneFallback = '256753185973'
  const rawPhone = userData?.rawPhone || rawPhoneFallback
  const displayPhone = userData?.displayPhone || userData?.myDisplayPhone || rawPhone.slice(-9) || localStorage.getItem('myDisplayPhone') || rawPhoneFallback.slice(-9)
  const invitecode = userData?.invitecode || localStorage.getItem('myInvitecode') || rawPhone.slice(-6) + 'MS'

  const currentVip = Number(userData?.vip?? userData?.vipLevel?? 0)
  const currentVipColor = vipLevels[currentVip]?.color || "#111111"
  const balance = Number(userData?.balance?? 0)

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
      <div className="h-[56px] w-full px-4 flex items-center justify-between"
           style={{background: '#191970'}}>
        <h1 className="font-black text-[20px] tracking-wide" style={{color: '#FDE68A'}}>My</h1>
        <button className="w-8 h-8 rounded-full flex items-center justify-center border" style={{background: 'rgba(253,230,138,0.15)', borderColor: 'rgba(253,230,138,0.3)'}}>
          <span className="text-[16px]" style={{color: '#FDE68A'}}>🎧</span>
        </button>
      </div>

      {/* User Info - NOW WITH CODED BADGE */}
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
        </div>
      </div>

      {/* Money Grid */}
      <div className="bg-white mx-3 mt-3 rounded-2xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-3 text-center">
          <div className="py-4 border-b border-gray-100"><p className="font-black text-black">$ {balance.toFixed(2)}</p><p className="text-[11px] text-gray-500">Balance</p></div>
          <div className="py-4 border-b border-x border-gray-100"><p className="font-black text-[#00a651]">$ 0.00</p><p className="text-[11px] text-gray-500">Recharge amount</p></div>
          <div className="py-4 border-b border-gray-100"><p className="font-black text-[#2563eb]">$ 0.00</p><p className="text-[11px] text-gray-500">Withdrawal amount</p></div>
          <div className="py-4"><p className="font-black text-[#d4a017]">$ 0.00</p><p className="text-[11px] text-gray-500">Task Income</p></div>
          <div className="py-4 border-x border-gray-100"><p className="font-black text-[#e11d48]">$ 0.00</p><p className="text-[11px] text-gray-500">Team commission</p></div>
          <div className="py-4"><p className="font-black text-[#00a651]">$ 0.00</p><p className="text-[11px] text-gray-500">Fund Income</p></div>
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

      {/* Tabs */}
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