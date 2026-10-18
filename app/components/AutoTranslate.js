'use client'
import { useEffect } from 'react'

export default function AutoTranslateProvider({ children }) {
  useEffect(()=>{
    if(!document.querySelector('#google-translate-script')){
      const s = document.createElement('script')
      s.id = 'google-translate-script'
      s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      document.body.appendChild(s)
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      )
      const saved = localStorage.getItem('app_lang')
      if(saved && saved !== 'en'){
        setTimeout(()=>{
          const sel = document.querySelector('.goog-te-combo')
          if(sel){
            sel.value = saved
            sel.dispatchEvent(new Event('change'))
          }
        },800)
      }
    }

    const style = document.createElement('style')
    style.innerHTML = `
      .goog-te-banner-frame{display:none!important}
      body{top:0!important}
      #google_translate_element{display:none!important}
      .goog-te-gadget-icon{display:none!important}
      .skiptranslate{display:none!important}
    `
    document.head.appendChild(style)
  },[])

  return (
    <>
      <div id="google_translate_element" style={{display:'none'}}></div>
      {children}
    </>
  )
}