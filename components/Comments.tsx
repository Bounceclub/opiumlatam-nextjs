'use client';

import { useState } from 'react';
import { useComments } from '@/lib/useComments';
import { MessageCircle, Send, Trash2, User } from 'lucide-react';
import { auth } from '@/lib/firebase';

interface CommentsProps {
  articleId: string;
}

export default function Comments({ articleId }: CommentsProps) {
  const { comments, loading, addComment, deleteComment } = useComments(articleId);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setSubmitting(true);
      await addComment(newComment);
      setNewComment('');
    } catch (err: any) {
      setError(err.message || 'Error al agregar comentario');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('¿Estás seguro de eliminar este comentario?')) return;

    try {
      await deleteComment(commentId);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar comentario');
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'ahora mismo';
    if (diffMins < 60) return `hace ${diffMins} min`;
    if (diffHours < 24) return `hace ${diffHours} h`;
    if (diffDays < 7) return `hace ${diffDays} d`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const currentUser = auth.currentUser;

  return (
    <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-[var(--border)]">
      <h3 className="font-barlow-condensed text-lg font-bold tracking-widest uppercase text-[var(--head)] mb-6 flex items-center gap-2">
        <MessageCircle size={20} />
        Comentarios ({comments.length})
      </h3>

      {/* Comment Form */}
      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--head)] flex items-center justify-center">
              <User size={18} className="text-[var(--bg)]" />
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
                rows={3}
                maxLength={1000}
                className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--acc)] text-sm resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)]">
                  {newComment.length}/1000
                </span>
                <button
                  type="submit"
                  disabled={submitting || !newComment.trim()}
                  className="flex items-center gap-2 px-4 py-2 font-barlow-condensed text-xs font-bold tracking-widest uppercase bg-[var(--head)] text-[var(--bg)] rounded hover:bg-[var(--acc)] transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Send size={14} />
                  {submitting ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </div>
          </div>
          {error && (
            <p className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-red-500 mt-2">
              {error}
            </p>
          )}
        </form>
      ) : (
        <div className="mb-8 p-4 bg-[var(--bg2)] border border-[var(--border)] rounded text-center">
          <p className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text3)] mb-2">
            Inicia sesión para comentar
          </p>
          <button
            onClick={() => window.location.href = '/admin'}
            className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--acc)] hover:underline cursor-pointer"
          >
            Iniciar sesión
          </button>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 p-4 bg-[var(--bg2)] rounded animate-pulse">
              <div className="w-10 h-10 rounded-full bg-[var(--bg3)]" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-[var(--bg3)] rounded w-1/4" />
                <div className="h-3 bg-[var(--bg3)] rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] text-center py-8">
          No hay comentarios. ¡Sé el primero!
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-4 bg-[var(--bg2)] rounded">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--head)] flex items-center justify-center">
                <User size={18} className="text-[var(--bg)]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--head)]">
                      {comment.author}
                    </span>
                    <span className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] ml-2">
                      · {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  {currentUser && (currentUser.uid === comment.uid || currentUser.email === 'latamopium@gmail.com') && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-1 text-[var(--text3)] hover:text-red-500 transition-colors cursor-pointer"
                      title="Eliminar comentario"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <p className="font-source-serif text-sm text-[var(--text)] leading-relaxed">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
