import { NextResponse } from 'next/server';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmvOiL1fJYW9sM_dw1zw-zijtcV4Crb0k",
  authDomain: "opiumlatam.firebaseapp.com",
  projectId: "opiumlatam",
  storageBucket: "opiumlatam.firebasestorage.app",
  messagingSenderId: "572727555725",
  appId: "1:572727555725:web:2ff18230345838002754c4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function GET() {
  try {
    console.log('🔍 Debug: Testing Firestore queries...');

    // Test 1: Get all articles
    console.log('📝 Test 1: Get all articles');
    const allArticlesQuery = query(collection(db, 'articles'), orderBy('date', 'desc'));
    const allSnapshot = await getDocs(allArticlesQuery);
    console.log(`✅ Found ${allSnapshot.docs.length} total articles`);

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

    // Get sample data
    const sampleArticles = allSnapshot.docs.slice(0, 3).map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      section: doc.data().section,
      date: doc.data().date,
      pinned: doc.data().pinned
    }));

    return NextResponse.json({
      success: true,
      results: {
        total: allSnapshot.docs.length,
        noticias: noticiasSnapshot.docs.length,
        discusion: discusionSnapshot.docs.length,
        resenas: resenasSnapshot.docs.length,
        pinned: pinnedSnapshot.docs.length
      },
      sampleArticles
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
