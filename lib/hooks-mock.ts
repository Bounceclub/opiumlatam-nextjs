import { useState, useEffect } from 'react';
import { Article } from '@/types';

// Datos de prueba mientras se soluciona el problema de conexión a Firebase
const MOCK_ARTICLES: Article[] = [
  {
    id: 'mock-1',
    title: 'Playboi Carti saca el videoclip de CRUSH junto a Travis Scott',
    excerpt: 'El rapero de Atlanta estrena su nuevo video con una colaboración inesperada.',
    body: 'Playboi Carti ha lanzado el videoclip de su tema "CRUSH" featuring Travis Scott. El video ha causado sensación en las redes sociales por su estética visual única y la química entre ambos artistas.',
    author: 'Redacción',
    section: 'noticias',
    category: 'Hip Hop',
    date: '2026-03-15T22:28:21.878Z',
    pinned: true,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop',
    readtime: '3 min lectura'
  },
  {
    id: 'mock-2',
    title: 'Apollored1 obtuvo un contrato por la discográfica Interscope',
    excerpt: 'El artista emergente firma con una de las discográficas más importantes del mundo.',
    body: 'Apollored1 ha firmado un contrato discográfico con Interscope Records, una de las discográficas más influyentes de la industria musical. Este acuerdo marca un hito importante en su carrera.',
    author: 'Redacción',
    section: 'noticias',
    category: 'Música',
    date: '2026-03-17T23:44:20.804Z',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=450&fit=crop',
    readtime: '2 min lectura'
  },
  {
    id: 'mock-3',
    title: 'Nuevos vinilos de MUSIC - SORRY 4 DA WAIT',
    excerpt: 'Lanzamiento exclusivo en formato vinilo del último álbum de MUSIC.',
    body: 'MUSIC anuncia el lanzamiento de su último álbum "SORRY 4 DA WAIT" en formato vinilo. Esta edición especial incluye material exclusivo y artwork original.',
    author: 'Redacción',
    section: 'noticias',
    category: 'Vinilos',
    date: '2026-03-15T17:06:05.330Z',
    cover: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=450&fit=crop',
    readtime: '2 min lectura'
  }
];

export function useArticles(section?: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Filtrar por sección si se proporciona
    const filteredArticles = section
      ? MOCK_ARTICLES.filter(article => article.section === section)
      : MOCK_ARTICLES;

    // Simular carga asíncrona
    setTimeout(() => {
      setArticles(filteredArticles);
      setLoading(false);
    }, 500);

  }, [section]);

  return { articles, loading, error };
}

export function useArticle(id: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Buscar artículo por ID
    const foundArticle = MOCK_ARTICLES.find(article => article.id === id);

    // Simular carga asíncrona
    setTimeout(() => {
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        setError('Artículo no encontrado');
      }
      setLoading(false);
    }, 300);

  }, [id]);

  return { article, loading, error };
}

export function usePinnedArticle() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Buscar artículo destacado
    const pinnedArticle = MOCK_ARTICLES.find(article => article.pinned);

    // Simular carga asíncrona
    setTimeout(() => {
      setArticle(pinnedArticle || null);
      setLoading(false);
    }, 300);

  }, []);

  return { article, loading };
}