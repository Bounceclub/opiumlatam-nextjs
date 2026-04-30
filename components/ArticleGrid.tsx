import { Article } from '@/types';
import ArticleCard from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  columns?: 2 | 3 | 4;
}

export default function ArticleGrid({ articles, columns = 3 }: ArticleGridProps) {
  if (!articles.length) {
    return (
      <div className="border-2 border-dashed border-[var(--border)] py-14 px-6 text-center flex flex-col items-center gap-2">
        <div className="text-5xl opacity-12">◈</div>
        <div className="font-source-serif text-base italic text-[var(--text3)]">
          Aún no hay artículos
        </div>
        <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--border2)]">
          Próximamente
        </div>
      </div>
    );
  }

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[columns];

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
