"use client";
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function WatchPage(){
  const { id } = useParams();
  const router = useRouter();
  const videoRef = useRef(null);
  const [video,setVideo]=useState(null);
  const [timer,setTimer]=useState(11);
  const [showEarn,setShowEarn]=useState(false);

  useEffect(()=>{ fetch('/api/trailers').then(r=>r.json()).then(all=>{ setVideo(all.find(v=>String(v.id)===String(id))); }); },[id]);

  useEffect(()=>{
    if(!video) return;
    videoRef.current?.play();
    const inter = setInterval(()=>setTimer(p=>{ if(p<=1){ clearInterval(inter); setShowEarn(true); return 0; } return p-1; }),1000);
    return()=>clearInterval(inter);
  },[video]);

  const handleEarn = async()=>{
    await fetch('/api/earn',{method:'POST', body: JSON.stringify({ userId:'user_123', videoId:id })});
    router.push('/task');
  };

  if(!video) return null;

  return(
    <div className="min-h-screen bg-black flex flex-col">
      <div className="bg-white p-3 flex justify-between"><button onClick={()=>router.back()} className="font-bold text-black">← Back</button><div className="bg-black text-white px-4 py-1 rounded-full font-bold">{timer}s</div></div>
      <div className="flex-1 flex items-center justify-center relative">
        <video ref={videoRef} src={encodeURI(video.src)} autoPlay playsInline className="w-full max-h-[75vh]" />
        {showEarn && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center">
              <p className="font-black text-black">Task Completed!</p>
              <button onClick={handleEarn} className="mt-4 w-full py-4 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 font-black text-black">Earn</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}