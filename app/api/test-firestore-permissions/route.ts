import { NextResponse } from 'next/server';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    console.log('🔍 Debug: Testing Firestore read/write permissions...');

    // Test 1: Read from articles collection
    console.log('📖 Test 1: Reading from articles collection');
    const readQuery = query(collection(db, 'articles'), orderBy('date', 'desc'));
    const readSnapshot = await getDocs(readQuery);
    console.log(`✅ Read test passed. Found ${readSnapshot.docs.length} articles`);

    // Test 2: Write to articles collection
    console.log('✍️ Test 2: Writing to articles collection');
    const testDoc = {
      title: 'Permission Test',
      section: 'noticias',
      category: 'Test',
      excerpt: 'Testing write permissions',
      body: 'This is a test to verify write permissions',
      author: 'System',
      readtime: '1 min',
      cover: null,
      pinned: false,
      score: null,
      date: new Date().toISOString(),
      createdAt: serverTimestamp(),
      permissionTest: true
    };

    const docRef = await addDoc(collection(db, 'articles'), testDoc);
    console.log(`✅ Write test passed. Created document with ID: ${docRef.id}`);

    // Test 3: Read back the created document
    console.log('📖 Test 3: Reading back the created document');
    const readBackQuery = query(collection(db, 'articles'), orderBy('date', 'desc'));
    const readBackSnapshot = await getDocs(readBackQuery);
    console.log(`✅ Read back test passed. Total articles: ${readBackSnapshot.docs.length}`);

    return NextResponse.json({
      success: true,
      message: 'All permission tests passed',
      tests: {
        read: { passed: true, count: readSnapshot.docs.length },
        write: { passed: true, documentId: docRef.id },
        readBack: { passed: true, totalCount: readBackSnapshot.docs.length }
      },
      testDocument: {
        id: docRef.id,
        ...testDoc
      }
    });
  } catch (error) {
    console.error('❌ Permission test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}