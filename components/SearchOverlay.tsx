'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Article } from '@/types';
import { X, Search, Clock, TrendingUp, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getSectionLabel } from '@/lib/utils';

interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load search history from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('searchHistory');
        if (saved) {
          const history = JSON.parse(saved);
          setSearchHistory(history.slice(0, 5)); // Keep only last 5 searches
        }
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    }
  }, []);

  // Save search to history
  const saveToHistory = useCallback((searchQuery: string) => {
    if (searchQuery.length < 2) return;

    setSearchHistory((prev) => {
      const newHistory = [
        { query: searchQuery, timestamp: Date.now() },
        ...prev.filter((item) => item.query.toLowerCase() !== searchQuery.toLowerCase()),
      ].slice(0, 5);

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        } catch (error) {
          console.error('Error saving search history:', error);
        }
      }

      return newHistory;
    });
  }, []);

  // Improved search with fuzzy matching
  const searchArticles = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const articlesRef = collection(db, 'articles');
      const snapshot = await getDocs(articlesRef);
      const allArticles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Article[];

      const searchLower = searchQuery.toLowerCase();
      const searchWords = searchLower.split(' ').filter((word) => word.length > 0);

      const scored = allArticles.map((article) => {
        let score = 0;
        const titleLower = article.title.toLowerCase();
        const excerptLower = (article.excerpt || '').toLowerCase();
        const bodyLower = (article.body || '').toLowerCase();

        // Exact title match gets highest score
        if (titleLower === searchLower) score += 100;
        // Title starts with query
        else if (titleLower.startsWith(searchLower)) score += 80;
        // Title contains query
        else if (titleLower.includes(searchLower)) score += 60;

        // Check each word in query
        searchWords.forEach((word) => {
          if (titleLower.includes(word)) score += 30;
          if (excerptLower.includes(word)) score += 15;
          if (bodyLower.includes(word)) score += 5;
        });

        // Bonus for recent articles
        const daysSincePublish = (Date.now() - new Date(article.date).getTime()) / (1000 * 60 * 60 * 24);
        if (daysSincePublish < 7) score += 10;
        else if (daysSincePublish < 30) score += 5;

        return { article, score };
      });

      const filtered = scored
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map((item) => item.article);

      setResults(filtered);
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(-1);
      return;
    }

    const searchTimeout = setTimeout(() => {
      searchArticles(query);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query, isOpen, searchArticles]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const maxIndex = results.length - 1;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            window.location.href = `/articulo/${results[selectedIndex].id}`;
          } else if (query.length >= 2) {
            saveToHistory(query);
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, saveToHistory, query]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.length >= 2) {
      saveToHistory(searchQuery);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('searchHistory');
      } catch (error) {
        console.error('Error clearing search history:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[var(--bg)] z-[400] flex items-start justify-center pt-20 sm:pt-24 px-4 sm:px-6">
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-3 border-b-2 border-[var(--head)] pb-4">
          <Search size={20} className="text-[var(--text3)]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar artículos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.length >= 2) {
                saveToHistory(query);
              }
            }}
            className="flex-1 bg-transparent border-none outline-none text-lg sm:text-xl text-[var(--text)] placeholder:text-[var(--text3)] font-dm-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-2 text-[var(--text2)] hover:text-[var(--head)] transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-[var(--text2)] hover:text-[var(--head)] transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        <div ref={resultsRef} className="mt-6 max-h-[60vh] overflow-y-auto">
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
            <div className="space-y-6">
              {/* Search History */}
              {searchHistory.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={16} className="text-[var(--text3)]" />
                      <h3 className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text3)]">
                        Búsquedas recientes
                      </h3>
                    </div>
                    <button
                      onClick={clearHistory}
                      className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] hover:text-[var(--acc)] transition-colors"
                    >
                      Limpiar
                    </button>
                  </div>
                  <div className="space-y-2">
                    {searchHistory.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(item.query)}
                        className="w-full text-left p-3 bg-[var(--bg2)] rounded-lg hover:bg-[var(--bg3)] transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Search size={14} className="text-[var(--text3)]" />
                          <span className="font-dm-sans text-sm text-[var(--text)] group-hover:text-[var(--acc)] transition-colors">
                            {item.query}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Search Tips */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={16} className="text-[var(--text3)]" />
                  <h3 className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text3)]">
                    Sugerencias
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['hip hop', 'trap', 'reggaeton', 'nuevo album', 'concierto', 'entrevista'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSearch(suggestion)}
                      className="px-3 py-1.5 bg-[var(--bg2)] rounded-full text-xs font-barlow-condensed font-semibold tracking-widest uppercase text-[var(--text2)] hover:bg-[var(--bg3)] hover:text-[var(--acc)] transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <p className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] text-center py-4">
                Escribe al menos 2 caracteres para buscar
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8">
              <FileText size={48} className="text-[var(--text3)] mx-auto mb-4" />
              <p className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text3)] mb-2">
                No se encontraron resultados
              </p>
              <p className="font-dm-sans text-sm text-[var(--text2)]">
                Intenta con otros términos o verifica la ortografía
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] mb-3">
                {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para "{query}"
              </p>
              {results.map((article, index) => (
                <Link
                  key={article.id}
                  href={`/articulo/${article.id}`}
                  onClick={onClose}
                  className={`flex gap-4 p-4 rounded-lg transition-all group ${
                    index === selectedIndex
                      ? 'bg-[var(--bg3)] border-2 border-[var(--acc)]'
                      : 'bg-[var(--bg2)] hover:bg-[var(--bg3)] border-2 border-transparent'
                  }`}
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
