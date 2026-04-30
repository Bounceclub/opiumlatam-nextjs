import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateArticleMetadata, generateArticleSchema } from '@/lib/seo';
import { Article } from '@/types';
import ArticleContent from './ArticleContent';

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const articleDoc = await getDoc(doc(db, 'articles', id));

  if (!articleDoc.exists()) {
    return {
      title: 'Artículo no encontrado | OpiumLATAM',
    };
  }

  const article = { id, ...articleDoc.data() } as Article;
  const url = `https://opiumlatam.com/articulo/${id}`;

  return generateArticleMetadata(article, url);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const articleDoc = await getDoc(doc(db, 'articles', id));

  if (!articleDoc.exists()) {
    notFound();
  }

  const article = { id, ...articleDoc.data() } as Article;
  const url = `https://opiumlatam.com/articulo/${id}`;
  const schema = generateArticleSchema(article, url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ArticleContent articleId={id} />
    </>
  );
}
