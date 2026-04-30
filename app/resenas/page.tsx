'use client';

import { useArticles } from '@/lib/hooks';
import ArticleGrid from '@/components/ArticleGrid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ResenasPage() {
  const { articles, loading } = useArticles('resenas');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="max-w-[1380px] mx-auto px-6 py-14 border-b border-[var(--border)]">
          <span className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] block mb-2">
            OpiumLATAM
          </span>
          <h1 className="font-anton text-4xl lg:text-[7rem] leading-[0.9] text-[var(--text)] tracking-[0.01em] uppercase mb-2">
            Reseñas
          </h1>
          <p className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] mt-4">
            {articles.length} artículo{articles.length !== 1 ? 's' : ''}
          </p>
        </section>

        <div className="max-w-[1380px] mx-auto px-6 py-10 pb-16">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-[var(--bg2)] border border-[var(--border)] h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <ArticleGrid articles={articles} columns={4} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
