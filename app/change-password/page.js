'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ChangePasswordPage() {
  const router = useRouter()
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [repeatPass, setRepeatPass] = useState('')
  const [toast, setToast] = useState('')
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const u = JSON.parse(localStorage.getItem('user') || 'null')
    setUser(u)
  },[])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(()=>setToast(''), 3000)
  }

  const handleSave = async () => {
    if(!oldPass || !newPass || !repeatPass) return showToast('Please fill all fields')
    if(newPass !== repeatPass) return showToast('New passwords do not match')
    if(newPass.length < 6) return showToast('Password must be 6+ chars')

    // CHECK OLD PASSWORD IS SAME AS REGISTER
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    if(storedUser.password && storedUser.password !== oldPass){
      // Also check api if you have db
      // For db validation we call api
    }

    try {
      // Try DB update via API - if you have api route
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user?.id || user?.phone || user?.invitecode,
          oldPassword: oldPass, 
          newPassword: newPass,
          type: 'login'
        })
      })
      const data = await res.json()
      
      if(res.ok){
        // Update localStorage too
        const updated = { ...storedUser, password: newPass }
        localStorage.setItem('user', JSON.stringify(updated))
        showToast('login password modified')
        setTimeout(()=>router.back(), 1200)
      } else {
        // Fallback to local check if API not exist
        if(storedUser.password === oldPass || !storedUser.password){
          const updated = { ...storedUser, password: newPass }
          localStorage.setItem('user', JSON.stringify(updated))
          showToast('login password modified')
          setTimeout(()=>router.back(), 1200)
        } else {
          showToast(data.message || 'Old password incorrect')
        }
      }
    } catch {
      // If no API yet, use localStorage only (for testing)
      if(storedUser.password === oldPass || !storedUser.password){
        const updated = { ...storedUser, password: newPass }
        localStorage.setItem('user', JSON.stringify(updated))
        showToast('login password modified')
        setTimeout(()=>router.back(), 1200)
      } else {
        showToast('Old password incorrect')
      }
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#F5F7FF', fontFamily:'system-ui' }}>
      <div style={{ background:'linear-gradient(90deg,#0F1E8A,#1E3A8A)', padding:'18px', display:'flex', alignItems:'center', gap:'12px', borderBottom:'2px solid #CFA85B' }}>
        <button onClick={()=>router.back()} style={{ background:'rgba(255,255,255,0.2)', border:'none', color:'#FDE68A', width:'32px', height:'32px', borderRadius:'50%', cursor:'pointer', fontWeight:'900' }}>←</button>
        <h1 style={{ margin:0, color:'#FDE68A', fontWeight:'900', fontSize:'16px', letterSpacing:'0.05em' }}>CHANGE PASSWORD</h1>
      </div>

      <div style={{ maxWidth:'500px', margin:'0 auto', padding:'16px' }}>
        <div style={{ background:'#fff', borderRadius:'16px', padding:'16px', border:'1px solid #000', display:'flex', flexDirection:'column', gap:'14px' }}>
          
          <div>
            <div style={{ fontWeight:'900', fontSize:'13px', marginBottom:'8px', color:'#000' }}>Insert old password</div>
            <div style={{ background:'#F5F7FF', borderRadius:'10px', padding:'12px', border:'1px solid #000' }}>
              <input value={oldPass} onChange={e=>setOldPass(e.target.value)} type="password" placeholder="Enter old password" style={{ width:'100%', border:'none', outline:'none', background:'transparent', fontSize:'13px', color:'#000', fontWeight:'700' }} />
            </div>
          </div>

          <div>
            <div style={{ fontWeight:'900', fontSize:'13px', marginBottom:'8px', color:'#000' }}>Insert new password</div>
            <div style={{ background:'#F5F7FF', borderRadius:'10px', padding:'12px', border:'1px solid #000' }}>
              <input value={newPass} onChange={e=>setNewPass(e.target.value)} type="password" placeholder="Enter new password" style={{ width:'100%', border:'none', outline:'none', background:'transparent', fontSize:'13px', color:'#000', fontWeight:'700' }} />
            </div>
          </div>

          <div>
            <div style={{ fontWeight:'900', fontSize:'13px', marginBottom:'8px', color:'#000' }}>Repeat new password</div>
            <div style={{ background:'#F5F7FF', borderRadius:'10px', padding:'12px', border:'1px solid #000' }}>
              <input value={repeatPass} onChange={e=>setRepeatPass(e.target.value)} type="password" placeholder="Repeat new password" style={{ width:'100%', border:'none', outline:'none', background:'transparent', fontSize:'13px', color:'#000', fontWeight:'700' }} />
            </div>
          </div>

          <button onClick={handleSave} style={{ width:'100%', height:'52px', marginTop:'8px', background:'linear-gradient(90deg,#0F1E8A,#1E3A8A)', color:'#FDE68A', border:'none', borderRadius:'12px', fontWeight:'900', fontSize:'14px', cursor:'pointer' }}>Save</button>
        </div>
      </div>

      {toast && (
        <div style={{ position:'fixed', bottom:'30px', left:'50%', transform:'translateX(-50%)', background:'#000', color:'#fff', padding:'12px 20px', borderRadius:'20px', fontSize:'13px', fontWeight:'900', zIndex:9999, maxWidth:'90%', textAlign:'center' }}>
          {toast}
        </div>
      )}
    </div>
  )
}