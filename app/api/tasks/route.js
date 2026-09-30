import { redis } from '@/lib/redis';
import fs from 'fs';
import path from 'path';

export async function GET(req){
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || 'user_123';

  const filePath = path.join(process.cwd(), 'trailers_data.json');
  const trailers = JSON.parse(fs.readFileSync(filePath,'utf8'));

  const vipLevel = parseInt((await redis.get(`user:${userId}:vip`)) || 0);
  const counts = {0:3,1:3,2:6,3:10,4:15,5:20,6:25,7:40};
  const need = counts[vipLevel] || 3;

  const today = new Date().toISOString().slice(0,10);
  const done = await redis.smembers(`user:${userId}:done:${today}`) || [];

  const available = trailers.filter(t=>!done.includes(String(t.id))).slice(0, need);
  return Response.json({ vipLevel, videos: available });
}