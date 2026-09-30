import { redis } from '@/lib/redis';
export async function GET(req){
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || 'user_123';
  const raw = await redis.lrange(`user:${userId}:history`, 0, 100) || [];
  const history = raw.map(r=>{ try{ return JSON.parse(r); }catch{ return null; } }).filter(Boolean);
  return Response.json({ history });
}