import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { Article } from '@/types';

export async function GET() {
  try {
    console.log('🔍 Fetching pinned article with Firebase Admin SDK...');

    // Get all articles and filter for pinned (simpler approach that doesn't require index)
    const snapshot = await adminDb.collection('articles')
      .orderBy('date', 'desc')
      .get();

    console.log(`✅ Found ${snapshot.docs.length} total articles`);

    // Find the first pinned article
    const pinnedDoc = snapshot.docs.find(doc => doc.data().pinned === true);

    if (!pinnedDoc) {
      return NextResponse.json({
        success: true,
        article: null,
        message: 'No pinned article found'
      });
    }

    const article = {
      id: pinnedDoc.id,
      ...pinnedDoc.data()
    } as Article;

    console.log(`✅ Found pinned article: ${article.title}`);

    return NextResponse.json({
      success: true,
      article: article
    });

  } catch (error) {
    console.error('❌ Error fetching pinned article:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: String(error)
    }, { status: 500 });
  }
}