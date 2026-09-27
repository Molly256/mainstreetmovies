'use client'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#0A1433',
      backgroundImage: `
        radial-gradient(ellipse at 50% 0%, #1E3A8A 0%, transparent 60%),
        radial-gradient(ellipse at 20% 15%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 10%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
        linear-gradient(180deg, #16255A 0%, #0F1E4A 35%, #0A1433 70%, #060A1A 100%)
      `,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      
      {/* LOGO IMAGE - FULL */}
      <img 
        src="/main.jpg" 
        alt="Main Street Movies"
        style={{
          width: '550px',
          maxWidth: '90vw',
          height: 'auto',
          objectFit: 'contain',
          borderRadius: '30px',
          mixBlendMode: 'screen',
          filter: 'drop-shadow(0 0 60px rgba(207,168,91,0.6)) drop-shadow(0 10px 30px rgba(0,0,0,0.8))',
          marginBottom: '50px'
        }}
      />

      {/* GOLDEN BUTTON BLACK TEXT */}
      <button
        onClick={() => router.push('/register')}
        style={{
          width: '320px',
          maxWidth: '90vw',
          height: '62px',
          background: 'linear-gradient(90deg, #CFA85B 0%, #FDE68A 50%, #CFA85B 100%)',
          color: '#000',
          border: 'none',
          borderRadius: '16px',
          fontSize: '20px',
          fontWeight: '900',
          letterSpacing: '1px',
          cursor: 'pointer',
          boxShadow: '0 8px 30px rgba(207,168,91,0.5), inset 0 1px 1px rgba(255,255,255,0.6)',
          textTransform: 'uppercase'
        }}
      >
        GET STARTED
      </button>

      <p style={{ marginTop: '30px', color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
        Copyrights 2026 © Main Street Movies
      </p>
    </div>
  )
}