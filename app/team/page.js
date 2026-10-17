'use client'
import { useState, useEffect } from 'react'

export default function TeamPage() {
  const [user, setUser] = useState(null)
  const [team, setTeam] = useState({ totalEarnings: 0, totalTopup: 0, totalPeople: 0, A: [], B: [], C: [] })
  const [activeLevel, setActiveLevel] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user') || 'null')
    setUser(u)
    if (u) fetchTeam(u.id || u.invitecode)
  }, [])

  const fetchTeam = async (id) => {
    try {
      const res = await fetch(`/api/team?userId=${id}`)
      const data = await res.json()
      setTeam(data)
    } catch {
      setTeam({ totalEarnings: 0, totalTopup: 0, totalPeople: 0, A: [], B: [], C: [] })
    }
  }

  const inviteLink = user? `${window.location.origin}/r/${user.invitecode || user.inviteCode}` : ''

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const totalPeople = team.A.length + team.B.length + team.C.length

  return (
    <div className="min-h-screen bg-[#f5f7fb] pb-[100px]">
      <div className="h-[65px] bg-[#4169E1] flex items-center px-5 border-b border-[#CFA85B]/20">
        <h1 className="text-[#FDE68A] font-black tracking-[0.2em] text-[18px]">TEAM</h1>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <div className="rounded-[20px] p-5 bg-[#4169E1] flex items-center justify-between relative overflow-hidden">
          <div>
            <p className="text-white text-[12px] font-black tracking-widest mb-2">Team Network</p>
            <p className="text-white text-[32px] font-black">${team.totalEarnings?.toFixed(2) || '0.00'}</p>
            <p className="text-white text-[12px] mt-1 font-bold">Total team earnings</p>
          </div>
          <div className="w-[90px] h-[90px] bg-gradient-to-br from-[#CFA85B] to-[#FDE68A] rounded-full flex flex-col items-center justify-center shadow-[0_0_20px_rgba(207,168,91,0.5)] border border-black">
            <p className="text-black font-black text-[24px] leading-none">{totalPeople}</p>
            <p className="text-black text-[10px] font-black text-center leading-tight mt-1">Number of<br/>people</p>
          </div>
        </div>

        <div className="bg-white rounded-[14px] p-4 flex items-center gap-3 border border-black shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#4169E1] flex items-center justify-center text-[#FDE68A]">👥</div>
          <div className="flex-1 overflow-hidden">
            <p className="text-[13px] font-black text-black">Copy personal invite link</p>
            <p className="text-[11px] text-black font-bold truncate">{inviteLink}</p>
          </div>
          <button onClick={copyLink} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-black">
            {copied? '✓' : '📄'}
          </button>
        </div>
        {copied && <p className="text-[11px] text-black font-black text-center -mt-2">Link copied!</p>}

        <div className="bg-white rounded-[14px] p-4 border border-black shadow-sm">
          <p className="text-[12px] text-black font-black">Team top-up</p>
          <p className="text-[20px] font-black text-black">${team.totalTopup?.toFixed(2) || '0.00'}</p>
        </div>

        <div className="bg-white rounded-[20px] p-4 border border-black">
          <h2 className="font-black text-[15px] mb-4 text-black">My team</h2>
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => setActiveLevel('A')} className="bg-[#f8fafc] rounded-[14px] p-3 flex flex-col items-center border border-black active:scale-95 transition">
              <div className="w-8 h-8 bg-[#4169E1] rounded-[8px] flex items-center justify-center text-white font-black text-[12px]">A</div>
              <p className="font-black text-[20px] mt-2 text-black">{team.A.length}</p>
              <p className="text-[11px] font-black text-black">Level A</p>
              <p className="text-[10px] text-black font-black">Number of people</p>
            </button>
            <button onClick={() => setActiveLevel('B')} className="bg-[#f8fafc] rounded-[14px] p-3 flex flex-col items-center border border-black active:scale-95 transition">
              <div className="w-8 h-8 bg-[#4169E1] rounded-[8px] flex items-center justify-center text-white font-black text-[12px]">B</div>
              <p className="font-black text-[20px] mt-2 text-black">{team.B.length}</p>
              <p className="text-[11px] font-black text-black">Level B</p>
              <p className="text-[10px] text-black font-black">Number of people</p>
            </button>
            <button onClick={() => setActiveLevel('C')} className="bg-[#f8fafc] rounded-[14px] p-3 flex flex-col items-center border border-black active:scale-95 transition">
              <div className="w-8 h-8 bg-[#4169E1] rounded-[8px] flex items-center justify-center text-white font-black text-[12px]">C</div>
              <p className="font-black text-[20px] mt-2 text-black">{team.C.length}</p>
              <p className="text-[11px] font-black text-black">Level C</p>
              <p className="text-[10px] text-black font-black">Number of people</p>
            </button>
          </div>

          {activeLevel && (
            <div className="mt-4 bg-[#4169E1] rounded-[14px] p-3 border border-black">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[#FDE68A] font-black text-[12px]">Level {activeLevel} Members ({team[activeLevel].length})</p>
                <button onClick={() => setActiveLevel(null)} className="text-white text-xs font-black">✕</button>
              </div>
              {team[activeLevel].length === 0? (
                <p className="text-white font-bold text-[12px] py-2">No members yet</p>
              ) : (
                team[activeLevel].map((m, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-white/10 last:border-0">
                    <p className="text-white font-bold text-[12px]">{m.username || m.phone}</p>
                    <p className="text-[#FDE68A] font-black text-[11px]">{m.currency} {m.balance || 0}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-black text-[16px] mb-3 text-black">Commission levels</h2>
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-[14px] p-4 flex items-center justify-between border border-black">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4169E1] rounded-[10px] flex items-center justify-center text-white font-black">A</div>
                <div>
                  <p className="font-black text-[14px] text-black">Level A</p>
                  <p className="text-[11px] text-black font-black">{team.A.length} Number of people</p>
                </div>
              </div>
              <p className="font-black text-black text-[18px]">10%</p>
            </div>

            <div className="bg-white rounded-[14px] p-4 flex items-center justify-between border border-black">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4169E1] rounded-[10px] flex items-center justify-center text-white font-black">B</div>
                <div>
                  <p className="font-black text-[14px] text-black">Level B</p>
                  <p className="text-[11px] text-black font-black">{team.B.length} Number of people</p>
                </div>
              </div>
              <p className="font-black text-black text-[18px]">2%</p>
            </div>

            <div className="bg-white rounded-[14px] p-4 flex items-center justify-between border border-black">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4169E1] rounded-[10px] flex items-center justify-center text-white font-black">C</div>
                <div>
                  <p className="font-black text-[14px] text-black">Level C</p>
                  <p className="text-[11px] text-black font-black">{team.C.length} Number of people</p>
                </div>
              </div>
              <p className="font-black text-black text-[18px]">1%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}