import { NextResponse } from 'next/server';
import { collection, getDocs, query, orderBy, where, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    console.log('🔍 Debug: Detailed articles check...');

    // Test 1: Get all documents in articles collection
    console.log('📝 Test 1: Get all documents in articles collection');
    const allDocsQuery = query(collection(db, 'articles'));
    const allDocsSnapshot = await getDocs(allDocsQuery);
    console.log(`✅ Found ${allDocsSnapshot.docs.length} total documents`);

    if (allDocsSnapshot.docs.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No documents found in articles collection',
        totalDocuments: 0,
        articles: []
      });
    }

    // Get detailed information about each document
    const articles = [];
    for (const docSnapshot of allDocsSnapshot.docs) {
      const data = docSnapshot.data();
      articles.push({
        id: docSnapshot.id,
        title: data.title,
        section: data.section,
        date: data.date,
        pinned: data.pinned,
        category: data.category,
        excerpt: data.excerpt,
        author: data.author,
        cover: data.cover,
        hasAllRequiredFields: data.title && data.section && data.date,
        fields: Object.keys(data)
      });
    }

    // Test 2: Get noticias
    console.log('📰 Test 2: Get noticias');
    const noticiasQuery = query(
      collection(db, 'articles'),
      where('section', '==', 'noticias'),
      orderBy('date', 'desc')
    );
    const noticiasSnapshot = await getDocs(noticiasQuery);
    console.log(`✅ Found ${noticiasSnapshot.docs.length} noticias`);

    // Test 3: Get discusion
    console.log('💬 Test 3: Get discusion');
    const discusionQuery = query(
      collection(db, 'articles'),
      where('section', '==', 'discusion'),
      orderBy('date', 'desc')
    );
    const discusionSnapshot = await getDocs(discusionQuery);
    console.log(`✅ Found ${discusionSnapshot.docs.length} discusion`);

    // Test 4: Get resenas
    console.log('⭐ Test 4: Get resenas');
    const resenasQuery = query(
      collection(db, 'articles'),
      where('section', '==', 'resenas'),
      orderBy('date', 'desc')
    );
    const resenasSnapshot = await getDocs(resenasQuery);
    console.log(`✅ Found ${resenasSnapshot.docs.length} resenas`);

    // Test 5: Get pinned
    console.log('📌 Test 5: Get pinned');
    const pinnedQuery = query(
      collection(db, 'articles'),
      where('pinned', '==', true),
      orderBy('date', 'desc')
    );
    const pinnedSnapshot = await getDocs(pinnedQuery);
    console.log(`✅ Found ${pinnedSnapshot.docs.length} pinned`);

    return NextResponse.json({
      success: true,
      results: {
        totalDocuments: allDocsSnapshot.docs.length,
        noticias: noticiasSnapshot.docs.length,
        discusion: discusionSnapshot.docs.length,
        resenas: resenasSnapshot.docs.length,
        pinned: pinnedSnapshot.docs.length
      },
      articles: articles,
      sectionsFound: {
        noticias: noticiasSnapshot.docs.length > 0,
        discusion: discusionSnapshot.docs.length > 0,
        resenas: resenasSnapshot.docs.length > 0
      }
    });
  } catch (error) {
    console.error('❌ Debug error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: String(error)
    }, { status: 500 });
  }
}