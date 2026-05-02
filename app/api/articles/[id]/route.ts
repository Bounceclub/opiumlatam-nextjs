import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Article } from '@/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log('🔍 Fetching article with Firebase Client SDK...');
    console.log(`📝 Article ID: ${id}`);

    const docRef = doc(db, 'articles', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({
        success: false,
        error: 'Artículo no encontrado'
      }, { status: 404 });
    }

    const article = {
      id: docSnap.id,
      ...docSnap.data()
    } as Article;

    console.log(`✅ Found article: ${article.title}`);

    return NextResponse.json({
      success: true,
      article: article
    });

  } catch (error) {
    console.error('❌ Error fetching article:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: String(error)
    }, { status: 500 });
  }
}
