import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    console.log('🔍 Testing with Firebase Admin SDK...');

    // Test query
    console.log('📝 Testing query...');
    const snapshot = await adminDb.collection('articles').get();

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
