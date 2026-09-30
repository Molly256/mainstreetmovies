"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const VIP = {
  0: { name: "VIP0", count: 3, perVideo: 600 },
  1: { name: "VIP1", count: 3, perVideo: 600 },   // VIP1
  2: { name: "VIP2", count: 6, perVideo: 1300 },
  3: { name: "VIP3", count: 10, perVideo: 1900 }, // VIP3
  4: { name: "VIP4", count: 15, perVideo: 2000 },
  5: { name: "VIP5", count: 20, perVideo: 2500 },
  6: { name: "VIP6", count: 25, perVideo: 4000 },
  7: { name: "VIP7", count: 40, perVideo: 6250 },
};

export default function TaskPage(){
  const [videos,setVideos]=useState([]);
  const [vipLevel,setVipLevel]=useState(0);
  const userId="user_123";

  useEffect(()=>{
    fetch(`/api/tasks?userId=${userId}`).then(r=>r.json()).then(d=>{
      setVideos(d.videos); 
      setVipLevel(d.vipLevel);
    });
  },[]);

  const vip = VIP[vipLevel] || VIP[0];

  return(
    <div className="min-h-screen bg-white p-4 pb-24">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-black text-black text-lg">{vip.name}</h2>
          <p className="text-xs text-gray-500">{vip.count} videos / {vip.perVideo} UGX each</p>
        </div>
        <Link href="/task/history">
          <button className="bg-[#191970] px-5 py-2.5 rounded-full font-black text-black text-sm">
            Tasks history
          </button>
        </Link>
      </div>

      <div className="space-y-3">
        {videos.map(v=>(
          <div key={v.id} className="flex gap-3 border rounded-xl p-3">
            <div className="w-28 h-20 bg-black rounded-lg overflow-hidden">
              <video src={encodeURI(v.src)} muted className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="font-bold text-black text-[13px] line-clamp-2">{v.title}</p>
                <p className="text-[11px] text-green-600 font-bold mt-1">+{vip.perVideo} UGX</p>
              </div>
              <Link href={`/watch/${v.id}`}>
                <button className="bg-[#191970] text-white text-xs font-bold px-6 py-2 rounded-full w-fit mt-2">
                  Watch
                </button>
              </Link>
            </div>
          </div>
        ))}
        {videos.length===0 && <p className="text-center font-bold text-black mt-20">All done today!</p>}
      </div>
    </div>
  );
}