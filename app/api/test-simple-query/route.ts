import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    console.log('🔍 Testing simple Firestore query...');

    // Test 1: Simple query without any filters
    console.log('📝 Test 1: Simple query (no filters, no ordering)');
    const simpleQuery = collection(db, 'articles');
    const simpleSnapshot = await getDocs(simpleQuery);
    console.log(`✅ Found ${simpleSnapshot.docs.length} articles`);

    const articles = [];
    simpleSnapshot.docs.forEach(doc => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        title: data.title,
        section: data.section,
        date: data.date,
        allFields: Object.keys(data)
      });
    });

    return NextResponse.json({
      success: true,
      totalArticles: articles.length,
      articles: articles
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