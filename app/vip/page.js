'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const vipLevels = [
  { level: 0, name: "VIP0", color: "#111111", deposit: "0.00 UGX", daily: "1,800 UGX", videos: 3, perVideo: 600, require: "0 active members" },
  { level: 1, name: "VIP1", color: "#FF1493", deposit: "70,000 UGX", daily: "1,800 UGX", videos: 3, perVideo: 600, require: "0 active members" },
  { level: 2, name: "VIP2", color: "#0096FF", deposit: "240,000 UGX", daily: "7,800 UGX", videos: 6, perVideo: 1300, require: "0 active members" },
  { level: 3, name: "VIP3", color: "#00FF7F", deposit: "600,000 UGX", daily: "19,000 UGX", videos: 10, perVideo: 1900, require: "2 active members" },
  { level: 4, name: "VIP4", color: "#8A2BE2", deposit: "900,000 UGX", daily: "30,000 UGX", videos: 15, perVideo: 2000, require: "10 active members" },
  { level: 5, name: "VIP5", color: "#FFD700", deposit: "1,500,000 UGX", daily: "50,000 UGX", videos: 20, perVideo: 2500, require: "15 active members" },
  { level: 6, name: "VIP6", color: "#FF0000", deposit: "3,000,000 UGX", daily: "100,000 UGX", videos: 25, perVideo: 4000, require: "25 active members" },
  { level: 7, name: "VIP7", color: "#800080", deposit: "5,000,000 UGX", daily: "250,000 UGX", videos: 40, perVideo: 6250, require: "30 active members" },
];

function parseDeposit(str){
  const num = String(str).replace(/[^\d]/g,'')
  return Number(num || 0)
}

// CODED BADGE - NO IMAGE, NO COMPONENT FILE
function VipBadge({ color = "#111", size = 80, level = 0 }){
  return(
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `radial-gradient(circle at 35% 35%, ${color}, #000 70%)`,
      border: `3.5px solid ${color}`,
      boxShadow: `0 0 18px ${color}99, inset 0 0 12px rgba(255,255,255,0.2)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontWeight: 900, fontStyle: 'italic', color: '#fff', lineHeight: 1
    }}>
      <span style={{ fontSize: size*0.22, letterSpacing: '0.5px' }}>VIP</span>
      <span style={{ fontSize: size*0.32, marginTop: '1px' }}>{level}</span>
    </div>
  )
}

export default function VipPage(){
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [balance, setBalance] = useState(0)
  const [currentVip, setCurrentVip] = useState(0)

  useEffect(()=>{
    const saved = localStorage.getItem('user')
    if(saved){
      const u = JSON.parse(saved)
      setUser(u)
      setBalance(Number(u.balance || 0))
      setCurrentVip(Number(u.vip?? u.vipLevel?? 0))
    }
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
      {/* HEADER - SAME AS MY - midnight blue bg, bold golden 56px */}
      <div className="h-[56px] w-full px-4 flex items-center justify-between sticky top-0 z-50"
           style={{background: '#191970'}}>
        <button onClick={()=>router.back()} className="text-[20px] font-black" style={{color: '#FDE68A'}}>‹</button>
        <h1 className="font-black text-[20px] tracking-wide" style={{color: '#FDE68A'}}>VIP LEVELS</h1>
        <div className="w-[20px]" />
      </div>

      <div className="bg-[#0a0a0a] text-white p-4 min-h-[calc(100vh-56px)]">
        {user && (
          <div className="max-w-4xl mx-auto mt-2 mb-4 bg-[#1e1e1e] rounded-2xl p-4 flex items-center justify-between border border-zinc-800">
            <div className="flex items-center gap-3">
              <VipBadge color={vipLevels[currentVip]?.color || "#111"} size={50} level={currentVip} />
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
                <VipBadge color={vip.color} size={80} level={vip.level} />
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