"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HistoryPage(){
  const [history,setHistory]=useState([]);

  useEffect(()=>{
    // First try localStorage (from Earn button) - instant
    const local = JSON.parse(localStorage.getItem('incomeHistory')||'[]');
    if(local.length>0){
      setHistory(local);
    }
    // Also try API
    fetch(`/api/history?userId=user_123`).then(r=>r.json()).then(d=>{
      if(d.history && d.history.length>0 && local.length===0) setHistory(d.history);
    }).catch(()=>{});
  },[]);

  return(
    <div className="min-h-screen bg-white pb-24">
      {/* SAME HEADER AS TASK PAGE - MIDNIGHT BLUE + GOLD */}
      <div className="bg-[#191970] px-4 py-5 flex justify-between items-center">
        <Link href="/task">
          <span className="font-bold text-[#FFD700]">← Back</span>
        </Link>
        <h1 className="font-black text-[22px] text-[#FFD700] tracking-wide">History</h1>
        <div className="w-12"></div>
      </div>

      <div className="p-4">
        {history.length===0? (
          <p className="text-center font-bold text-gray-400 mt-20">No history yet</p>
        ) : (
          history.map((h,i)=>(
            <div key={h.id||i} className="flex gap-3 border border-gray-200 rounded-xl p-3 mb-3 bg-white">
              <div className="w-20 h-14 bg-black rounded-lg overflow-hidden flex-shrink-0">
                <video src={encodeURI(h.src||'')} muted className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-black text-[13px] line-clamp-2">{h.title}</p>
                <p className="text-[11px] font-bold text-green-600 mt-1">+{h.amount||h.income} UGX</p>
                {h.time && <p className="text-[10px] text-gray-400 mt-1">{h.time}</p>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}