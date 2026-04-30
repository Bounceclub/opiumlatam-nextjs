'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, or, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Article } from '@/types';
import { X, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getSectionLabel } from '@/lib/utils';

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const articlesRef = collection(db, 'articles');
        const snapshot = await getDocs(articlesRef);
        const allArticles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Article[];

        const filtered = allArticles.filter(
          (article) =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.excerpt?.toLowerCase().includes(query.toLowerCase()) ||
            article.body?.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered.slice(0, 10));
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[var(--bg)] z-[400] flex items-start justify-center pt-20 sm:pt-24 px-4 sm:px-6">
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-3 border-b-2 border-[var(--head)] pb-4">
          <Search size={20} className="text-[var(--text3)]" />
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-lg sm:text-xl text-[var(--text)] placeholder:text-[var(--text3)] font-dm-sans"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-2 text-[var(--text2)] hover:text-[var(--head)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 p-4 bg-[var(--bg2)] rounded-lg animate-pulse">
                  <div className="w-20 h-20 bg-[var(--bg3)] rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-[var(--bg3)] rounded w-3/4" />
                    <div className="h-3 bg-[var(--bg3)] rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : query.length < 2 ? (
            <p className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text3)] text-center py-8">
              Escribe al menos 2 caracteres para buscar
            </p>
          ) : results.length === 0 ? (
            <p className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text3)] text-center py-8">
              No se encontraron resultados para "{query}"
            </p>
          ) : (
            <div className="space-y-3">
              {results.map((article) => (
                <Link
                  key={article.id}
                  href={`/articulo/${article.id}`}
                  onClick={onClose}
                  className="flex gap-4 p-4 bg-[var(--bg2)] rounded-lg hover:bg-[var(--bg3)] transition-colors group"
                >
                  {article.cover && (
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded bg-[var(--bg3)]">
                      <Image
                        src={article.cover}
                        alt={article.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--acc)] mb-1">
                      {article.category || getSectionLabel(article.section)}
                    </div>
                    <h3 className="font-anton text-base sm:text-lg leading-[1.1] text-[var(--head)] tracking-[0.01em] uppercase mb-2 line-clamp-2 group-hover:text-[var(--acc)] transition-colors">
                      {article.title}
                    </h3>
                    <p className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)]">
                      {new Date(article.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
