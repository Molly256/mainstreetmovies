'use client'
import { useState, useRef, useEffect } from 'react'

export default function ChatRoom() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [preview, setPreview] = useState(null)
  const [selectedMsg, setSelectedMsg] = useState(null)
  const [currentUserId, setCurrentUserId] = useState(null)
  const fileInputRef = useRef(null)
  const bottomRef = useRef(null)

  const loadMessages = async () => {
    try {
      const res = await fetch('/api/chatroom')
      const data = await res.json()
      if (Array.isArray(data)) setMessages(data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    // Get current user id
    const u = JSON.parse(localStorage.getItem('user') || '{}')
    setCurrentUserId(u.id || u.phone || u._id || localStorage.getItem('myDisplayPhone') || 'me')
    
    loadMessages()
    const interval = setInterval(loadMessages, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, preview])

  const openGallery = () => {
    fileInputRef.current?.click()
  }

  const onSelectImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const sendMessage = async () => {
    if (!input.trim() &&!preview) return

    await fetch('/api/chatroom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: input.trim(),
        imageUrl: preview,
        senderId: currentUserId // IMPORTANT: save who sent it
      })
    })

    setInput('')
    setPreview(null)
    loadMessages()
  }

  const handleDelete = async () => {
    if(!selectedMsg) return
    
    // Instant delete from UI
    setMessages(prev => prev.filter(m => m.id !== selectedMsg.id && m._id !== selectedMsg._id && m._id !== selectedMsg.id))
    
    // Delete from backend - so it deletes for EVERYONE
    try{
      await fetch(`/api/chatroom?id=${selectedMsg.id || selectedMsg._id}`, {
        method: 'DELETE'
      })
    }catch(e){
      console.log(e)
    }
    setSelectedMsg(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="sticky top-0 z-20 w-full h-[65px] bg-[#4169E1] flex items-center justify-center border-b border-[#CFA85B]/30">
        <h1 className="text-[#FDE68A] font-black tracking-[0.3em] text-[18px]">
          CHATROOM
        </h1>
      </div>

      <div className="flex-1 px-4 py-4 pb-[120px] bg-white flex flex-col gap-3 min-h-[calc(100vh-145px)]">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center opacity-30 mt-20">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl mb-3">💬</div>
            <p className="text-sm text-slate-500">No messages yet</p>
          </div>
        )}

        {messages.map((m) => {
          const isMine = (m.senderId && m.senderId === currentUserId) || m.isMine
          return (
            <div 
              key={m.id || m._id} 
              onClick={()=>{ if(isMine) setSelectedMsg(m) }}
              className={`max-w-[80%] ${isMine ? 'self-end' : 'self-start'} ${isMine ? 'cursor-pointer active:scale-[0.98] transition' : ''}`}
            >
              <div className={`rounded-2xl px-4 py-3 shadow-sm border ${isMine ? 'bg-[#4169E1] border-[#CFA85B]/40 rounded-br-md' : 'bg-[#f8fafc] rounded-bl-md border-slate-100'}`}>
                {m.image && (
                  <img src={m.image} className="w-full max-w-[240px] rounded-xl mb-2" alt="shared" />
                )}
                {m.imageUrl && (
                  <img src={m.imageUrl} className="w-full max-w-[240px] rounded-xl mb-2" alt="shared" />
                )}
                {m.text && <p className={`text-[14px] leading-snug ${isMine ? 'text-white' : 'text-slate-800'}`}>{m.text}</p>}
                <p className={`text-[10px] mt-1 text-right ${isMine ? 'text-[#FDE68A]/70' : 'text-slate-400'}`}>{m.time || new Date(m.createdAt || Date.now()).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
              </div>
            </div>
          )
        })}

        {preview && (
          <div className="self-end relative bg-slate-100 p-1.5 rounded-xl">
            <img src={preview} className="w-32 rounded-lg" alt="preview" />
            <button onClick={() => setPreview(null)} className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full text-xs">✕</button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* DELETE POPUP */}
      {selectedMsg && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-[300px] rounded-[20px] p-6 shadow-2xl">
            <h3 className="font-black text-[16px] text-center text-black">Delete message?</h3>
            <p className="text-[12px] text-gray-500 text-center mt-2">This message will be deleted for everyone</p>
            <div className="flex gap-3 mt-6">
              <button onClick={()=>setSelectedMsg(null)} className="flex-1 py-3 rounded-full font-bold text-[14px] border bg-white text-[#4169E1] border-[#4169E1]">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-3 rounded-full font-bold text-[14px] bg-[#FF3B30] text-white">Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-[80px] left-0 right-0 bg-white border-t border-slate-200 px-3 py-3 flex items-center gap-2 z-30">
        <button
          onClick={openGallery}
          className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl shrink-0"
        >
          🖼️
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={onSelectImage}
        />

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 h-11 bg-slate-100 rounded-full px-5 text-[14px] text-slate-900 outline-none placeholder:text-slate-400 border border-transparent focus:border-[#CFA85B]/40 focus:bg-white"
        />

        <button
          onClick={sendMessage}
          className="w-11 h-11 rounded-full bg-[#4169E1] text-[#FDE68A] flex items-center justify-center font-bold shrink-0 active:scale-95 transition"
        >
          ➤
        </button>
      </div>
    </div>
  )
}