import { NextResponse } from 'next/server';
import { Article } from '@/types';

// Datos de prueba mientras se soluciona el problema de conexión a Firebase
const MOCK_ARTICLES: Article[] = [
  {
    id: 'mock-1',
    title: 'Playboi Carti saca el videoclip de CRUSH junto a Travis Scott',
    excerpt: 'El rapero de Atlanta estrena su nuevo video con una colaboración inesperada.',
    body: 'Playboi Carti ha lanzado el videoclip de su tema "CRUSH" featuring Travis Scott. El video ha causado sensación en las redes sociales por su estética visual única y la química entre ambos artistas.',
    author: 'Redacción',
    section: 'noticias',
    category: 'Hip Hop',
    date: '2026-03-15T22:28:21.878Z',
    pinned: true,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop',
    readtime: '3 min lectura'
  },
  {
    id: 'mock-2',
    title: 'Apollored1 obtuvo un contrato por la discográfica Interscope',
    excerpt: 'El artista emergente firma con una de las discográficas más importantes del mundo.',
    body: 'Apollored1 ha firmado un contrato discográfico con Interscope Records, una de las discográficas más influyentes de la industria musical. Este acuerdo marca un hito importante en su carrera.',
    author: 'Redacción',
    section: 'noticias',
    category: 'Música',
    date: '2026-03-17T23:44:20.804Z',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=450&fit=crop',
    readtime: '2 min lectura'
  },
  {
    id: 'mock-3',
    title: 'Nuevos vinilos de MUSIC - SORRY 4 DA WAIT',
    excerpt: 'Lanzamiento exclusivo en formato vinilo del último álbum de MUSIC.',
    body: 'MUSIC anuncia el lanzamiento de su último álbum "SORRY 4 DA WAIT" en formato vinilo. Esta edición especial incluye material exclusivo y artwork original.',
    author: 'Redacción',
    section: 'noticias',
    category: 'Vinilos',
    date: '2026-03-15T17:06:05.330Z',
    cover: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=450&fit=crop',
    readtime: '2 min lectura'
  }
];

export async function GET() {
  try {
    console.log('🔍 Testing mock data...');

    // Test 1: Get all articles
    console.log('📝 Test 1: Get all articles');
    const allArticles = MOCK_ARTICLES;
    console.log(`✅ Found ${allArticles.length} articles`);

    // Test 2: Get noticias
    console.log('📰 Test 2: Get noticias');
    const noticiasArticles = MOCK_ARTICLES.filter(article => article.section === 'noticias');
    console.log(`✅ Found ${noticiasArticles.length} noticias`);

    // Test 3: Get pinned
    console.log('📌 Test 3: Get pinned');
    const pinnedArticle = MOCK_ARTICLES.find(article => article.pinned);
    console.log(`✅ Found ${pinnedArticle ? 'pinned article' : 'no pinned article'}`);

    return NextResponse.json({
      success: true,
      results: {
        total: allArticles.length,
        noticias: noticiasArticles.length,
        pinned: !!pinnedArticle
      },
      articles: {
        all: allArticles.map(a => ({ id: a.id, title: a.title, section: a.section, pinned: a.pinned })),
        noticias: noticiasArticles.map(a => ({ id: a.id, title: a.title, section: a.section })),
        pinned: pinnedArticle ? { id: pinnedArticle.id, title: pinnedArticle.title } : null
      },
      message: 'Mock data test completed'
    });

  } catch (error) {
    console.error('❌ Test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: String(error)
    }, { status: 500 });
  }
}