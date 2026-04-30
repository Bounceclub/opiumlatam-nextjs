'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatDate, getSectionLabel } from '@/lib/utils';
import { Article } from '@/types';

interface ArticleCardFeaturedProps {
  article: Article;
}

export default function ArticleCardFeatured({ article }: ArticleCardFeaturedProps) {
  const sectionLabel = article.category || getSectionLabel(article.section);

  return (
    <Link
      href={`/articulo/${article.id}`}
      className="group cursor-pointer grid grid-cols-2 gap-4 pb-5 border-b border-[var(--border)] last:border-0 last:pb-0 last:mb-0 mb-5"
    >
      <div className="overflow-hidden bg-[var(--bg3)] aspect-[4/3]">
        {article.cover ? (
          <Image
            src={article.cover}
            alt={article.title}
            width={640}
            height={480}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-10 bg-[var(--bg3)]">
            ◈
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--acc)]">
          {sectionLabel}
        </div>
        <h3 className="font-anton text-2xl leading-[1.05] text-[var(--head)] tracking-[0.01em] uppercase transition-colors group-hover:text-[var(--acc)]">
          {article.title}
        </h3>
        <p className="text-sm text-[var(--text2)] leading-[1.5] line-clamp-3">
          {article.excerpt}
        </p>
        <div className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] mt-1">
          {formatDate(article.date)}
          {article.readtime && (
            <>
              <span className="mx-1">·</span>
              <span>{article.readtime}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
