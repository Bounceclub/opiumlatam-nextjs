import { NextResponse } from 'next/server';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

export async function GET() {
  try {
    console.log('🔍 Testing Firestore database access...');

    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyDmvOiL1fJYW9sM_dw1zw-zijtcV4Crb0k",
      authDomain: "opiumlatam.firebaseapp.com",
      projectId: "opiumlatam",
      storageBucket: "opiumlatam.firebasestorage.app",
      messagingSenderId: "572727555725",
      appId: "1:572727555725:web:2ff18230345838002754c4"
    };

    console.log('🔧 Firebase config:', firebaseConfig);

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log('✅ Firebase initialized');
    console.log('📊 Database info:', {
      projectId: db.app.options.projectId,
      appName: db.app.name
    });

    // Test 1: Try to access articles collection
    console.log('📝 Test 1: Accessing articles collection...');
    try {
      const articlesQuery = collection(db, 'articles');
      const articlesSnapshot = await getDocs(articlesQuery);
      console.log(`✅ Articles collection accessible. Found ${articlesSnapshot.docs.length} documents`);

      if (articlesSnapshot.docs.length > 0) {
        const firstDoc = articlesSnapshot.docs[0];
        console.log('📄 First document:', {
          id: firstDoc.id,
          data: firstDoc.data()
        });
      }
    } catch (error) {
      console.error('❌ Error accessing articles collection:', error);
      throw error;
    }

    // Test 2: Try to access a specific document
    console.log('📄 Test 2: Accessing specific document...');
    try {
      const docRef = doc(db, 'articles', 'RddfTk4cMAjaTfL6VS1J');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('✅ Document exists:', {
          id: docSnap.id,
          data: docSnap.data()
        });
      } else {
        console.log('❌ Document does not exist');
      }
    } catch (error) {
      console.error('❌ Error accessing document:', error);
    }

    // Test 3: Try to access other collections
    console.log('📚 Test 3: Accessing other collections...');
    const otherCollections = ['subscribers', 'config', 'pushSubscriptions'];

    for (const colName of otherCollections) {
      try {
        const colQuery = collection(db, colName);
        const colSnapshot = await getDocs(colQuery);
        console.log(`✅ ${colName}: ${colSnapshot.docs.length} documents`);
      } catch (error) {
        console.log(`❌ ${colName}: Error - ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Firestore database access test completed'
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