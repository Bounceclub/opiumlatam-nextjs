'use client';

import { useArticles, usePinnedArticle } from '@/lib/hooks';
import HeroSection from '@/components/HeroSection';
import ArticleGrid from '@/components/ArticleGrid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSectionLabel } from '@/lib/utils';

export default function HomePage() {
  const { article: pinnedArticle, loading: pinnedLoading } = usePinnedArticle();
  const { articles: noticias, loading: noticiasLoading } = useArticles('noticias');
  const { articles: discusion, loading: discusionLoading } = useArticles('discusion');
  const { articles: resenas, loading: resenasLoading } = useArticles('resenas');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection article={pinnedArticle} loading={pinnedLoading} />

        {/* Sections */}
        <div className="max-w-[1380px] mx-auto px-6 py-8">
          {/* Noticias Section */}
          <section className="py-6 border-b border-[var(--border)] last:border-0">
            <div className="flex items-center gap-4 mb-5">
              <h2 className="font-barlow-condensed text-lg font-bold tracking-widest uppercase text-[var(--head)] border-l-4 border-[var(--acc)] pl-3 flex-shrink-0">
                Noticias
              </h2>
              <div className="flex-1 h-px bg-[var(--border)]" />
              <span className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] cursor-pointer hover:text-[var(--acc)] transition-colors flex-shrink-0">
                Ver todo →
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
              <div className="space-y-6">
                {noticias.slice(0, 3).map((article) => (
                  <div key={article.id} className="border-b border-[var(--border)] pb-6 last:border-0 last:pb-0">
                    {/* Featured card for each article */}
                    <div className="group cursor-pointer">
                      <div className="overflow-hidden bg-[var(--bg3)] aspect-[4/3] mb-3">
                        {article.cover ? (
                          <img
                            src={article.cover}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-5xl opacity-10 bg-[var(--bg3)]">
                            ◈
                          </div>
                        )}
                      </div>
                      <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--acc)] mb-2">
                        {article.category || getSectionLabel(article.section)}
                      </div>
                      <h3 className="font-anton text-xl leading-[1.05] text-[var(--head)] tracking-[0.01em] uppercase mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-[var(--text2)] leading-[1.5] line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] mt-2">
                        {new Date(article.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                        {article.readtime && (
                          <>
                            <span className="mx-1">·</span>
                            <span>{article.readtime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] border-b border-[var(--border)] pb-2 mb-3">
                  Más noticias
                </div>
                {noticias.slice(3, 9).map((article) => (
                  <div key={article.id} className="group cursor-pointer flex gap-3 py-3 border-b border-[var(--border)] last:border-0 last:pb-0">
                    {article.cover ? (
                      <img
                        src={article.cover}
                        alt={article.title}
                        className="w-[76px] h-[58px] flex-shrink-0 object-cover bg-[var(--bg3)]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-[76px] h-[58px] flex-shrink-0 flex items-center justify-center text-xl opacity-12 bg-[var(--bg3)]">
                        ◈
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--acc)] mb-1">
                        {article.category || getSectionLabel(article.section)}
                      </div>
                      <h4 className="font-source-serif text-sm font-semibold leading-[1.2] text-[var(--head)] line-clamp-3 transition-colors group-hover:text-[var(--acc)]">
                        {article.title}
                      </h4>
                      <div className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] mt-1">
                        {new Date(article.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Discusión Section */}
          <section className="py-6 border-b border-[var(--border)] last:border-0">
            <div className="flex items-center gap-4 mb-5">
              <h2 className="font-barlow-condensed text-lg font-bold tracking-widest uppercase text-[var(--head)] border-l-4 border-[var(--acc)] pl-3 flex-shrink-0">
                Discusión
              </h2>
              <div className="flex-1 h-px bg-[var(--border)]" />
              <span className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] cursor-pointer hover:text-[var(--acc)] transition-colors flex-shrink-0">
                Ver todo →
              </span>
            </div>
            <ArticleGrid articles={discusion} columns={3} />
          </section>

          {/* Reseñas Section */}
          <section className="py-6 border-b border-[var(--border)] last:border-0">
            <div className="flex items-center gap-4 mb-5">
              <h2 className="font-barlow-condensed text-lg font-bold tracking-widest uppercase text-[var(--head)] border-l-4 border-[var(--acc)] pl-3 flex-shrink-0">
                Reseñas
              </h2>
              <div className="flex-1 h-px bg-[var(--border)]" />
              <span className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] cursor-pointer hover:text-[var(--acc)] transition-colors flex-shrink-0">
                Ver todo →
              </span>
            </div>
            <ArticleGrid articles={resenas} columns={4} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
