import { NextResponse } from 'next/server';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    console.log('🔍 Testing articles with admin SDK...');

    // Test 1: Get all articles
    console.log('📝 Test 1: Get all articles');
    const allQuery = query(collection(db, 'articles'), orderBy('date', 'desc'));
    const allSnapshot = await getDocs(allQuery);
    console.log(`✅ Found ${allSnapshot.docs.length} articles`);

    const allArticles = allSnapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title,
      section: doc.data().section,
      date: doc.data().date,
      fromCache: allSnapshot.metadata.fromCache
    }));

    // Test 2: Get noticias
    console.log('📰 Test 2: Get noticias');
    const noticiasQuery = query(
      collection(db, 'articles'),
      where('section', '==', 'noticias'),
      orderBy('date', 'desc')
    );
    const noticiasSnapshot = await getDocs(noticiasQuery);
    console.log(`✅ Found ${noticiasSnapshot.docs.length} noticias`);

    const noticiasArticles = noticiasSnapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title,
      section: doc.data().section,
      date: doc.data().date,
      fromCache: noticiasSnapshot.metadata.fromCache
    }));

    return NextResponse.json({
      success: true,
      results: {
        total: allArticles.length,
        noticias: noticiasArticles.length,
        fromCache: allSnapshot.metadata.fromCache
      },
      articles: {
        all: allArticles,
        noticias: noticiasArticles
      },
      message: allSnapshot.metadata.fromCache
        ? 'Results from cache (offline mode)'
        : 'Results from server (online mode)'
    });

  } catch (error) {
    console.error('❌ Test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: String(error)
    }, { status: 500 });
  }
}