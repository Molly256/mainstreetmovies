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

  useEffect(()=>{
    // USE YOUR REAL FILE - not /api/tasks
    fetch('/trailer_data.json')
     .then(r=>r.json())
     .then(data=>{
        setVideos(data);
      });

    // VIP from localStorage
    try{
      const u = JSON.parse(localStorage.getItem('user')||'{}');
      setVipLevel(Number(u.vip?? u.vipLevel?? 0));
    }catch{}
  },[]);

  const vip = VIP[vipLevel] || VIP[0];
  const usdt = (vip.perVideo / 3600).toFixed(2);
  const daily = videos.slice(0, vip.count);

  return(
    <div className="min-h-screen bg-white p-4 pb-24">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-black text-black text-lg">{vip.name}</h2>
          <p className="text-xs text-gray-500">{vip.count} videos / ${usdt} USDT ≈ {vip.perVideo} UGX each</p>
        </div>
        <Link href="/task/history">
          <button className="bg-[#191970] px-5 py-2.5 rounded-full font-bold text-white text-sm">
            Tasks history
          </button>
        </Link>
      </div>

      <div className="space-y-3">
        {daily.map(v=>(
          <div key={v.id} className="flex gap-3 border border-gray-200 rounded-xl p-3 bg-white">
            <div className="w-28 h-20 bg-black rounded-lg overflow-hidden flex-shrink-0">
              {/* FIX BLACK: encodeURI + preload metadata shows first frame */}
              <video
                src={encodeURI(v.src)}
                muted
                preload="metadata"
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="font-bold text-black text-[13px] line-clamp-2">{v.title}</p>
                <p className="text-[11px] text-green-600 font-bold mt-1">+${usdt} USDT ≈ {vip.perVideo} UGX</p>
              </div>
              <Link href={`/watch/${v.id}`}>
                <button className="bg-[#191970] text-white text-xs font-bold px-6 py-2 rounded-full w-fit mt-2">
                  Watch
                </button>
              </Link>
            </div>
          </div>
        ))}
        {daily.length===0 && <p className="text-center font-bold text-black mt-20">Loading trailers from /trailer_data.json...</p>}
      </div>
    </div>
  );
}