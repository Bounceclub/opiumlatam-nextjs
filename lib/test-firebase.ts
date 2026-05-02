import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export async function testFirebaseConnection() {
  console.log('🔍 Testing Firebase connection...');

  try {
    // Test 1: Get all articles
    console.log('📝 Fetching all articles...');
    const articlesRef = collection(db, 'articles');
    const snapshot = await getDocs(articlesRef);

    console.log(`✅ Found ${snapshot.docs.length} articles in total`);

    if (snapshot.docs.length > 0) {
      console.log('📋 Sample article data:');
      const firstArticle = snapshot.docs[0].data();
      console.log(JSON.stringify(firstArticle, null, 2));

      // Test 2: Get articles by section
      console.log('\n🔍 Testing section queries...');

      const sections = ['noticias', 'discusion', 'resenas'];
      for (const section of sections) {
        const q = query(collection(db, 'articles'), orderBy('date', 'desc'));
        const sectionSnapshot = await getDocs(q);
        const sectionArticles = sectionSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((article: any) => article.section === section);

        console.log(`📂 ${section}: ${sectionArticles.length} articles`);
      }

      // Test 3: Check for pinned articles
      console.log('\n📌 Checking for pinned articles...');
      const pinnedArticles = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((article: any) => article.pinned === true);

      console.log(`📌 Found ${pinnedArticles.length} pinned articles`);

      return {
        success: true,
        totalArticles: snapshot.docs.length,
        sections: {
          noticias: snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((article: any) => article.section === 'noticias').length,
          discusion: snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((article: any) => article.section === 'discusion').length,
          resenas: snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((article: any) => article.section === 'resenas').length,
        },
        pinned: pinnedArticles.length,
      };
    } else {
      console.warn('⚠️ No articles found in database');
      return {
        success: false,
        error: 'No articles found',
        totalArticles: 0,
      };
    }
  } catch (error) {
    console.error('❌ Firebase connection error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
