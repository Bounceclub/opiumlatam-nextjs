import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy, listCollections } from 'firebase/firestore';

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

    // List all collections
    console.log('📚 Listing all collections...');
    const collections = await listCollections(db);
    console.log(`✅ Found ${collections.length} collections:`);
    collections.forEach(col => {
      console.log(`   - ${col.id}`);
    });

    // Check each collection
    for (const col of collections) {
      console.log(`\n📄 Checking collection: ${col.id}`);
      const snapshot = await getDocs(collection(db, col.id));
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
    }

    console.log('\n🎉 Check complete!');

  } catch (error) {
    console.error('❌ Check failed:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
  }
}

checkFirestoreCollections();