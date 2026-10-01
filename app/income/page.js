"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function IncomePage(){
  const [history,setHistory]=useState([]);
  useEffect(()=>{ setHistory(JSON.parse(localStorage.getItem('incomeHistory')||'[]')) },[]);

  return(
    <div className="min-h-screen bg-white pb-24">
      <div className="bg-[#191970] px-4 py-5 flex items-center gap-3">
        <Link href="/my"><span className="font-bold text-[#FFD700]">← Back</span></Link>
        <h1 className="font-black text-[20px] text-[#FFD700] ml-2">Income details</h1>
      </div>
      <div className="p-4">
        <p className="font-bold text-black mb-3">Income</p>
        {history.length===0? <p className="text-center text-gray-400 mt-20">No income yet</p> :
          history.map(h=>(
            <div key={h.id} className="flex justify-between items-center border-b border-gray-100 py-3">
              <div>
                <p className="font-bold text-black text-[13px]">{h.title}</p>
                <p className="text-[12px] text-green-600 font-bold">+{h.amount} UGX</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-gray-600 font-mono">{h.time}</p>
                <p className="text-[11px] font-bold" style={{color:'#90EE90'}}>{h.status}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}