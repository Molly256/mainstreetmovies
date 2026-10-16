'use client'
import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function InviteRedirect() {
  const router = useRouter()
  const params = useParams()
  const code = params.code

  useEffect(() => {
    if (code) {
      // Validate range
      const num = parseInt(code)
      if (num >= 103989 && num <= 990067) {
        localStorage.setItem('inviterCode', code)
        localStorage.setItem('pendingInviteCode', code)
        // also set cookie for 30 days
        document.cookie = `inviterCode=${code}; path=/; max-age=${60*60*24*30}`
      } else {
        // still save even if outside range to not lose
        localStorage.setItem('inviterCode', code)
      }
    }
    // redirect to register
    router.replace('/register')
  }, [code, router])

  return (
    <div style={{minHeight:'100vh', background:'#0A1433', color:'#FDE68A', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <p>Redirecting... Invite: {code}</p>
    </div>
  )
}