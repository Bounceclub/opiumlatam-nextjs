import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmvOiL1fJYW9sM_dw1zw-zijtcV4Crb0k",
  authDomain: "opiumlatam.firebaseapp.com",
  projectId: "opiumlatam",
  storageBucket: "opiumlatam.firebasestorage.app",
  messagingSenderId: "572727555725",
  appId: "1:572727555725:web:2ff18230345838002754c4"
};

async function checkFirestoreCollections() {
  try {
    console.log('🔍 Checking Firestore collections...');

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log('✅ Firebase initialized');

    // listCollections is only available in Firebase Admin SDK — use an API route with firebase-admin/firestore instead

    // Check known collections manually
    const knownCollections = ['articles', 'comments', 'likes', 'subscribers'];

    for (const colId of knownCollections) {
      console.log(`\n📄 Checking collection: ${colId}`);
      try {
        const snapshot = await getDocs(collection(db, colId));
        console.log(`   Documents: ${snapshot.docs.length}`);

        if (snapshot.docs.length > 0) {
          console.log('   Sample documents:');
          snapshot.docs.slice(0, 3).forEach(doc => {
            const data = doc.data();
            console.log(`   - ID: ${doc.id}`);
            console.log(`     Fields: ${Object.keys(data).join(', ')}`);
            if (data.title) {
              console.log(`     Title: ${data.title}`);
            }
          });
        }
      } catch (error) {
        console.log(`   Error checking ${colId}:`, error instanceof Error ? error.message : String(error));
      }
    }

    console.log('\n🎉 Check complete!');

  } catch (error) {
    console.error('❌ Check failed:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
  }
}

checkFirestoreCollections();
