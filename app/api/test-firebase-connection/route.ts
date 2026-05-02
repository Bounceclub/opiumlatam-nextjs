import { NextResponse } from 'next/server';
import { collection, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
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

export async function GET() {
  try {
    console.log('🔍 Testing Firebase connection...');

    // Test 1: Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized');

    // Test 2: Get Firestore
    const db = getFirestore(app);
    console.log('✅ Firestore initialized');

    // Test 3: Try to read articles
    const articlesRef = collection(db, 'articles');
    const snapshot = await getDocs(articlesRef);
    console.log(`📊 Found ${snapshot.docs.length} articles`);

    // Test 4: Check if we can read the data
    if (snapshot.docs.length > 0) {
      const firstDoc = snapshot.docs[0];
      const data = firstDoc.data();
      console.log('📋 Sample article data:', data);

      return NextResponse.json({
        success: true,
        message: 'Firebase connection working',
        totalArticles: snapshot.docs.length,
        sampleArticle: {
          id: firstDoc.id,
          title: data.title,
          section: data.section,
          date: data.date
        }
      });
    } else {
      return NextResponse.json({
        success: true,
        message: 'Firebase connection working but no articles found',
        totalArticles: 0,
        advice: 'Please create articles in the admin panel at /admin'
      });
    }
  } catch (error) {
    console.error('❌ Firebase error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
