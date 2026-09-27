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
  return phone.replace(/\s+/g, '').trim()
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { action } = body

    if (action === 'register') {
      let { username, phone, loginPassword, transactionPassword, gender, countryCode, countryName, invitedBy } = body
      username = username.trim()
      phone = normalizePhone(phone)
      loginPassword = loginPassword.trim()

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

      const userData = {
        username,
        phone,
        password: loginPassword,
        transactionPassword: transactionPassword || '',
        gender: gender || '',
        countryCode: countryCode || '',
        countryName: countryName || '',
        invitedBy: invitedBy || 'NO_INVITE',
        createdAt: getUgandaTime(),
        balance: '0'
      }

      await redis.hset(`user:${username}`, userData)
      await redis.set(`phone:${phone}`, username)
      await redis.sadd('users:list', username)

      const res = NextResponse.json({ success: true, user: { username, phone } }, { status: 200 })
      res.cookies.set('user', JSON.stringify({ username, phone }), { path: '/', maxAge: 60*60*24*7 })
      return res
    }

    if (action === 'login') {
      let { loginType, username, phone, password } = body
      password = password?.trim()

      if (!password) {
        return NextResponse.json({ error: 'Password required' }, { status: 400 })
      }

      let targetUsername = username?.trim()

      if (loginType === 'phone') {
        phone = normalizePhone(phone)
        targetUsername = await redis.get(`phone:${phone}`)
        if (!targetUsername) {
          return NextResponse.json({ error: 'Phone not found. Please register first.' }, { status: 401 })
        }
      }

      const user = await redis.hgetall(`user:${targetUsername}`)
      if (!user || !user.username) {
        return NextResponse.json({ error: 'User not found' }, { status: 401 })
      }

      // Trim both sides when comparing
      if ((user.password || '').trim() !== password) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
      }

      const res = NextResponse.json({ success: true, user: { username: user.username, phone: user.phone } }, { status: 200 })
      res.cookies.set('user', JSON.stringify({ username: user.username, phone: user.phone }), { path: '/', maxAge: 60*60*24*7 })
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