"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const VIP = {
  0: { name: "VIP0", count: 3, perVideo: 600 },
  1: { name: "VIP1", count: 3, perVideo: 600 },
  2: { name: "VIP2", count: 6, perVideo: 1300 },
  3: { name: "VIP3", count: 10, perVideo: 1900 },
  4: { name: "VIP4", count: 15, perVideo: 2000 },
  5: { name: "VIP5", count: 20, perVideo: 2500 },
  6: { name: "VIP6", count: 25, perVideo: 4000 },
  7: { name: "VIP7", count: 40, perVideo: 6250 },
};

export default function TaskPage(){
  const [videos,setVideos]=useState([]);
  const [vipLevel,setVipLevel]=useState(0);
  const [completed, setCompleted] = useState([]);
  const [vipExpired, setVipExpired] = useState(false);

  useEffect(()=>{
    fetch('/trailer_data.json').then(r=>r.json()).then(data=> setVideos(data))
 .catch(()=> fetch('/trailers_data.json').then(r=>r.json()).then(data=> setVideos(data)));

    try{
      const u = JSON.parse(localStorage.getItem('user')||'{}');
      setVipLevel(Number(u.vip??u.vipLevel??0));
    }catch{}

    const today = new Date().toDateString();
    const dailyDone = JSON.parse(localStorage.getItem('task_'+today)||'[]');
    const allDone = JSON.parse(localStorage.getItem('completedTasks')||'[]');
    setCompleted([...new Set([...dailyDone,...allDone].map(String))]);

    // Silent VIP0 expiry check - Florida time 00:00
    const expiryStr = localStorage.getItem('vip0_expiry');
    if(expiryStr){
      const nowFlorida = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
      const expiry = new Date(expiryStr);
      if(nowFlorida >= expiry){
        setVipExpired(true);
        setVipLevel(-1);
        try{
          const u = JSON.parse(localStorage.getItem('user')||'{}');
          if(u.vip === 0){
            u.vip = -1;
            u.vipExpired = true;
            localStorage.setItem('user', JSON.stringify(u));
          }
        }catch{}
      }
    }
  },[]);

  const vip = VIP[vipLevel] || VIP[0];
  const usdt = (vip.perVideo/3600).toFixed(2);
  const dailyAssigned = videos.slice(0, vip.count);
  const available = dailyAssigned.filter(v =>!completed.includes(String(v.id)));

  if(vipExpired || vipLevel === -1){
    return(
      <div className="min-h-screen bg-white pb-24">
        <div className="bg-[#191970] px-4 py-5 flex justify-between items-center">
          <h1 className="font-black text-[22px] text-[#FFD700] tracking-wide">Tasks</h1>
          <Link href="/task/history">
            <button className="bg-white/10 border border-[#FFD700]/30 px-5 py-2.5 rounded-full font-bold text-[#FFD700] text-[12px]">History</button>
          </Link>
        </div>
        <div className="text-center mt-24 p-6">
          <p className="text-5xl">🔒</p>
          <p className="font-black text-black text-[20px] mt-4">VIP0 Closed</p>
          <p className="text-gray-500 text-sm mt-2">Upgrade to continue tasks</p>
          <Link href="/vip">
            <button className="mt-6 bg-[#191970] text-[#FFD700] px-8 py-3 rounded-full font-black">Upgrade VIP →</button>
          </Link>
        </div>
      </div>
    );
  }

  return(
    <div className="min-h-screen bg-white pb-24">
      <div className="bg-[#191970] px-4 py-5 flex justify-between items-center">
        <h1 className="font-black text-[22px] text-[#FFD700] tracking-wide">Tasks</h1>
        <Link href="/task/history">
          <button className="bg-white/10 border border-[#FFD700]/30 px-5 py-2.5 rounded-full font-bold text-[#FFD700] text-[12px]">History</button>
        </Link>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-black text-black text-lg">{vip.name}</h2>
            <p className="text-xs text-gray-500">{available.length} left • {vip.count} videos / ${usdt} USDT ≈ {vip.perVideo} UGX each</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#191970] flex items-center justify-center font-black text-[#FFD700] text-xs">{vipLevel}</div>
        </div>

        {videos.length>0 && available.length===0? (
          <div className="text-center mt-20">
            <p className="font-black text-black text-[20px]">All done for today 🎉</p>
            <p className="text-gray-500 text-sm mt-2">Come back tomorrow for new tasks</p>
            <Link href="/task/history" className="inline-block mt-4 bg-[#191970] text-[#FFD700] px-6 py-2 rounded-full font-bold text-sm">View History</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {available.map(v=>(
              <div key={v.id} className="flex gap-3 border border-gray-200 rounded-xl p-3 bg-white">
                <div className="w-28 h-20 bg-black rounded-lg overflow-hidden flex-shrink-0">
                  <video src={encodeURI(v.src)} muted preload="metadata" playsInline className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-black text-[13px] line-clamp-2">{v.title}</p>
                    <p className="text-[11px] text-green-600 font-bold mt-1">+${usdt} USDT ≈ {vip.perVideo} UGX</p>
                  </div>
                  <Link href={`/watch/${v.id}`}>
                    <button className="bg-[#191970] text-[#FFD700] text-xs font-black px-6 py-2 rounded-full w-fit mt-2">Watch</button>
                  </Link>
                </div>
              </div>
            ))}
            {videos.length===0 && <p className="text-center font-bold text-black mt-20">Loading trailers...</p>}
          </div>
        )}
      </div>
    </div>
  );
}