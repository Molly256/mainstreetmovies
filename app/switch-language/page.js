'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const LANGUAGES = [
  { name: 'English', code: 'en', flag: '🇺🇸', google: 'en' },
  { name: 'Azərbaycanca', code: 'az', flag: '🇦🇿', google: 'az' },
  { name: 'Türkçe', code: 'tr', flag: '🇹🇷', google: 'tr' },
  { name: 'Deutsch', code: 'de', flag: '🇩🇪', google: 'de' },
  { name: 'Кыргызча', code: 'ky', flag: '🇰🇬', google: 'ky' },
  { name: 'Tiếng Việt', code: 'vi', flag: '🇻🇳', google: 'vi' },
  { name: 'Русский язык', code: 'ru', flag: '🇷🇺', google: 'ru' },
  { name: 'Español', code: 'es', flag: '🇪🇸', google: 'es' },
  { name: 'български', code: 'bg', flag: '🇧🇬', google: 'bg' },
  { name: "O'zbekcha", code: 'uz', flag: '🇺🇿', google: 'uz' },
  { name: 'عربي', code: 'ar', flag: '🇦🇪', google: 'ar' },
  { name: 'فارسی', code: 'fa', flag: '🇮🇷', google: 'fa' },
  { name: 'Српски', code: 'sr', flag: '🇷🇸', google: 'sr' },
  { name: 'Slovenščina', code: 'sl', flag: '🇸🇮', google: 'sl' },
  { name: 'Swahili', code: 'sw', flag: '🇹🇿', google: 'sw' },
]

export default function SwitchLanguagePage() {
  const router = useRouter()
  const [selected, setSelected] = useState('en')

  useEffect(()=>{
    const saved = localStorage.getItem('app_lang') || 'en'
    setSelected(saved)

    if(!document.querySelector('#google-translate-script')){
      const s = document.createElement('script')
      s.id = 'google-translate-script'
      s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      document.body.appendChild(s)
    }
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'google_translate_element')
    }
    const style = document.createElement('style')
    style.innerHTML = `.goog-te-banner-frame{display:none!important} body{top:0!important} #google_translate_element{display:none!important}`
    document.head.appendChild(style)
  },[])

  const triggerTranslate = (target) => {
    const sel = document.querySelector('.goog-te-combo')
    if(!sel){ setTimeout(()=>triggerTranslate(target),500); return }
    sel.value = target
    sel.dispatchEvent(new Event('change'))
  }

  const handleSelect = (lang) => {
    setSelected(lang.code)
    localStorage.setItem('app_lang', lang.code)
    if(lang.code === 'en'){
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`
      window.location.reload()
    } else {
      triggerTranslate(lang.google)
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#F5F7FF', fontFamily:'system-ui' }}>
      <div style={{ background:'linear-gradient(90deg,#0F1E8A,#1E3A8A)', padding:'18px 16px', display:'flex', alignItems:'center', gap:'12px', borderBottom:'2px solid #CFA85B' }}>
        <button onClick={()=>router.back()} style={{ background:'rgba(255,255,255,0.2)', border:'none', color:'#FDE68A', width:'32px', height:'32px', borderRadius:'50%', cursor:'pointer', fontWeight:'900', fontSize:'18px' }}>←</button>
        <h1 style={{ margin:'0 auto', color:'#FDE68A', fontWeight:'900', fontSize:'16px' }}>SWITCH LANGUAGE</h1>
        <div style={{ width:'32px' }}></div>
      </div>

      <div id="google_translate_element"></div>

      <div style={{ maxWidth:'500px', margin:'0 auto', padding:'12px' }}>
        <div style={{ background:'linear-gradient(135deg,#0F1E8A 0%, #1E3A8A 50%, #2A4BD1 100%)', borderRadius:'20px', padding:'20px', color:'#fff', position:'relative', overflow:'hidden', marginBottom:'12px' }}>
          <div style={{ fontSize:'11px', fontWeight:'900', letterSpacing:'0.15em', opacity:0.8, marginBottom:'8px' }}>LANGUAGE</div>
          <div style={{ fontSize:'22px', fontWeight:'900', lineHeight:'1.2', marginBottom:'8px' }}>Choose your preferred<br/>language</div>
          <div style={{ fontSize:'11px', opacity:0.85, lineHeight:'1.4' }}>Your selection will be used across pages, records, and task details.</div>
        </div>

        <div style={{ background:'#fff', borderRadius:'20px', padding:'8px 0', border:'1px solid #E5E7EB' }}>
          {LANGUAGES.map((lang)=>{
            const isSelected = selected === lang.code
            return (
              <div key={lang.code} onClick={()=>handleSelect(lang)}
                style={{
                  display:'flex', alignItems:'center', gap:'12px', padding:'14px 16px',
                  cursor:'pointer',
                  background: isSelected ? 'linear-gradient(90deg,#0F1E8A,#2A4BD1)' : '#fff',
                  margin:'6px 8px', borderRadius:'14px',
                }}>
                <div style={{
                  width:'42px', height:'42px', borderRadius:'50%',
                  background: isSelected ? 'rgba(255,255,255,0.2)' : '#fff',
                  border: `2px solid ${isSelected ? '#FDE68A' : '#CFA85B'}`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px'
                }}>
                  {lang.flag}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:'900', fontSize:'14px', color: isSelected ? '#FDE68A' : '#000' }}>{lang.name}</div>
                  <div style={{ fontSize:'11px', color: isSelected ? 'rgba(253,230,138,0.8)' : '#888', fontWeight:'700', marginTop:'2px' }}>{lang.code}</div>
                </div>
                {isSelected ? (
                  <div style={{ width:'26px', height:'26px', borderRadius:'50%', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', color:'#0F1E8A', fontWeight:'900' }}>✓</div>
                ) : (
                  <div style={{ color:'#9CA3AF', fontSize:'18px' }}>→</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}