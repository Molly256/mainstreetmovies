import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export async function POST(req) {
  try {
    const body = await req.json()
    const { action } = body

    // REGISTER
    if (action === 'register') {
      const { username, phone, loginPassword, transactionPassword, gender, countryCode, countryName, invitedBy } = body

      if (!username || !phone || !loginPassword) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
      }

      // Check if username exists
      const existingUser = await redis.hget(`user:${username}`, 'username')
      if (existingUser) {
        return NextResponse.json({ error: 'Username already exists' }, { status: 400 })
      }

      // Check phone exists
      const phoneExists = await redis.get(`phone:${phone}`)
      if (phoneExists) {
        return NextResponse.json({ error: 'Phone already registered' }, { status: 400 })
      }

      const userData = {
        username,
        phone,
        password: loginPassword, // In production hash this!
        transactionPassword: transactionPassword || '',
        gender: gender || '',
        countryCode: countryCode || '',
        countryName: countryName || '',
        invitedBy: invitedBy || 'NO_INVITE',
        createdAt: new Date().toISOString(),
        balance: '0'
      }

      // Save user hash
      await redis.hset(`user:${username}`, userData)
      // Map phone -> username for login by phone
      await redis.set(`phone:${phone}`, username)
      // Add to users list
      await redis.sadd('users:list', username)

      console.log('User registered:', username)

      const res = NextResponse.json({ success: true, user: { username, phone } }, { status: 200 })
      res.cookies.set('user', JSON.stringify({ username, phone }), { path: '/', maxAge: 60*60*24*7 })
      return res
    }

    // LOGIN
    if (action === 'login') {
      const { loginType, username, phone, password, countryCode } = body

      if (!password) {
        return NextResponse.json({ error: 'Password required' }, { status: 400 })
      }

      let targetUsername = username

      // If login by phone, find username from phone
      if (loginType === 'phone') {
        const fullPhone = phone // already includes country code from frontend
        targetUsername = await redis.get(`phone:${fullPhone}`)
        if (!targetUsername) {
          // Try with just phone search
          const keys = await redis.keys('phone:*')
          for (const key of keys) {
            if (fullPhone.includes(key.replace('phone:', '')) || key.includes(fullPhone)) {
              targetUsername = await redis.get(key)
              break
            }
          }
        }
        if (!targetUsername) {
          return NextResponse.json({ error: 'Phone not found' }, { status: 401 })
        }
      }

      const user = await redis.hgetall(`user:${targetUsername}`)
      if (!user || !user.username) {
        return NextResponse.json({ error: 'User not found' }, { status: 401 })
      }

      if (user.password !== password) {
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

// Optional: GET to list users for testing
export async function GET() {
  try {
    const redis = Redis.fromEnv()
    const users = await redis.smembers('users:list')
    return NextResponse.json({ users, count: users.length })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}