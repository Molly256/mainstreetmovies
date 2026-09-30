import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

function getUgandaTime() {
  const now = new Date()
  const formatted = now.toLocaleString('en-GB', {
    timeZone: 'Africa/Kampala',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
  const [datePart, timePart] = formatted.split(', ')
  const [day, month, year] = datePart.split('/')
  return `${year}-${month}-${day}-${timePart}`
}

function normalizePhone(phone) {
  return String(phone || '').replace(/\s+/g, '').trim()
}

function safeTrim(val) {
  return String(val || '').trim()
}

function getRawPhone(phone){
  return String(phone || '').replace(/\D/g,'') // 256753185973
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { action } = body

    if (action === 'register') {
      let { username, phone, loginPassword, transactionPassword, gender, countryCode, countryName, invitedBy, myInvitecode, rawPhone, displayPhone } = body
      username = safeTrim(username)
      phone = normalizePhone(phone)
      loginPassword = safeTrim(loginPassword)

      if (!username || !phone || !loginPassword) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
      }

      const existingUser = await redis.hget(`user:${username}`, 'username')
      if (existingUser) {
        return NextResponse.json({ error: 'Username already exists' }, { status: 400 })
      }

      const phoneExists = await redis.get(`phone:${phone}`)
      if (phoneExists) {
        return NextResponse.json({ error: 'Phone already registered' }, { status: 400 })
      }

      // --- SLICING LOGIC ---
      const raw = getRawPhone(rawPhone || phone) // 256753185973
      const finalDisplayPhone = displayPhone || raw.slice(-9) // 753185973
      const finalInvitecode = myInvitecode || raw.slice(-6) + 'MS' // 185973MS

      const userData = {
        username,
        phone, // +256753...
        rawPhone: raw,
        displayPhone: finalDisplayPhone,
        invitecode: finalInvitecode,
        myInvitecode: finalInvitecode,
        password: loginPassword,
        transactionPassword: safeTrim(transactionPassword),
        gender: safeTrim(gender),
        countryCode: safeTrim(countryCode),
        countryName: safeTrim(countryName),
        invitedBy: safeTrim(invitedBy) || 'NO_INVITE',
        createdAt: getUgandaTime(),
        balance: '0',
        vip: '0'
      }

      await redis.hset(`user:${username}`, userData)
      await redis.set(`phone:${phone}`, username)
      await redis.set(`invitecode:${finalInvitecode}`, username)
      await redis.sadd('users:list', username)

      const res = NextResponse.json({ 
        success: true, 
        user: { 
          username, 
          phone,
          rawPhone: raw,
          displayPhone: finalDisplayPhone,
          invitecode: finalInvitecode,
          id: username
        } 
      }, { status: 200 })
      res.cookies.set('user', JSON.stringify({ username, phone, displayPhone: finalDisplayPhone, invitecode: finalInvitecode }), { path: '/', maxAge: 60*60*24*7 })
      return res
    }

    if (action === 'login') {
      let { loginType, username, phone, password } = body
      
      password = safeTrim(password)

      if (!password) {
        return NextResponse.json({ error: 'Password required' }, { status: 400 })
      }

      let targetUsername = safeTrim(username)

      if (loginType === 'phone') {
        phone = normalizePhone(phone)
        targetUsername = await redis.get(`phone:${phone}`)
        if (!targetUsername) {
          return NextResponse.json({ error: 'Phone not found. Please register first.' }, { status: 401 })
        }
      }

      if (!targetUsername) {
        return NextResponse.json({ error: 'Username required' }, { status: 400 })
      }

      const user = await redis.hgetall(`user:${targetUsername}`)
      if (!user || !user.username) {
        return NextResponse.json({ error: 'User not found' }, { status: 401 })
      }

      if (safeTrim(user.password) !== password) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
      }

      // ensure fields exist for old users
      const raw = getRawPhone(user.rawPhone || user.phone)
      if(!user.displayPhone) {
        user.displayPhone = raw.slice(-9)
        await redis.hset(`user:${targetUsername}`, { displayPhone: user.displayPhone })
      }
      if(!user.invitecode) {
        user.invitecode = raw.slice(-6) + 'MS'
        await redis.hset(`user:${targetUsername}`, { invitecode: user.invitecode })
      }

      const res = NextResponse.json({ 
        success: true, 
        user: { 
          username: user.username, 
          phone: user.phone,
          rawPhone: user.rawPhone || raw,
          displayPhone: user.displayPhone,
          invitecode: user.invitecode,
          id: user.username,
          vip: user.vip || '0',
          balance: user.balance || '0'
        } 
      }, { status: 200 })
      res.cookies.set('user', JSON.stringify({ username: user.username, phone: user.phone, displayPhone: user.displayPhone, invitecode: user.invitecode }), { path: '/', maxAge: 60*60*24*7 })
      return res
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err) {
    console.error('Redis error:', err)
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const redis = Redis.fromEnv()
    const users = await redis.smembers('users:list')
    return NextResponse.json({ users, count: users.length })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}