'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function BindWalletPage() {
  const router = useRouter()
  const [mainType, setMainType] = useState(null)
  const [usdtSub, setUsdtSub] = useState(null)
  const [mobileSub, setMobileSub] = useState(null)
  
  const [holderName, setHolderName] = useState('')
  const [walletNumber, setWalletNumber] = useState('')
  const [walletName, setWalletName] = useState('')

  const [saved, setSaved] = useState({})

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem('bind_wallet') || '{}')
    setSaved(data)
  },[])

  const saveWallet = () => {
    if(mainType==='mobile'){
      if(!holderName || !walletNumber || !mobileSub) return alert('Please fill all fields')
      const newData = { ...saved }
      if(mobileSub==='AIRTEL'){
        newData.airtel_name = holderName
        newData.airtel_number = walletNumber
        newData.airtel_wallet = walletNumber
      }else{
        newData.mtn_name = holderName
        newData.mtn_number = walletNumber
        newData.mtn_wallet = walletNumber
      }
      localStorage.setItem('bind_wallet', JSON.stringify(newData))
      setSaved(newData)
      alert(`${mobileSub} wallet saved!`)
      setHolderName(''); setWalletNumber('')
    }else if(mainType==='usdt'){
      if(!walletName || !walletNumber || !usdtSub) return alert('Please fill all fields')
      const newData = { ...saved }
      if(usdtSub==='BEP20'){
        newData.usdt_bep20 = walletNumber
        newData.usdt_bep20_name = walletName
        newData.usdt_address = walletNumber
        newData.usdt_name = walletName
      }else{
        newData.usdt_trc20 = walletNumber
        newData.usdt_trc20_name = walletName
        newData.usdt_trc_address = walletNumber
        newData.usdt_name = walletName
      }
      localStorage.setItem('bind_wallet', JSON.stringify(newData))
      setSaved(newData)
      alert(`${usdtSub}-USDT wallet saved!`)
      setWalletName(''); setWalletNumber('')
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#F5F7FF', fontFamily:'system-ui' }}>
      <div style={{ background:'linear-gradient(90deg,#0F1E8A,#1E3A8A)', padding:'18px', display:'flex', alignItems:'center', gap:'12px', borderBottom:'2px solid #CFA85B' }}>
        <button onClick={()=>router.back()} style={{ background:'rgba(255,255,255,0.2)', border:'none', color:'#FDE68A', width:'32px', height:'32px', borderRadius:'50%', cursor:'pointer' }}>←</button>
        <h1 style={{ margin:0, color:'#FDE68A', fontWeight:'900', fontSize:'18px' }}>Bind Wallet</h1>
      </div>

      <div style={{ maxWidth:'500px', margin:'0 auto', padding:'16px' }}>
        <div style={{ fontWeight:'900', color:'#000', fontSize:'16px', marginBottom:'12px' }}>Withdrawal Type</div>

        <div style={{ display:'flex', gap:'12px' }}>
          <button onClick={()=>{ setMainType('usdt'); setMobileSub(null)}} style={{ flex:1, height:'70px', borderRadius:'14px', border: mainType==='usdt' ? '2px solid #CFA85B' : '1px solid #000', background: mainType==='usdt' ? '#1A2FBF' : '#fff', color: mainType==='usdt' ? '#FDE68A' : '#000', fontWeight:'900', fontSize:'14px', cursor:'pointer' }}>
            USDT
          </button>
          <button onClick={()=>{ setMainType('mobile'); setUsdtSub(null)}} style={{ flex:1, height:'70px', borderRadius:'14px', border: mainType==='mobile' ? '2px solid #CFA85B' : '1px solid #000', background: mainType==='mobile' ? '#1A2FBF' : '#fff', color: mainType==='mobile' ? '#FDE68A' : '#000', fontWeight:'900', fontSize:'11px', cursor:'pointer' }}>
            MOBILE MONEY WALLET
          </button>
        </div>

        {mainType==='mobile' && (
          <div style={{ marginTop:'18px' }}>
            <div style={{ display:'flex', gap:'10px', marginBottom:'16px' }}>
              <button onClick={()=>setMobileSub('AIRTEL')} style={{ flex:1, height:'50px', borderRadius:'12px', border: mobileSub==='AIRTEL' ? '2px solid #FF0000' : '1px solid #000', background: mobileSub==='AIRTEL' ? '#FFF0F0' : '#fff', color:'#000', fontWeight:'900', fontSize:'12px', cursor:'pointer' }}>AIRTEL NETWORK</button>
              <button onClick={()=>setMobileSub('MTN')} style={{ flex:1, height:'50px', borderRadius:'12px', border: mobileSub==='MTN' ? '2px solid #FFCC00' : '1px solid #000', background: mobileSub==='MTN' ? '#FFF9D6' : '#fff', color:'#000', fontWeight:'900', fontSize:'12px', cursor:'pointer' }}>MTN NETWORK</button>
            </div>

            {mobileSub && (
              <div style={{ background:'#fff', borderRadius:'16px', padding:'16px', border:'1px solid #000' }}>
                <div style={{ fontWeight:'900', fontSize:'13px', marginBottom:'8px', color:'#000' }}>Holder's Names</div>
                <div style={{ background:'#F5F7FF', borderRadius:'10px', padding:'12px', border:'1px solid #000', marginBottom:'14px' }}>
                  <input value={holderName} onChange={e=>setHolderName(e.target.value)} placeholder="Enter holder's full names" style={{ width:'100%', border:'none', outline:'none', background:'transparent', fontSize:'13px', color:'#000', fontWeight:'700' }} />
                </div>

                <div style={{ fontWeight:'900', fontSize:'13px', marginBottom:'8px', color:'#000' }}>Wallet Number</div>
                <div style={{ background:'#F5F7FF', borderRadius:'10px', padding:'12px', border:'1px solid #000', marginBottom:'16px' }}>
                  <input value={walletNumber} onChange={e=>setWalletNumber(e.target.value)} placeholder={mobileSub==='AIRTEL' ? "Enter Airtel number e.g 0705..." : "Enter MTN number e.g 0773..."} style={{ width:'100%', border:'none', outline:'none', background:'transparent', fontSize:'13px', color:'#000', fontWeight:'700' }} />
                </div>

                <button onClick={saveWallet} style={{ width:'100%', height:'52px', background:'linear-gradient(90deg,#0F1E8A,#1E3A8A)', color:'#FDE68A', border:'none', borderRadius:'12px', fontWeight:'900', fontSize:'14px', cursor:'pointer' }}>Save</button>

                {saved[mobileSub==='AIRTEL' ? 'airtel_number' : 'mtn_number'] && (
                  <div style={{ marginTop:'14px', background:'#E8FFF0', borderRadius:'10px', padding:'10px', fontSize:'11px', color:'#000', fontWeight:'800', border:'1px solid #000' }}>
                    ✅ Saved: {saved[mobileSub==='AIRTEL' ? 'airtel_name' : 'mtn_name']} - {saved[mobileSub==='AIRTEL' ? 'airtel_number' : 'mtn_number']}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {mainType==='usdt' && (
          <div style={{ marginTop:'18px' }}>
            <div style={{ display:'flex', gap:'10px', marginBottom:'16px' }}>
              <button onClick={()=>setUsdtSub('TRC20')} style={{ flex:1, height:'50px', borderRadius:'12px', border: usdtSub==='TRC20' ? '2px solid #1A2FBF' : '1px solid #000', background: usdtSub==='TRC20' ? '#E8EEFF' : '#fff', color:'#000', fontWeight:'900', fontSize:'12px', cursor:'pointer' }}>TRC20-USDT</button>
              <button onClick={()=>setUsdtSub('BEP20')} style={{ flex:1, height:'50px', borderRadius:'12px', border: usdtSub==='BEP20' ? '2px solid #1A2FBF' : '1px solid #000', background: usdtSub==='BEP20' ? '#E8EEFF' : '#fff', color:'#000', fontWeight:'900', fontSize:'12px', cursor:'pointer' }}>BEP20-USDT</button>
            </div>

            {usdtSub && (
              <div style={{ background:'#fff', borderRadius:'16px', padding:'16px', border:'1px solid #000' }}>
                <div style={{ fontWeight:'900', fontSize:'13px', marginBottom:'8px', color:'#000' }}>Wallet Name (e.g. Binance, Trust Wallet)</div>
                <div style={{ background:'#F5F7FF', borderRadius:'10px', padding:'12px', border:'1px solid #000', marginBottom:'14px' }}>
                  <input value={walletName} onChange={e=>setWalletName(e.target.value)} placeholder="Put wallet name like Binance" style={{ width:'100%', border:'none', outline:'none', background:'transparent', fontSize:'13px', color:'#000', fontWeight:'700' }} />
                </div>

                <div style={{ fontWeight:'900', fontSize:'13px', marginBottom:'8px', color:'#000' }}>Put Address ({usdtSub}-USDT)</div>
                <div style={{ background:'#F5F7FF', borderRadius:'10px', padding:'12px', border:'1px solid #000', marginBottom:'16px' }}>
                  <input value={walletNumber} onChange={e=>setWalletNumber(e.target.value)} placeholder={usdtSub==='BEP20' ? "Enter BEP20 address 0x..." : "Enter TRC20 address T..."} style={{ width:'100%', border:'none', outline:'none', background:'transparent', fontSize:'13px', color:'#000', fontWeight:'700' }} />
                </div>

                <button onClick={saveWallet} style={{ width:'100%', height:'52px', background:'linear-gradient(90deg,#0F1E8A,#1E3A8A)', color:'#FDE68A', border:'none', borderRadius:'12px', fontWeight:'900', fontSize:'14px', cursor:'pointer' }}>Save</button>

                {saved[usdtSub==='BEP20' ? 'usdt_bep20' : 'usdt_trc20'] && (
                  <div style={{ marginTop:'14px', background:'#E8FFF0', borderRadius:'10px', padding:'10px', fontSize:'11px', wordBreak:'break-all', color:'#000', fontWeight:'800', border:'1px solid #000' }}>
                    ✅ Saved: {saved[usdtSub==='BEP20' ? 'usdt_bep20_name' : 'usdt_trc20_name']} - {saved[usdtSub==='BEP20' ? 'usdt_bep20' : 'usdt_trc20']}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop:'24px', background:'#fff', borderRadius:'16px', padding:'16px', border:'1px solid #000' }}>
          <div style={{ fontWeight:'900', fontSize:'13px', marginBottom:'10px', color:'#000' }}>Your Saved Wallets</div>
          <div style={{ fontSize:'11px', color:'#000', lineHeight:'18px', fontWeight:'700' }}>
            {saved.airtel_number && <div>🔴 AIRTEL: {saved.airtel_name} - {saved.airtel_number}</div>}
            {saved.mtn_number && <div>🟡 MTN: {saved.mtn_name} - {saved.mtn_number}</div>}
            {saved.usdt_bep20 && <div>🔵 BEP20: {saved.usdt_bep20_name} - {saved.usdt_bep20}</div>}
            {saved.usdt_trc20 && <div>🟢 TRC20: {saved.usdt_trc20_name} - {saved.usdt_trc20}</div>}
            {!saved.airtel_number && !saved.mtn_number && !saved.usdt_bep20 && !saved.usdt_trc20 && <div style={{ color:'#000', fontWeight:'900' }}>No wallet saved yet</div>}
          </div>
        </div>
      </div>
    </div>
  )
}