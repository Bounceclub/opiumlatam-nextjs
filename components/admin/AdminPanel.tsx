'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Article } from '@/types';
import ArticleEditor from './ArticleEditor';
import { Plus, Edit2, Pin, LogOut, Search } from 'lucide-react';
import { signOut } from 'firebase/auth';

export default function AdminPanel() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSection, setFilterSection] = useState<'all' | 'noticias' | 'discusion' | 'resenas'>('all');

  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const articlesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Article[];
      setArticles(articlesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleTogglePin = async (article: Article) => {
    try {
      await updateDoc(doc(db, 'articles', article.id), {
        pinned: !article.pinned,
      });
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = filterSection === 'all' || article.section === filterSection;
    return matchesSearch && matchesSection;
  });

  if (isCreating || editingArticle) {
    return (
      <ArticleEditor
        article={editingArticle || undefined}
        onSave={() => {
          setIsCreating(false);
          setEditingArticle(null);
        }}
        onCancel={() => {
          setIsCreating(false);
          setEditingArticle(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg2)] border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-anton text-2xl text-[var(--head)] tracking-[0.01em]">
            Panel Admin
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 font-barlow-condensed text-sm font-bold tracking-widest uppercase bg-[var(--head)] text-[var(--bg)] rounded hover:bg-[var(--acc)] transition-colors cursor-pointer"
            >
              <Plus size={16} />
              Nuevo Artículo
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 font-barlow-condensed text-sm font-bold tracking-widest uppercase border border-[var(--border)] rounded hover:border-[var(--head)] transition-colors cursor-pointer"
            >
              <LogOut size={16} />
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text3)]" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[var(--bg2)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--acc)]"
            />
          </div>

          <div className="flex gap-2">
            {(['all', 'noticias', 'discusion', 'resenas'] as const).map((section) => (
              <button
                key={section}
                onClick={() => setFilterSection(section)}
                className={`px-4 py-2 font-barlow-condensed text-xs font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${
                  filterSection === section
                    ? 'bg-[var(--head)] text-[var(--bg)]'
                    : 'bg-[var(--bg2)] text-[var(--text2)] hover:bg-[var(--bg3)]'
                }`}
              >
                {section === 'all' ? 'Todos' : section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text3)]">
              Cargando artículos...
            </p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text3)]">
              No hay artículos
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="flex items-start gap-4 p-4 bg-[var(--bg2)] border border-[var(--border)] rounded-lg hover:border-[var(--acc)] transition-colors"
              >
                {/* Cover */}
                {article.cover && (
                  <div className="w-24 h-16 flex-shrink-0 overflow-hidden rounded bg-[var(--bg3)]">
                    <img
                      src={article.cover}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--acc)]">
                      {article.category || article.section}
                    </span>
                    {article.pinned && (
                      <span className="flex items-center gap-1 font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--head)]">
                        <Pin size={12} />
                        Destacado
                      </span>
                    )}
                  </div>
                  <h3 className="font-anton text-lg text-[var(--head)] tracking-[0.01em] line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] mt-1">
                    {article.date}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePin(article)}
                    className={`p-2 rounded transition-colors cursor-pointer border-none bg-transparent ${
                      article.pinned ? 'text-[var(--head)]' : 'text-[var(--text3)] hover:text-[var(--head)]'
                    }`}
                    title={article.pinned ? 'Quitar destacado' : 'Destacar'}
                  >
                    <Pin size={18} />
                  </button>
                  <button
                    onClick={() => setEditingArticle(article)}
                    className="p-2 text-[var(--text3)] hover:text-[var(--head)] rounded transition-colors cursor-pointer border-none bg-transparent"
                    title="Editar"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
