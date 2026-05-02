import { NextResponse } from 'next/server';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    console.log('🔍 Testing frontend article queries...');

    // Test 1: Get all articles (like useArticles without section)
    console.log('📝 Test 1: Get all articles (no section filter)');
    const allQuery = query(collection(db, 'articles'), orderBy('date', 'desc'));
    const allSnapshot = await getDocs(allQuery);
    console.log(`✅ Found ${allSnapshot.docs.length} articles`);

    const allArticles = allSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Array<{ id: string; title: string; section: string; date: any }>;

    // Test 2: Get noticias (like useArticles('noticias'))
    console.log('📰 Test 2: Get noticias (section = "noticias")');
    const noticiasQuery = query(
      collection(db, 'articles'),
      where('section', '==', 'noticias'),
      orderBy('date', 'desc')
    );
    const noticiasSnapshot = await getDocs(noticiasQuery);
    console.log(`✅ Found ${noticiasSnapshot.docs.length} noticias`);

    const noticiasArticles = noticiasSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Array<{ id: string; title: string; section: string; date: any }>;

    // Test 3: Get discusion (like useArticles('discusion'))
    console.log('💬 Test 3: Get discusion (section = "discusion")');
    const discusionQuery = query(
      collection(db, 'articles'),
      where('section', '==', 'discusion'),
      orderBy('date', 'desc')
    );
    const discusionSnapshot = await getDocs(discusionQuery);
    console.log(`✅ Found ${discusionSnapshot.docs.length} discusion`);

    const discusionArticles = discusionSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Array<{ id: string; title: string; section: string; date: any }>;

    // Test 4: Get resenas (like useArticles('resenas'))
    console.log('⭐ Test 4: Get resenas (section = "resenas")');
    const resenasQuery = query(
      collection(db, 'articles'),
      where('section', '==', 'resenas'),
      orderBy('date', 'desc')
    );
    const resenasSnapshot = await getDocs(resenasQuery);
    console.log(`✅ Found ${resenasSnapshot.docs.length} resenas`);

    const resenasArticles = resenasSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Array<{ id: string; title: string; section: string; date: any }>;

    return NextResponse.json({
      success: true,
      results: {
        total: allArticles.length,
        noticias: noticiasArticles.length,
        discusion: discusionArticles.length,
        resenas: resenasArticles.length
      },
      articles: {
        all: allArticles.map(a => ({ id: a.id, title: a.title, section: a.section, date: a.date })),
        noticias: noticiasArticles.map(a => ({ id: a.id, title: a.title, section: a.section, date: a.date })),
        discusion: discusionArticles.map(a => ({ id: a.id, title: a.title, section: a.section, date: a.date })),
        resenas: resenasArticles.map(a => ({ id: a.id, title: a.title, section: a.section, date: a.date }))
      }
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