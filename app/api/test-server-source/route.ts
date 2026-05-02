import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export async function GET() {
  try {
    console.log('🔍 Testing with explicit server configuration...');

    // Initialize Firebase with explicit server configuration
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

    console.log('✅ Firebase initialized');

    // Test query with explicit server source
    console.log('📝 Testing query with server source...');
    const query = collection(db, 'articles');
    const snapshot = await getDocs(query, { source: 'server' });

    console.log(`✅ Query completed. Found ${snapshot.docs.length} documents`);
    console.log(`📊 Snapshot metadata:`, {
      fromCache: snapshot.metadata.fromCache,
      hasPendingWrites: snapshot.metadata.hasPendingWrites
    });

    const articles: Array<{ id: string; title: string; section: string; date: any; fromCache: boolean }> = [];
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        title: data.title,
        section: data.section,
        date: data.date,
        fromCache: snapshot.metadata.fromCache
      });
    });

    return NextResponse.json({
      success: true,
      totalArticles: articles.length,
      fromCache: snapshot.metadata.fromCache,
      hasPendingWrites: snapshot.metadata.hasPendingWrites,
      articles: articles,
      message: snapshot.metadata.fromCache
        ? 'Results from cache (offline mode)'
        : 'Results from server (online mode)'
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