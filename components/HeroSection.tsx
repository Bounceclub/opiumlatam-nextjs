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
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-0 border-b-2 border-[var(--head)] mt-3">
        <div className="relative overflow-hidden cursor-pointer border-r-2 border-[var(--head)]">
          <div className="h-[560px] bg-[var(--bg3)] animate-pulse" />
        </div>
        <div className="flex flex-col bg-[var(--bg)] border-l-2 border-[var(--head)]">
          <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] p-3 border-b border-[var(--border)]">
            Cargando...
          </div>
          <div className="flex-1 p-3 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-[var(--bg2)] animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-0 border-b-2 border-[var(--head)] mt-3">
        <div className="relative overflow-hidden cursor-pointer border-r-2 border-[var(--head)]">
          <div className="h-[560px] bg-[var(--bg3)] flex items-center justify-center">
            <div className="text-5xl opacity-8">◈</div>
          </div>
        </div>
        <div className="flex flex-col bg-[var(--bg)] border-l-2 border-[var(--head)]">
          <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] p-3 border-b border-[var(--border)]">
            Próximamente...
          </div>
          <div className="flex-1 p-3">
            <p className="font-source-serif text-sm italic text-[var(--text3)]">
              No hay artículos destacados por el momento.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const sectionLabel = article.category || getSectionLabel(article.section);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-0 border-b-2 border-[var(--head)] mt-3">
      {/* Main Hero */}
      <Link
        href={`/articulo/${article.id}`}
        className="relative overflow-hidden cursor-pointer border-r-2 border-[var(--head)] group"
      >
        <div className="h-[560px] overflow-hidden bg-[var(--bg3)]">
          {article.cover ? (
            <Image
              src={article.cover}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl opacity-8 bg-[var(--bg3)]">
              ◈
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/0.92 via-black/0.45 to-black/0.1" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <span className="inline-block bg-white text-black font-barlow-condensed text-xs font-bold tracking-widest uppercase px-3 py-1 mb-3">
            ★ Destacado · {sectionLabel}
          </span>
          <h1 className="font-anton text-4xl lg:text-[3.8rem] leading-[0.95] text-white text-shadow-[0_2px_24px_rgba(0,0,0,0.7)] mb-2 tracking-[0.01em] uppercase">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="font-source-serif text-sm italic text-white/70 mb-2 leading-[1.5]">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center gap-3 mt-3 font-barlow-condensed text-xs font-bold tracking-widest uppercase text-white/50">
            <strong className="text-white/90">{article.author || 'Redacción'}</strong>
            <span>·</span>
            <span>{formatDate(article.date)}</span>
          </div>
        </div>
      </Link>

      {/* Side Hero */}
      <div className="flex flex-col bg-[var(--bg)] border-l-2 border-[var(--head)]">
        <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] p-3 border-b border-[var(--border)]">
          Más recientes
        </div>
        <div className="flex-1">
          <p className="font-source-serif text-sm italic text-[var(--text3)] p-3">
            Cargando artículos...
          </p>
        </div>
      </div>
    </div>
  );
}
