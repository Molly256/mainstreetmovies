import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export async function GET() {
  const messages = await redis.lrange('chatroom:messages', -100, -1)
  const parsed = messages.map(m => typeof m === 'string' ? JSON.parse(m) : m)
  return NextResponse.json(parsed)
}

export async function POST(req) {
  const { text, imageUrl } = await req.json()

  const msg = {
    id: Date.now().toString(),
    text: text || '',
    image: imageUrl || null,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    createdAt: Date.now()
  }

  await redis.rpush('chatroom:messages', JSON.stringify(msg))

  return NextResponse.json(msg)
}