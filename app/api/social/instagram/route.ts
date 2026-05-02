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
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || !userId) {
      return NextResponse.json({
        success: false,
        error: 'Instagram credentials not configured'
      }, { status: 500 });
    }

    // Fetch media from Instagram Graph API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,like_count,comments_count&limit=5&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data) {
      return NextResponse.json({
        success: true,
        message: 'No Instagram posts found',
        posts: []
      });
    }

    // Get existing posts to avoid duplicates
    const existingPostsQuery = query(
      collection(db, 'social_posts'),
      where('platform', '==', 'instagram')
    );
    const existingPostsSnapshot = await getDocs(existingPostsQuery);
    const existingPlatformIds = new Set(
      existingPostsSnapshot.docs.map(doc => doc.data().platformId)
    );

    const newPosts = [];

    for (const post of data.data) {
      // Skip if already exists
      if (existingPlatformIds.has(post.id)) {
        continue;
      }

      const postData = {
        platform: 'instagram' as const,
        platformId: post.id,
        content: post.caption || '',
        author: 'OpiumLATAM',
        media: post.media_url ? [post.media_url] : [],
        likes: post.like_count || 0,
        comments: post.comments_count || 0,
        shares: 0,
        createdAt: post.timestamp,
        fetchedAt: new Date().toISOString(),
        url: `https://www.instagram.com/p/${post.id}/`,
        notified: false
      };

      await addDoc(collection(db, 'social_posts'), {
        ...postData,
        createdAt: serverTimestamp()
      });

      newPosts.push(postData);
    }

    return NextResponse.json({
      success: true,
      message: `Fetched ${data.data.length} Instagram posts, ${newPosts.length} new`,
      totalFetched: data.data.length,
      newPosts: newPosts.length,
      posts: newPosts
    });

  } catch (error) {
    console.error('Instagram fetch error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: String(error)
    }, { status: 500 });
  }
}