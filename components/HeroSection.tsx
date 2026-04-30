'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatDate, getSectionLabel } from '@/lib/utils';
import { Article } from '@/types';

interface HeroSectionProps {
  article: Article | null;
  loading?: boolean;
}

export default function HeroSection({ article, loading = false }: HeroSectionProps) {
  if (loading) {
    return (
      <div className="border-b-2 border-[var(--head)] mt-3">
        <div className="relative overflow-hidden cursor-pointer">
          <div className="h-[400px] sm:h-[500px] lg:h-[560px] bg-[var(--bg3)] animate-pulse" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="border-b-2 border-[var(--head)] mt-3">
        <div className="relative overflow-hidden cursor-pointer">
          <div className="h-[400px] sm:h-[500px] lg:h-[560px] bg-[var(--bg3)] flex items-center justify-center">
            <div className="text-4xl sm:text-5xl opacity-8">◈</div>
          </div>
        </div>
      </div>
    );
  }

  const sectionLabel = article.category || getSectionLabel(article.section);

  return (
    <div className="border-b-2 border-[var(--head)] mt-3">
      <Link
        href={`/articulo/${article.id}`}
        className="relative overflow-hidden cursor-pointer block group"
      >
        <div className="h-[400px] sm:h-[500px] lg:h-[560px] overflow-hidden bg-[var(--bg3)]">
          {article.cover ? (
            <Image
              src={article.cover}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl sm:text-8xl opacity-8 bg-[var(--bg3)]">
              ◈
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/0.92 via-black/0.45 to-black/0.1" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
          <span className="inline-block bg-white text-black font-barlow-condensed text-xs font-bold tracking-widest uppercase px-2 sm:px-3 py-1 mb-2 sm:mb-3">
            ★ Destacado · {sectionLabel}
          </span>
          <h1 className="font-anton text-2xl sm:text-3xl lg:text-[3.8rem] leading-[0.95] text-white text-shadow-[0_2px_24px_rgba(0,0,0,0.7)] mb-2 tracking-[0.01em] uppercase">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="font-source-serif text-xs sm:text-sm italic text-white/70 mb-2 leading-[1.5] line-clamp-2 sm:line-clamp-none">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3 font-barlow-condensed text-xs font-bold tracking-widest uppercase text-white/50">
            <strong className="text-white/90">{article.author || 'Redacción'}</strong>
            <span>·</span>
            <span>{formatDate(article.date)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
