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

export default function ImageSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 3000) // change every 3 seconds
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(207,168,91,0.3)' }}>
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
        />
      ))}
      {/* dots */}
      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
        {slides.map((_, idx) => (
          <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', background: idx === current ? '#FDE68A' : 'rgba(255,255,255,0.4)' }} />
        ))}
      </div>
    </div>
  )
}