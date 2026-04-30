'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatDate, getSectionLabel } from '@/lib/utils';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const sectionLabel = article.category || getSectionLabel(article.section);

  return (
    <Link
      href={`/articulo/${article.id}`}
      className="group cursor-pointer bg-[var(--bg2)] border border-[var(--border)] flex flex-col transition-all hover:translate-y-[-2px] hover:shadow-[0_6px_24px_var(--sh)]"
    >
      <div className="overflow-hidden aspect-video bg-[var(--bg3)] mb-3">
        {article.cover ? (
          <Image
            src={article.cover}
            alt={article.title}
            width={640}
            height={360}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-10 bg-[var(--bg3)]">
            ◈
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--acc)] mb-2">
          {sectionLabel}
        </div>
        <h3 className="font-source-serif text-lg font-semibold leading-[1.15] text-[var(--head)] mb-2 flex-1">
          {article.title}
        </h3>
        <p className="text-sm text-[var(--text2)] leading-[1.5] line-clamp-2">
          {article.excerpt}
        </p>
        <div className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] mt-3">
          {formatDate(article.date)}
          {article.readtime && (
            <>
              <span className="mx-1 opacity-35">·</span>
              <span>{article.readtime}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
