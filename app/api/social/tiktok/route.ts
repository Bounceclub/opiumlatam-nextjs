import { NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function GET() {
  try {
    const accessToken = process.env.TIKTOK_ACCESS_TOKEN;
    const userId = process.env.TIKTOK_USER_ID;

    if (!accessToken || !userId) {
      return NextResponse.json({
        success: false,
        error: 'TikTok credentials not configured'
      }, { status: 500 });
    }

    // Fetch videos from TikTok API
    const response = await fetch(
      `https://open.tiktokapis.com/v2/video/list/?fields=id,video_description,create_time,cover_image_url,embed_html,embed_link,statistics&access_token=${accessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          max_count: 5
        })
      }
    );

    if (!response.ok) {
      throw new Error(`TikTok API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data?.videos) {
      return NextResponse.json({
        success: true,
        message: 'No TikTok videos found',
        videos: []
      });
    }

    // Get existing videos to avoid duplicates
    const existingVideosQuery = query(
      collection(db, 'social_posts'),
      where('platform', '==', 'tiktok')
    );
    const existingVideosSnapshot = await getDocs(existingVideosQuery);
    const existingPlatformIds = new Set(
      existingVideosSnapshot.docs.map(doc => doc.data().platformId)
    );

    const newVideos = [];

    for (const video of data.data.videos) {
      // Skip if already exists
      if (existingPlatformIds.has(video.id)) {
        continue;
      }

      const videoData = {
        platform: 'tiktok' as const,
        platformId: video.id,
        content: video.video_description || '',
        author: 'OpiumLATAM',
        media: video.cover_image_url ? [video.cover_image_url] : [],
        likes: video.statistics?.like_count || 0,
        comments: video.statistics?.comment_count || 0,
        shares: video.statistics?.share_count || 0,
        createdAt: new Date(video.create_time * 1000).toISOString(),
        fetchedAt: new Date().toISOString(),
        url: video.embed_link || `https://www.tiktok.com/@${userId}/video/${video.id}`,
        notified: false
      };

      await addDoc(collection(db, 'social_posts'), {
        ...videoData,
        createdAt: serverTimestamp()
      });

      newVideos.push(videoData);
    }

    return NextResponse.json({
      success: true,
      message: `Fetched ${data.data.videos.length} TikTok videos, ${newVideos.length} new`,
      totalFetched: data.data.videos.length,
      newVideos: newVideos.length,
      videos: newVideos
    });

  } catch (error) {
    console.error('TikTok fetch error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: String(error)
    }, { status: 500 });
  }
}