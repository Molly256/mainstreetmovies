'use client'
import { useState } from 'react'

export default function RechargePage() {
  const [mainTab, setMainTab] = useState(null) // 'usdt' | 'mobile'
  const [usdtNetwork, setUsdtNetwork] = useState(null) // 'bep20' | 'trc20'
  const [mobileNetwork, setMobileNetwork] = useState(null) // 'airtel' | 'mtn'
  const [copied, setCopied] = useState('')

  const copy = (text, label) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(()=>setCopied(''), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1433', padding: '0', fontFamily: 'system-ui' }}>
      {/* HEADER - Gold text royal blue bg */}
      <div style={{ background: '#1028A8', backgroundImage: 'linear-gradient(90deg,#0F1E8A,#1E3A8A)', padding: '18px', textAlign: 'center', borderBottom: '2px solid #CFA85B' }}>
        <h1 style={{ margin: 0, color: '#FDE68A', fontWeight: '900', letterSpacing: '2px', fontSize: '22px', textShadow: '0 0 15px rgba(251,191,36,0.6)' }}>RECHARGE WALLET</h1>
        <p style={{ margin: '6px 0 0', color: '#C7B299', fontSize: '12px' }}>Choose payment method</p>
      </div>

      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
        {/* 2 OPTIONS */}
        {!mainTab && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
            <button onClick={()=>setMainTab('usdt')} style={{ height: '62px', borderRadius: '14px', border: '1px solid rgba(207,168,91,0.4)', background: 'linear-gradient(90deg,#CFA85B,#FDE68A)', color: '#0A1433', fontWeight: '800', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(207,168,91,0.3)' }}>
              💰 USDT WALLET
            </button>
            <button onClick={()=>setMainTab('mobile')} style={{ height: '62px', borderRadius: '14px', border: '1px solid rgba(207,168,91,0.3)', background: 'rgba(255,255,255,0.08)', color: '#FDE68A', fontWeight: '800', fontSize: '16px', cursor: 'pointer' }}>
              📱 MOBILE MONEY WALLET
            </button>
          </div>
        )}

        {mainTab && (
          <button onClick={()=>{ setMainTab(null); setUsdtNetwork(null); setMobileNetwork(null)}} style={{ background: 'transparent', border: 'none', color: '#C7B299', fontSize: '14px', cursor: 'pointer', marginBottom: '16px' }}>← Back</button>
        )}

        {/* USDT TAB */}
        {mainTab === 'usdt' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              <button onClick={()=>setUsdtNetwork('bep20')} style={{ width: '220px', height: '56px', background: '#fff', border: usdtNetwork==='bep20' ? '2px solid #CFA85B' : '1px solid #ddd', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 16px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                <span style={{ fontSize: '22px' }}>🟡</span>
                <span style={{ color: '#333', fontWeight: '800', fontSize: '14px' }}>BEP20-USDT</span>
              </button>
              <button onClick={()=>setUsdtNetwork('trc20')} style={{ width: '220px', height: '56px', background: '#fff', border: usdtNetwork==='trc20' ? '2px solid #CFA85B' : '1px solid #ddd', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 16px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                <span style={{ fontSize: '22px' }}>🔺</span>
                <span style={{ color: '#333', fontWeight: '800', fontSize: '14px' }}>TRC20-USDT</span>
              </button>
            </div>

            {usdtNetwork === 'bep20' && (
              <div style={{ marginTop: '24px', background: '#fff', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontWeight: '800', color: '#0A1433', marginBottom: '12px' }}>BEP20 (BSC) Address</div>
                <img src="/bep20-qr.jpg" alt="BEP20 QR" style={{ width: '220px', height: '220px', objectFit: 'contain', margin: '0 auto', display: 'block', border: '1px solid #eee', borderRadius: '12px' }} 
                  onError={(e)=>e.target.src='https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=0xcfaef161188999eeb99ff04f5f094586a147be07'} />
                <div style={{ marginTop: '16px', background: '#f5f5f5', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <span style={{ fontSize: '11px', wordBreak: 'break-all', color: '#333', fontWeight: '600' }}>0xcfaef161188999eeb99ff04f5f094586a147be07</span>
                  <button onClick={()=>copy('0xcfaef161188999eeb99ff04f5f094586a147be07','bep20')} style={{ background: '#0F1E4A', color: '#FDE68A', border: 'none', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontSize: '16px' }}>📋</button>
                </div>
                {copied==='bep20' && <div style={{ color: 'green', fontSize: '12px', marginTop: '8px' }}>Copied!</div>}
              </div>
            )}

            {usdtNetwork === 'trc20' && (
              <div style={{ marginTop: '24px', background: '#fff', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontWeight: '800', color: '#0A1433', marginBottom: '12px' }}>TRC20 (Tron) Address</div>
                <img src="/trc20-qr.jpg" alt="TRC20 QR" style={{ width: '220px', height: '220px', objectFit: 'contain', margin: '0 auto', display: 'block', border: '1px solid #eee', borderRadius: '12px' }}
                  onError={(e)=>e.target.src='https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=TUxJqxMBh6Jikqb5ko3omrfjZ6SFWc91So'} />
                <div style={{ marginTop: '16px', background: '#f5f5f5', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <span style={{ fontSize: '11px', wordBreak: 'break-all', color: '#333', fontWeight: '600' }}>TUxJqxMBh6Jikqb5ko3omrfjZ6SFWc91So</span>
                  <button onClick={()=>copy('TUxJqxMBh6Jikqb5ko3omrfjZ6SFWc91So','trc20')} style={{ background: '#0F1E4A', color: '#FDE68A', border: 'none', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontSize: '16px' }}>📋</button>
                </div>
                {copied==='trc20' && <div style={{ color: 'green', fontSize: '12px', marginTop: '8px' }}>Copied!</div>}
              </div>
            )}
          </div>
        )}

        {/* MOBILE MONEY TAB */}
        {mainTab === 'mobile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <button onClick={()=>setMobileNetwork('airtel')} style={{ height: '60px', background: '#fff', border: mobileNetwork==='airtel' ? '2px solid #CFA85B' : '1px solid #ddd', borderRadius: '12px', color: '#FF0000', fontWeight: '900', fontSize: '14px', cursor: 'pointer', letterSpacing: '0.5px' }}>
              AIRTEL MOBILE MONEY WALLET
            </button>

            {mobileNetwork === 'airtel' && (
              <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', border: '1px solid #FF0000' }}>
                <div style={{ fontSize: '13px', color: '#333', marginBottom: '10px' }}><b>Holder's names:</b> shilati juma</div>
                <div style={{ background: '#f5f5f5', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: '#000', fontWeight: '700' }}>Wallet account: 0705011376</span>
                  <button onClick={()=>copy('0705011376','airtel')} style={{ background: '#FF0000', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer' }}>📋</button>
                </div>
                {copied==='airtel' && <div style={{ color: 'green', fontSize: '12px', marginTop: '8px' }}>Copied!</div>}
              </div>
            )}

            <button onClick={()=>setMobileNetwork('mtn')} style={{ height: '60px', background: '#fff', border: mobileNetwork==='mtn' ? '2px solid #CFA85B' : '1px solid #ddd', borderRadius: '12px', color: '#000', fontWeight: '900', fontSize: '14px', cursor: 'pointer', letterSpacing: '0.5px' }}>
              <span style={{ color: '#FFCC00', WebkitTextStroke: '0.6px black' }}>MTN MOBILE MONEY WALLET</span>
            </button>

            {mobileNetwork === 'mtn' && (
              <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', border: '1px solid #FFCC00' }}>
                <div style={{ fontSize: '13px', color: '#333', marginBottom: '10px' }}><b>Holder's names:</b> kevin dumba</div>
                <div style={{ background: '#f5f5f5', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: '#000', fontWeight: '700' }}>Wallet account: 0753041411</span>
                  <button onClick={()=>copy('0753041411','mtn')} style={{ background: '#FFCC00', color: '#000', border: 'none', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontWeight: '900' }}>📋</button>
                </div>
                {copied==='mtn' && <div style={{ color: 'green', fontSize: '12px', marginTop: '8px' }}>Copied!</div>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}