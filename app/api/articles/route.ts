import { NextResponse } from 'next/server';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Article } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    console.log('🔍 Fetching articles with Firebase Client SDK...');
    console.log(`📝 Section filter: ${section || 'none'}`);

    let snapshot;

    if (section) {
      snapshot = await getDocs(
        query(
          collection(db, 'articles'),
          where('section', '==', section),
          orderBy('date', 'desc')
        )
      );
    } else {
      snapshot = await getDocs(
        query(collection(db, 'articles'), orderBy('date', 'desc'))
      );
    }

    console.log(`✅ Found ${snapshot.docs.length} articles`);

    const articles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Article[];

    return NextResponse.json({
      success: true,
      articles: articles,
      count: articles.length,
      section: section || 'all'
    });

  } catch (error) {
    console.error('❌ Error fetching articles:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: String(error)
    }, { status: 500 });
  }
}
