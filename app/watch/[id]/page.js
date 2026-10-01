"use client";
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function WatchPage(){
  const { id } = useParams();
  const router = useRouter();
  const videoRef = useRef(null);
  const [video,setVideo]=useState(null);
  const [timer,setTimer]=useState(15);
  const [showEarn,setShowEarn]=useState(false);
  const [isMuted,setIsMuted]=useState(true);

  useEffect(()=>{
    fetch('/trailer_data.json').then(r=>r.json()).then(data=>{
      const found = data.find(v=> String(v.id)===String(id));
      if(found){ found.src = encodeURI(found.src); setVideo(found); }
    }).catch(()=> fetch('/trailers_data.json').then(r=>r.json()).then(data=>{
      const found = data.find(v=> String(v.id)===String(id));
      if(found){ found.src = encodeURI(found.src); setVideo(found); }
    }));
  },[id]);

  useEffect(()=>{
    if(!video) return;
    const v = videoRef.current;
    if(!v) return;
    const startTimer = ()=>{
      v.muted = isMuted;
      v.play().catch(()=>{});
      const inter = setInterval(()=>setTimer(p=>{
        if(p<=1){ clearInterval(inter); setShowEarn(true); return 0; }
        return p-1;
      }),1000);
      v._inter = inter;
    };
    v.addEventListener('canplay', startTimer);
    if(v.readyState>=3) startTimer();
    return()=>{ v.removeEventListener('canplay', startTimer); clearInterval(v._inter); }
  },[video]);

  const toggleSound = ()=>{
    const v = videoRef.current;
    if(!v) return;
    v.muted =!v.muted;
    setIsMuted(v.muted);
    if(!v.muted) v.play().catch(()=>{});
  };

  const handleEarn = async()=>{
    try{ await fetch('/api/earn',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ userId:'user_123', videoId:id })});}catch{}
    const today = new Date().toDateString();
    const w = JSON.parse(localStorage.getItem('task_'+today)||'[]');
    localStorage.setItem('task_'+today, JSON.stringify([...w, String(id)]));
    router.push('/task');
  };

  if(!video) return <div className="min-h-screen bg-black text-white flex items-center justify-center font-bold">Loading trailer {id}...</div>;

  return(
    <div className="min-h-screen bg-black flex flex-col">
      <div className="bg-[#191970] p-3 flex justify-between items-center">
        <button onClick={()=>router.back()} className="font-bold text-[#FFD700]">← Back</button>
        <span className="font-bold text-[#FFD700] text-[12px] truncate max-w-[150px]">{video.title}</span>
        <div className="bg-black text-[#FFD700] px-4 py-1 rounded-full font-bold text-[13px] border border-[#FFD700]/30">{timer}s</div>
      </div>

      <div className="flex-1 flex items-center justify-center relative bg-black">
        <video ref={videoRef} src={video.src} muted={isMuted} autoPlay playsInline preload="auto" className="w-full max-h-[75vh] bg-black" />

        {/* SOUND TOGGLE BUTTON */}
        <button onClick={toggleSound} className="absolute top-4 right-4 w-11 h-11 bg-black/60 rounded-full flex items-center justify-center border border-white/30 active:scale-90 z-10">
          <span className="text-[20px]">{isMuted? "🔇" : "🔊"}</span>
        </button>

        {showEarn && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-6 z-20">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center">
              <p className="font-black text-black text-[18px]">Task Completed!</p>
              <p className="text-[11px] text-gray-500 mt-1">{video.title}</p>
              <button onClick={handleEarn} className="mt-4 w-full py-4 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 font-black text-black">Earn</button>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full bg-[#FFD700] transition-all" style={{width: `${((15-timer)/15)*100}%`}} />
        </div>
      </div>
    </div>
  );
}