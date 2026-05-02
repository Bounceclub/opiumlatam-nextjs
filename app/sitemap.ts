import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://opiumlatam.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/discusion`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resenas`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/eventos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Dynamic articles
  try {
    const response = await fetch(`${baseUrl}/api/articles`, {
      cache: 'no-store',
    });
    const data = await response.json();

    if (data.success && data.articles) {
      const articlePages: MetadataRoute.Sitemap = data.articles.map((article: any) => ({
        url: `${baseUrl}/articulo/${article.id}`,
        lastModified: new Date(article.date || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));

      return [...staticPages, ...articlePages];
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  return staticPages;
}
