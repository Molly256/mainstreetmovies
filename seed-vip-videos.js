import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

// YOUR VIDEO VIP CONFIG - based on your chart
const VIPS = {
  0: { videos: 3, perVideo: 600, daily: 1800 },
  1: { videos: 3, perVideo: 600, daily: 1800 },
  2: { videos: 6, perVideo: 1300, daily: 7800 },
  3: { videos: 10, perVideo: 1900, daily: 19000 },
  4: { videos: 15, perVideo: 2000, daily: 30000 },
  5: { videos: 20, perVideo: 2500, daily: 50000 },
  6: { videos: 25, perVideo: 4000, daily: 100000 },
  7: { videos: 40, perVideo: 6250, daily: 250000 },
};

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getUgandaDateString() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Kampala' });
}

async function assignVideosToUser(phone, vipLevel, today, pipeline) {
  const selectedVip = VIPS[vipLevel];

  // Folder with your 50 compressed videos
  const trailersDir = path.join(process.cwd(), 'public/trailers_compressed');
  const trailerFiles = fs.readdirSync(trailersDir).filter(f => f.endsWith('.mp4'));

  if (trailerFiles.length === 0) throw new Error('No videos found in public/trailers_compressed');

  // Create video objects from files
  const allVideos = trailerFiles.map((file, idx) => ({
    id: String(idx + 1),
    title: file.replace('.mp4','').replace(/_/g,' ').replace(/-/g,' '),
    file: file
  }));

  const shuffled = shuffle(allVideos);
  const videosToAssign = shuffled.slice(0, Math.min(selectedVip.videos, allVideos.length));
  const unlockedVideos = videosToAssign.map(v => String(v.id));

  videosToAssign.forEach(v => {
    const videoId = String(v.id);
    const videoKey = `video:${phone}:${today}:${videoId}`;
    pipeline.hset(videoKey, {
      phone,
      videoId,
      vipLevel: String(vipLevel),
      reward: selectedVip.perVideo,
      title: v.title,
      video: `/trailers_compressed/${v.file}`,
      status: 'pending',
      date: today,
      createdAt: String(Date.now())
    });
    pipeline.sadd(`videos:${phone}:${today}`, videoId);
  });

  return { unlockedVideos };
}

async function seedVipVideos() {
  try {
    console.log('🔄 Starting VIP VIDEO seeding...');
    const today = getUgandaDateString();
    console.log(`🌍 Ugandan Date: ${today}`);

    const userKeys = await redis.keys('user:*');
    if (userKeys.length === 0) {
      console.log('⚠️ No users found');
      return;
    }

    let seededCount = 0;
    let skippedCount = 0;

    for (const key of userKeys) {
      if (!key.startsWith('user:')) continue;

      const user = await redis.hgetall(key);

      if (!user ||!user.phone) {
        skippedCount++;
        continue;
      }

      const phone = String(user.phone).trim();
      const hasBoughtVip = user.hasBoughtVip === 'true' || user.hasBoughtVip === true;
      const currentVip = Number(user.vip || user.vipLevel || 0);

      if (hasBoughtVip) {
        const selectedVip = VIPS[currentVip];
        if (!selectedVip) {
          console.log(`⚠️ User ${phone} invalid VIP ${currentVip}, skipping`);
          continue;
        }

        const pipeline = redis.pipeline();

        // Clear today's videos
        pipeline.del(`videos:${phone}:${today}`);

        const { unlockedVideos } = await assignVideosToUser(phone, currentVip, today, pipeline);

        // Reset daily tracking
        pipeline.hset(key, {
          unlockedVideos: JSON.stringify(unlockedVideos),
          completedVideos: '[]',
          videos_watched_today: '0',
          dailyIncome: '0',
          lastResetDate: today
        });

        await pipeline.exec();
        seededCount++;
        console.log(`✅ Seeded ${unlockedVideos.length} videos for ${phone} (VIP ${currentVip})`);
      } else {
        skippedCount++;
      }
    }

    console.log(`\n📊 --- Seeding Report ---`);
    console.log(`✅ Seeded: ${seededCount} VIP users`);
    console.log(`Skipped: ${skippedCount}`);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  }
}

seedVipVideos();