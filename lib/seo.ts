import { Metadata } from 'next';
import { Article } from '@/types';

export function generateArticleMetadata(article: Article, url: string): Metadata {
  const title = `${article.title} | OpiumLATAM`;
  const description = article.excerpt || `Noticias de Hip-Hop en español - ${article.title}`;
  const imageUrl = article.cover || 'https://opiumlatam.com/1500x500.jpg';

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      siteName: 'OpiumLATAM',
      publishedTime: article.date,
      authors: [article.author || 'Redacción'],
      section: article.section,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@OpiumLATAM__',
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateArticleSchema(article: Article, url: string) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': article.section === 'resenas' ? 'ReviewNewsArticle' : 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.cover ? [article.cover] : undefined,
    author: {
      '@type': 'Person',
      name: article.author || 'Redacción',
    },
    publisher: {
      '@type': 'Organization',
      name: 'OpiumLATAM',
      logo: {
        '@type': 'ImageObject',
        url: 'https://opiumlatam.com/Logo.png',
      },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  if (article.section === 'resenas' && article.score) {
    (schema as any).reviewRating = {
      '@type': 'Rating',
      ratingValue: article.score,
      bestRating: '10',
      worstRating: '1',
    };
  }

  return schema;
}
