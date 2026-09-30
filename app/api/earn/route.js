import { redis } from '@/lib/redis';
import fs from 'fs';
import path from 'path';

const PER_VIDEO = {0:600,1:600,2:1300,3:1900,4:2000,5:2500,6:4000,7:6250};

export async function POST(req){
  const { userId, videoId } = await req.json();
  const filePath = path.join(process.cwd(), 'trailers_data.json');
  const trailers = JSON.parse(fs.readFileSync(filePath,'utf8'));
  const video = trailers.find(t=>String(t.id)===String(videoId));

  const vipLevel = parseInt((await redis.get(`user:${userId}:vip`)) || 0);
  const earnAmount = PER_VIDEO[vipLevel] || 600;

  await redis.incrby(`user:${userId}:balance`, earnAmount);
  await redis.lpush(`user:${userId}:history`, JSON.stringify({
    id: videoId, title: video?.title, src: video?.src, income: earnAmount, date: new Date().toISOString()
  }));
  await redis.sadd(`user:${userId}:done:${new Date().toISOString().slice(0,10)}`, videoId);

  return Response.json({ success:true, earnAmount });
}