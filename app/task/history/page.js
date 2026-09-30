"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function HistoryPage(){
  const [history,setHistory]=useState([]);
  useEffect(()=>{ fetch(`/api/history?userId=user_123`).then(r=>r.json()).then(d=>setHistory(d.history)); },[]);
  return(
    <div className="min-h-screen bg-white p-4">
      <div className="flex items-center gap-3 mb-6"><Link href="/task"><span className="font-bold text-black">← Back</span></Link><h1 className="font-black text-black ml-2">Tasks History</h1></div>
      {history.map((h,i)=>(
        <div key={i} className="flex gap-3 border rounded-xl p-3 mb-3">
          <div className="w-20 h-14 bg-black rounded-lg overflow-hidden"><video src={encodeURI(h.src)} muted className="w-full h-full object-cover" /></div>
          <div className="flex-1"><p className="font-bold text-black text-xs">{h.title}</p><p className="text-xs font-bold text-green-600 mt-1">+{h.income} UGX</p></div>
        </div>
      ))}
    </div>
  );
}