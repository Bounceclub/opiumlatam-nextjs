'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatDate, getSectionLabel } from '@/lib/utils';
import { Article } from '@/types';

interface ArticleCardMiniProps {
  article: Article;
}

export default function ArticleCardMini({ article }: ArticleCardMiniProps) {
  const sectionLabel = article.category || getSectionLabel(article.section);

  return (
    <Link
      href={`/articulo/${article.id}`}
      className="group cursor-pointer flex gap-3 py-3 border-b border-[var(--border)] first:pt-0 last:border-0 last:pb-0"
    >
      {article.cover ? (
        <Image
          src={article.cover}
          alt={article.title}
          width={88}
          height={66}
          className="w-[88px] h-[66px] flex-shrink-0 object-cover bg-[var(--bg3)]"
          loading="lazy"
        />
      ) : (
        <div className="w-[88px] h-[66px] flex-shrink-0 flex items-center justify-center text-2xl opacity-15 bg-[var(--bg3)]">
          ◈
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--acc)] mb-1">
          {sectionLabel}
        </div>
        <h3 className="font-source-serif text-sm font-semibold leading-[1.2] text-[var(--head)] line-clamp-2 transition-colors group-hover:text-[var(--acc)]">
          {article.title}
        </h3>
        <div className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] mt-1">
          {formatDate(article.date)}
        </div>
      </div>
    </Link>
  );
}
