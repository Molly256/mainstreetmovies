import { redis } from '@/lib/redis';
import fs from 'fs';
import path from 'path';

const PER_VIDEO = {0:600,1:600,2:1300,3:1900,4:2000,5:2500,6:4000,7:6250};

export async function POST(req){
  try{
    const { userId, videoId, amount } = await req.json();
    
    if(!userId || !videoId){
      return Response.json({ success:false, error: "Missing data" }, {status:400});
    }

    // Get video info
    let video = null;
    try{
      const filePath = path.join(process.cwd(), 'public', 'trailer_data.json');
      const trailers = JSON.parse(fs.readFileSync(filePath,'utf8'));
      video = trailers.find(t=>String(t.id)===String(videoId));
    } catch{
      try{
        const filePath2 = path.join(process.cwd(), 'trailer_data.json');
        const trailers2 = JSON.parse(fs.readFileSync(filePath2,'utf8'));
        video = trailers2.find(t=>String(t.id)===String(videoId));
      }catch{}
    }

    const vipLevel = parseInt((await redis.get(`user:${userId}:vip`)) || 0);
    const earnAmount = amount || PER_VIDEO[vipLevel] || 600;

    // 1. Add to balance - for My page
    await redis.incrby(`user:${userId}:balance`, earnAmount);

    // 2. Income history - for Income Details button
    const now = new Date();
    const incomeRecord = {
      id: videoId,
      videoId: videoId,
      title: video?.title || `Video ${videoId}`,
      src: video?.src || "",
      income: earnAmount,
      amount: earnAmount,
      type: "task_earn",
      status: "success",
      date: now.toISOString(),
      time: now.toLocaleString()
    };
    await redis.lpush(`user:${userId}:income`, JSON.stringify(incomeRecord));
    await redis.lpush(`user:${userId}:history`, JSON.stringify(incomeRecord));

    // 3. Watched history - for History button page
    const day = now.toISOString().slice(0,10);
    await redis.sadd(`user:${userId}:done:${day}`, String(videoId));
    await redis.sadd(`user:${userId}:watched`, String(videoId));

    return Response.json({ 
      success:true, 
      earnAmount,
      balance: await redis.get(`user:${userId}:balance`)
    });

  } catch(e){
    console.error(e);
    return Response.json({ success:false, error: e.message }, {status:500});
  }
}