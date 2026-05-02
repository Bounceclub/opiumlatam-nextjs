import { NextResponse } from 'next/server';
import { useArticles, usePinnedArticle } from '@/lib/hooks';

export async function GET() {
  try {
    console.log('🔍 Testing mock data...');

    // Test useArticles hook
    console.log('📝 Test 1: Testing useArticles hook');
    const { articles: allArticles, loading: allLoading } = useArticles();
    console.log(`✅ useArticles: ${allArticles.length} articles, loading: ${allLoading}`);

    // Test useArticles with section
    console.log('📰 Test 2: Testing useArticles with section "noticias"');
    const { articles: noticiasArticles, loading: noticiasLoading } = useArticles('noticias');
    console.log(`✅ useArticles('noticias'): ${noticiasArticles.length} articles, loading: ${noticiasLoading}`);

    // Test usePinnedArticle hook
    console.log('📌 Test 3: Testing usePinnedArticle hook');
    const { article: pinnedArticle, loading: pinnedLoading } = usePinnedArticle();
    console.log(`✅ usePinnedArticle: ${pinnedArticle ? 'Found pinned article' : 'No pinned article'}, loading: ${pinnedLoading}`);

    return NextResponse.json({
      success: true,
      results: {
        allArticles: {
          count: allArticles.length,
          loading: allLoading,
          articles: allArticles.map(a => ({ id: a.id, title: a.title, section: a.section }))
        },
        noticiasArticles: {
          count: noticiasArticles.length,
          loading: noticiasLoading,
          articles: noticiasArticles.map(a => ({ id: a.id, title: a.title, section: a.section }))
        },
        pinnedArticle: {
          found: !!pinnedArticle,
          loading: pinnedLoading,
          article: pinnedArticle ? { id: pinnedArticle.id, title: pinnedArticle.title } : null
        }
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