import { NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST() {
  try {
    console.log('🔍 Debug: Testing article creation...');

    const testArticle = {
      title: 'Test Article',
      section: 'noticias',
      category: 'Test',
      excerpt: 'This is a test article',
      body: 'This is the body of the test article',
      author: 'Test Author',
      readtime: '1 min',
      cover: null,
      pinned: false,
      score: null,
      date: new Date().toISOString(),
      createdAt: serverTimestamp()
    };

    console.log('📝 Creating test article:', testArticle);

    const docRef = await addDoc(collection(db, 'articles'), testArticle);

    console.log('✅ Test article created with ID:', docRef.id);

    return NextResponse.json({
      success: true,
      message: 'Test article created successfully',
      articleId: docRef.id,
      article: testArticle
    });
  } catch (error) {
    console.error('❌ Debug error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}