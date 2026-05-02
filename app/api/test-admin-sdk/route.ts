import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

export async function GET() {
  try {
    console.log('🔍 Testing with Firebase Admin SDK...');

    // Initialize Firebase Admin
    if (!admin.apps.length) {
      try {
        // Try to initialize with environment variables (for Vercel deployment)
        if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
          const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            projectId: 'opiumlatam'
          });
          console.log('✅ Firebase Admin initialized with environment variables');
        } else {
          // Try to initialize with service account file (for local development)
          const serviceAccount = require('../../firebase-service-account.json');
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            projectId: 'opiumlatam'
          });
          console.log('✅ Firebase Admin initialized with service account file');
        }
      } catch (error) {
        console.log('⚠️ Could not initialize with service account, trying default config');
        // Fallback to default config
        admin.initializeApp({
          projectId: 'opiumlatam'
        });
        console.log('✅ Firebase Admin initialized with default config');
      }
    }

    const db = admin.firestore();

    // Test query
    console.log('📝 Testing query...');
    const snapshot = await db.collection('articles').get();

    console.log(`✅ Query completed. Found ${snapshot.docs.length} documents`);

    const articles: Array<{ id: string; title: string; section: string; date: any }> = [];
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        title: data.title,
        section: data.section,
        date: data.date
      });
    });

    return NextResponse.json({
      success: true,
      totalArticles: articles.length,
      articles: articles,
      message: 'Firebase Admin SDK test completed'
    });

  } catch (error) {
    console.error('❌ Test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}