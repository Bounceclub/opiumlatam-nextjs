import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, where, getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { Article } from '@/types';

export function useArticles(section?: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let q = query(collection(db, 'articles'), orderBy('date', 'desc'));

    if (section) {
      q = query(collection(db, 'articles'), where('section', '==', section), orderBy('date', 'desc'));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const articlesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Article[];
        setArticles(articlesData);
        setLoading(false);
      },
      (err) => {
        // Silently handle errors to avoid console spam
        console.debug('Error fetching articles:', err.message);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => {
      try {
        unsubscribe();
      } catch (e) {
        // Ignore cleanup errors
      }
    };
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

    getDoc(doc(db, 'articles', id))
      .then((docSnap) => {
        if (docSnap.exists()) {
          setArticle({ id: docSnap.id, ...docSnap.data() } as Article);
        } else {
          setError('Artículo no encontrado');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.debug('Error fetching article:', err.message);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return { article, loading, error };
}

export function usePinnedArticle() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'articles'), where('pinned', '==', true), orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          setArticle({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Article);
        }
        setLoading(false);
      },
      (err) => {
        console.debug('Error fetching pinned article:', err.message);
        setLoading(false);
      }
    );

    return () => {
      try {
        unsubscribe();
      } catch (e) {
        // Ignore cleanup errors
      }
    };
  }, []);

  return { article, loading };
}
