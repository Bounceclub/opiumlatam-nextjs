import { NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp, query, where, orderBy, getDocs } from 'firebase/firestore';
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
    const bearerToken = process.env.TWITTER_BEARER_TOKEN;
    const userId = process.env.TWITTER_USER_ID;

    if (!bearerToken || !userId) {
      return NextResponse.json({
        success: false,
        error: 'Twitter credentials not configured'
      }, { status: 500 });
    }

    // Fetch tweets from Twitter API
    const response = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at,public_metrics,attachments,entities&expansions=attachments.media_keys,author_id&user.fields=profile_image_url`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Twitter API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data) {
      return NextResponse.json({
        success: true,
        message: 'No tweets found',
        tweets: []
      });
    }

    // Get existing tweets to avoid duplicates
    const existingTweetsQuery = query(
      collection(db, 'social_posts'),
      where('platform', '==', 'twitter')
    );
    const existingTweetsSnapshot = await getDocs(existingTweetsQuery);
    const existingPlatformIds = new Set(
      existingTweetsSnapshot.docs.map(doc => doc.data().platformId)
    );

    const newTweets = [];

    for (const tweet of data.data) {
      // Skip if already exists
      if (existingPlatformIds.has(tweet.id)) {
        continue;
      }

      const tweetData = {
        platform: 'twitter' as const,
        platformId: tweet.id,
        content: tweet.text,
        author: 'OpiumLATAM',
        authorAvatar: data.includes?.users?.[0]?.profile_image_url,
        media: tweet.attachments?.media_keys?.map((key: string) => {
          const media = data.includes?.media?.find((m: any) => m.media_key === key);
          return media?.url || media?.preview_image_url;
        }).filter(Boolean) || [],
        likes: tweet.public_metrics?.like_count || 0,
        comments: tweet.public_metrics?.reply_count || 0,
        shares: tweet.public_metrics?.retweet_count || 0,
        createdAt: tweet.created_at,
        fetchedAt: new Date().toISOString(),
        url: `https://twitter.com/i/status/${tweet.id}`,
        notified: false
      };

      await addDoc(collection(db, 'social_posts'), {
        ...tweetData,
        createdAt: serverTimestamp()
      });

      newTweets.push(tweetData);
    }

    return NextResponse.json({
      success: true,
      message: `Fetched ${data.data.length} tweets, ${newTweets.length} new`,
      totalFetched: data.data.length,
      newTweets: newTweets.length,
      tweets: newTweets
    });

  } catch (error) {
    console.error('Twitter fetch error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: String(error)
    }, { status: 500 });
  }
}