import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmvOiL1fJYW9sM_dw1zw-zijtcV4Crb0k",
  authDomain: "opiumlatam.firebaseapp.com",
  projectId: "opiumlatam",
  storageBucket: "opiumlatam.firebasestorage.app",
  messagingSenderId: "572727555725",
  appId: "1:572727555725:web:2ff18230345838002754c4"
};

async function testAuthAndWrite() {
  try {
    console.log('🔍 Testing authentication and write permissions...');

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    console.log('✅ Firebase initialized');

    // Check current auth state
    const user = auth.currentUser;
    console.log('👤 Current user:', user ? {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified
    } : 'No user authenticated');

    if (!user) {
      console.log('❌ No user authenticated. Please login first.');
      console.log('💡 You can login with: latamopium@gmail.com');
      return;
    }

    if (user.email !== 'latamopium@gmail.com') {
      console.log('❌ User email is not latamopium@gmail.com');
      console.log(`💡 Current email: ${user.email}`);
      return;
    }

    console.log('✅ User authenticated with correct email');

    // Test write with required fields
    console.log('✍️ Testing write with required fields...');
    const testDoc = {
      title: 'Auth Test Article',
      section: 'noticias',
      date: new Date().toISOString(),
      category: 'Test',
      excerpt: 'Testing auth and write permissions',
      body: 'This is a test to verify auth and write permissions',
      author: 'System',
      readtime: '1 min',
      cover: null,
      pinned: false,
      score: null,
      createdAt: serverTimestamp(),
      authTest: true
    };

    console.log('📝 Creating test document:', testDoc);

    const docRef = await addDoc(collection(db, 'articles'), testDoc);
    console.log(`✅ Write test passed! Created document with ID: ${docRef.id}`);

    console.log('🎉 All tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
  }
}

testAuthAndWrite();