'use client';

import { useArticles, usePinnedArticle } from '@/lib/hooks';
import HeroSection from '@/components/HeroSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSectionLabel } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Noticias Section */}
          <section className="py-4 sm:py-6 border-b border-[var(--border)] last:border-0">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
              <h2 className="font-barlow-condensed text-base sm:text-lg font-bold tracking-widest uppercase text-[var(--head)] border-l-4 border-[var(--acc)] pl-3 flex-shrink-0">
                Noticias
              </h2>
              <div className="flex-1 h-px bg-[var(--border)] hidden sm:block" />
              <Link
                href="/noticias"
                className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] hover:text-[var(--acc)] transition-colors flex items-center gap-1 flex-shrink-0"
              >
                Ver todo <ArrowRight size={12} />
              </Link>
            </div>

            {noticiasLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-[var(--bg2)] border border-[var(--border)] h-64 sm:h-80 animate-pulse" />
                ))}
              </div>
            ) : noticias.length === 0 ? (
              <p className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] text-center py-8">
                No hay noticias publicadas
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {noticias.slice(0, 6).map((article) => (
                  <Link
                    key={article.id}
                    href={`/articulo/${article.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="overflow-hidden bg-[var(--bg3)] aspect-[4/3] sm:aspect-[16/10] mb-3">
                      {article.cover ? (
                        <img
                          src={article.cover}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl opacity-10 bg-[var(--bg3)]">
                          ◈
                        </div>
                      )}
                    </div>
                    <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--acc)] mb-2">
                      {article.category || getSectionLabel(article.section)}
                    </div>
                    <h3 className="font-anton text-lg sm:text-xl leading-[1.05] text-[var(--head)] tracking-[0.01em] uppercase mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text2)] leading-[1.5] line-clamp-2 hidden sm:block">
                      {article.excerpt}
                    </p>
                    <div className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] mt-2">
                      {new Date(article.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Discusión Section */}
          <section className="py-4 sm:py-6 border-b border-[var(--border)] last:border-0">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
              <h2 className="font-barlow-condensed text-base sm:text-lg font-bold tracking-widest uppercase text-[var(--head)] border-l-4 border-[var(--acc)] pl-3 flex-shrink-0">
                Discusión
              </h2>
              <div className="flex-1 h-px bg-[var(--border)] hidden sm:block" />
              <Link
                href="/discusion"
                className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] hover:text-[var(--acc)] transition-colors flex items-center gap-1 flex-shrink-0"
              >
                Ver todo <ArrowRight size={12} />
              </Link>
            </div>

            {discusionLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-[var(--bg2)] border border-[var(--border)] h-64 sm:h-80 animate-pulse" />
                ))}
              </div>
            ) : discusion.length === 0 ? (
              <p className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] text-center py-8">
                No hay artículos de discusión
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {discusion.slice(0, 3).map((article) => (
                  <Link
                    key={article.id}
                    href={`/articulo/${article.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="overflow-hidden bg-[var(--bg3)] aspect-[4/3] sm:aspect-[16/10] mb-3">
                      {article.cover ? (
                        <img
                          src={article.cover}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl opacity-10 bg-[var(--bg3)]">
                          ◈
                        </div>
                      )}
                    </div>
                    <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--acc)] mb-2">
                      {article.category || getSectionLabel(article.section)}
                    </div>
                    <h3 className="font-anton text-lg sm:text-xl leading-[1.05] text-[var(--head)] tracking-[0.01em] uppercase mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] mt-2">
                      {new Date(article.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Reseñas Section */}
          <section className="py-4 sm:py-6 border-b border-[var(--border)] last:border-0">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
              <h2 className="font-barlow-condensed text-base sm:text-lg font-bold tracking-widest uppercase text-[var(--head)] border-l-4 border-[var(--acc)] pl-3 flex-shrink-0">
                Reseñas
              </h2>
              <div className="flex-1 h-px bg-[var(--border)] hidden sm:block" />
              <Link
                href="/resenas"
                className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] hover:text-[var(--acc)] transition-colors flex items-center gap-1 flex-shrink-0"
              >
                Ver todo <ArrowRight size={12} />
              </Link>
            </div>

            {resenasLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-[var(--bg2)] border border-[var(--border)] h-64 sm:h-80 animate-pulse" />
                ))}
              </div>
            ) : resenas.length === 0 ? (
              <p className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] text-center py-8">
                No hay reseñas publicadas
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {resenas.slice(0, 4).map((article) => (
                  <Link
                    key={article.id}
                    href={`/articulo/${article.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="overflow-hidden bg-[var(--bg3)] aspect-[4/3] sm:aspect-[16/10] mb-3">
                      {article.cover ? (
                        <img
                          src={article.cover}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl opacity-10 bg-[var(--bg3)]">
                          ◈
                        </div>
                      )}
                    </div>
                    <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--acc)] mb-2">
                      {article.category || getSectionLabel(article.section)}
                    </div>
                    <h3 className="font-anton text-base sm:text-lg leading-[1.05] text-[var(--head)] tracking-[0.01em] uppercase mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    {article.score && (
                      <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--head)] mt-1">
                        {article.score}/10
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
