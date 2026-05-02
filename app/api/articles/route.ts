import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { Article } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    console.log('🔍 Fetching articles with Firebase Admin SDK...');
    console.log(`📝 Section filter: ${section || 'none'}`);

    let snapshot;

    if (section) {
      // Get all articles and filter for section (simpler approach that doesn't require index)
      const allSnapshot = await adminDb.collection('articles')
        .orderBy('date', 'desc')
        .get();

      console.log(`✅ Found ${allSnapshot.docs.length} total articles`);

      // Filter for section
      const filteredDocs = allSnapshot.docs.filter(doc => doc.data().section === section);

      console.log(`✅ Found ${filteredDocs.length} articles in section "${section}"`);

      const articles = filteredDocs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data
        } as Article;
      });

      return NextResponse.json({
        success: true,
        articles: articles,
        count: articles.length,
        section: section
      });
    } else {
      // Get all articles
      snapshot = await adminDb.collection('articles')
        .orderBy('date', 'desc')
        .get();

      console.log(`✅ Found ${snapshot.docs.length} articles`);

      const articles = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data
        } as Article;
      });

      return NextResponse.json({
        success: true,
        articles: articles,
        count: articles.length,
        section: 'all'
      });
    }

  } catch (error) {
    console.error('❌ Error fetching articles:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: String(error)
    }, { status: 500 });
  }
}