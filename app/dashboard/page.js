'use client'
import { useState, useEffect } from 'react'

const slides = [
  '/slides/slide1.jpg',
  '/slides/slide2.jpg',
  '/slides/slide3.jpg',
  '/slides/slide4.jpg',
  '/slides/slide5.jpg',
  '/slides/slide6.jpg',
  '/slides/slide7.jpg',
  '/slides/slide8.jpg',
  '/slides/slide9.jpg',
  '/slides/slide10.jpg',
]

export default function Dashboard() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'midnightblue', 
      padding: '16px 16px 90px 16px', // 90px left for bottomnav
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      
      {/* LOGO FROM /main.jpg */}
      <div style={{ textAlign: 'center', marginBottom: '12px', flexShrink: 0 }}>
        <img 
          src="/main.jpg" 
          alt="Logo" 
          style={{ width: '100%', maxWidth: '420px', height: 'auto', display: 'block', margin: '0 auto', filter: 'drop-shadow(0 0 30px rgba(207,168,91,0.5))' }} 
        />
      </div>

      {/* BELL + ROTATING TEXT - NEVER STOPS */}
      <div style={{ 
        background: 'rgba(207,168,91,0.15)', 
        border: '1px solid rgba(207,168,91,0.3)', 
        borderRadius: '10px', 
        height: '44px', 
        display: 'flex', 
        alignItems: 'center', 
        overflow: 'hidden',
        marginBottom: '14px',
        flexShrink: 0
      }}>
        <span style={{ fontSize: '20px', padding: '0 12px', flexShrink: 0 }}>🔔</span>
        <div style={{ flex: 1, overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div style={{
            display: 'inline-block',
            animation: 'marquee 12s linear infinite',
            color: '#FDE68A',
            fontWeight: '800',
            fontSize: '16px',
            letterSpacing: '1px'
          }}>
            Welcome to MainStreetMovies &nbsp;&nbsp; • &nbsp;&nbsp; Welcome to MainStreetMovies &nbsp;&nbsp; • &nbsp;&nbsp; Welcome to MainStreetMovies &nbsp;&nbsp; • &nbsp;&nbsp;
          </div>
        </div>
      </div>

      {/* SLIDES FROM public/slides - FILLS REMAINING SPACE */}
      <div style={{ position: 'relative', flex: 1, minHeight: '380px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(207,168,91,0.3)' }}>
        {slides.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`slide ${idx}`}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: idx === current ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out'
            }}
            onError={(e) => e.target.style.display = 'none'}
          />
        ))}
        <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
          {slides.map((_, idx) => (
            <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', background: idx === current ? '#FDE68A' : 'rgba(255,255,255,0.4)' }} />
          ))}
        </div>
      </div>

      {/* CSS FOR MARQUEE */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}