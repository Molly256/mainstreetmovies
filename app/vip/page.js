'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const vipLevels = [
  { level: 0, name: "VIP0", color: "#111111", deposit: "0.00 UGX", daily: "1,800 UGX", videos: 3, perVideo: 600, require: "0 active members" },
  { level: 1, name: "VIP1", color: "#FF1493", deposit: "70,000 UGX", daily: "1,800 UGX", videos: 3, perVideo: 600, require: "0 active members" },
  { level: 2, name: "VIP2", color: "#0096FF", deposit: "240,000 UGX", daily: "7,800 UGX", videos: 6, perVideo: 1300, require: "0 active members" },
  { level: 3, name: "VIP3", color: "#00AA44", deposit: "600,000 UGX", daily: "19,000 UGX", videos: 10, perVideo: 1900, require: "2 active members" },
  { level: 4, name: "VIP4", color: "#8A2BE2", deposit: "900,000 UGX", daily: "30,000 UGX", videos: 15, perVideo: 2000, require: "10 active members" },
  { level: 5, name: "VIP5", color: "#D4AF37", deposit: "1,500,000 UGX", daily: "50,000 UGX", videos: 20, perVideo: 2500, require: "15 active members" },
  { level: 6, name: "VIP6", color: "#FF0000", deposit: "3,000,000 UGX", daily: "100,000 UGX", videos: 25, perVideo: 4000, require: "25 active members" },
  { level: 7, name: "VIP7", color: "#4B0082", deposit: "5,000,000 UGX", daily: "250,000 UGX", videos: 40, perVideo: 6250, require: "30 active members" },
];

function parseDeposit(str){
  const num = String(str).replace(/[^\d]/g,'')
  return Number(num || 0)
}

// NEW CROWN BADGE - LIKE YOUR SCREENSHOT - COLOR CHANGES PER VIP
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
      {/* Spikes */}
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

  useEffect(()=>{
    try{
      const saved = localStorage.getItem('user')
      if(saved){
        const u = JSON.parse(saved)
        setUser(u)
        setBalance(Number(u.balance || 0))
        setCurrentVip(Number(u.vip?? u.vipLevel?? 0))
      }
    }catch{}
  },[])

  const handleUpgrade = (vip) => {
    if(vip.level <= currentVip){
      alert(`You are already ${vipLevels[currentVip].name} or higher`)
      return
    }
    const cost = parseDeposit(vip.deposit)
    if(balance < cost){
      alert(`Insufficient balance. Need ${vip.deposit}, you have ${balance.toLocaleString()} UGX`)
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
                <div className="text-[12px] text-zinc-400">Balance: {balance.toLocaleString()} UGX</div>
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
            return(
              <div key={vip.level} className={`rounded-[26px] p-5 flex flex-col items-center border ${isCurrent? 'border-yellow-400' : 'border-zinc-800'} ${isOwned? 'bg-[#2a2a1e]' : 'bg-[#1e1e1e]'}`}>
                <VipBadge color={vip.color} size={88} level={vip.level} />
                <h2 className="text-xl font-black mt-3">{vip.name} {isCurrent && <span className="text-[11px] ml-2 px-2 py-1 rounded-full bg-yellow-400 text-black">CURRENT</span>}</h2>
                <div className="w-full mt-4 bg-black/40 rounded-2xl p-4 space-y-2 text-[13px]">
                  <div className="flex justify-between"><span className="text-zinc-400">Deposit</span><span className="font-bold text-yellow-300">{vip.deposit}</span></div>
                  <div className="flex justify-between"><span className="text-zinc-400">Daily</span><span className="font-bold text-green-400">{vip.daily}</span></div>
                  <div className="flex justify-between"><span className="text-zinc-400">Videos</span><span className="font-bold">{vip.videos} @ {vip.perVideo} UGX</span></div>
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
                  {isCurrent? 'CURRENT VIP' : isOwned? 'OWNED' : `UPGRADE`}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}