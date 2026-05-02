import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmvOiL1fJYW9sM_dw1zw-zijtcV4Crb0k",
  authDomain: "opiumlatam.firebaseapp.com",
  projectId: "opiumlatam",
  storageBucket: "opiumlatam.firebasestorage.app",
  messagingSenderId: "572727555725",
  appId: "1:572727555725:web:2ff18230345838002754c4"
};

async function testLoginAndWrite() {
  try {
    console.log('🔍 Testing login and write permissions...');

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    console.log('✅ Firebase initialized');

    // Login with admin credentials
    console.log('🔐 Logging in with admin credentials...');
    const userCredential = await signInWithEmailAndPassword(
      auth,
      'latamopium@gmail.com',
      'YOUR_PASSWORD_HERE' // Replace with actual password
    );

    console.log('✅ Login successful!');
    console.log('👤 User:', {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      emailVerified: userCredential.user.emailVerified
    });

    // Test write with required fields
    console.log('✍️ Testing write with required fields...');
    const testDoc = {
      title: 'Login Test Article',
      section: 'noticias',
      date: new Date().toISOString(),
      category: 'Test',
      excerpt: 'Testing login and write permissions',
      body: 'This is a test to verify login and write permissions',
      author: 'System',
      readtime: '1 min',
      cover: null,
      pinned: false,
      score: null,
      createdAt: serverTimestamp(),
      loginTest: true
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

testLoginAndWrite();