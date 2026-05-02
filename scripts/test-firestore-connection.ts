import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmvOiL1fJYW9sM_dw1zw-zijtcV4Crb0k",
  authDomain: "opiumlatam.firebaseapp.com",
  projectId: "opiumlatam",
  storageBucket: "opiumlatam.firebasestorage.app",
  messagingSenderId: "572727555725",
  appId: "1:572727555725:web:2ff18230345838002754c4"
};

async function testFirestoreConnection() {
  try {
    console.log('🔍 Testing Firestore connection...');

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized');

    // Get Firestore
    const db = getFirestore(app);
    console.log('✅ Firestore initialized');

    // Test 1: Read from articles collection
    console.log('📖 Test 1: Reading from articles collection');
    const readQuery = query(collection(db, 'articles'), orderBy('date', 'desc'));
    const readSnapshot = await getDocs(readQuery);
    console.log(`✅ Read test passed. Found ${readSnapshot.docs.length} articles`);

    // Test 2: Write to articles collection
    console.log('✍️ Test 2: Writing to articles collection');
    const testDoc = {
      title: 'Connection Test',
      section: 'noticias',
      category: 'Test',
      excerpt: 'Testing connection',
      body: 'This is a connection test',
      author: 'System',
      readtime: '1 min',
      cover: null,
      pinned: false,
      score: null,
      date: new Date().toISOString(),
      createdAt: serverTimestamp(),
      connectionTest: true
    };

    const docRef = await addDoc(collection(db, 'articles'), testDoc);
    console.log(`✅ Write test passed. Created document with ID: ${docRef.id}`);

    // Test 3: Read back the created document
    console.log('📖 Test 3: Reading back the created document');
    const readBackQuery = query(collection(db, 'articles'), orderBy('date', 'desc'));
    const readBackSnapshot = await getDocs(readBackQuery);
    console.log(`✅ Read back test passed. Total articles: ${readBackSnapshot.docs.length}`);

    console.log('🎉 All tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
  }
}

testFirestoreConnection();