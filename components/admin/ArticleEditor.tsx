'use client';

import { useState, useEffect } from 'react';
import { addDoc, updateDoc, doc, deleteDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, auth } from '@/lib/firebase';
import { Article } from '@/types';
import { validateArticleData } from '@/lib/sanitize';
import MediaUploader from '@/components/MediaUploader';
import MediaList from '@/components/MediaList';
import { X, Save, Trash2, Plus, AlertCircle } from 'lucide-react';

interface ArticleEditorProps {
  article?: Article;
  onSave: () => void;
  onCancel: () => void;
}

export default function ArticleEditor({ article, onSave, onCancel }: ArticleEditorProps) {
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    section: 'noticias' as 'noticias' | 'discusion' | 'resenas',
    category: '',
    excerpt: '',
    body: '',
    author: 'Redacción',
    readtime: '',
    cover: '',
    pinned: false,
    score: 0,
    musicLink: '',
    musicEmbed: '',
    musicPlatform: '',
  });

  const [images, setImages] = useState<{ url: string; name?: string; caption?: string }[]>([]);
  const [videos, setVideos] = useState<{ url: string; name?: string; caption?: string; embed?: string }[]>([]);
  const [audios, setAudios] = useState<{ url: string; name?: string; caption?: string; embed?: string }[]>([]);

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || '',
        section: article.section || 'noticias',
        category: article.category || '',
        excerpt: article.excerpt || '',
        body: article.body || '',
        author: article.author || 'Redacción',
        readtime: article.readtime || '',
        cover: article.cover || '',
        pinned: article.pinned || false,
        score: article.score || 0,
        musicLink: article.musicLink || '',
        musicEmbed: article.musicEmbed || '',
        musicPlatform: article.musicPlatform || '',
      });
      setImages(article.images || []);
      setVideos(article.videos || []);
      setAudios(article.audios || []);
    }
  }, [article]);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const timestamp = Date.now();
      const fileName = `cover-${timestamp}-${file.name}`;
      const storageRef = ref(storage, `articles/${fileName}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData({ ...formData, cover: url });
    } catch (error) {
      console.error('Error uploading cover:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);
    setLoading(true);

    try {
      const articleData = {
        ...formData,
        images,
        videos,
        audios,
        date: article?.date || new Date().toISOString().split('T')[0],
        score: formData.section === 'resenas' ? formData.score : null,
      };

      // Validate article data
      const validation = validateArticleData(articleData);
      if (!validation.valid) {
        setValidationErrors(validation.errors);
        setLoading(false);
        return;
      }

      if (article?.id) {
        await updateDoc(doc(db, 'articles', article.id), articleData);
      } else {
        await addDoc(collection(db, 'articles'), articleData);
      }

      onSave();
    } catch (error) {
      console.error('Error saving article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!article?.id) return;
    if (!confirm('¿Estás seguro de eliminar este artículo?')) return;

    setLoading(true);

    try {
      // Delete cover from storage
      if (article.cover) {
        try {
          const coverRef = ref(storage, article.cover);
          await deleteObject(coverRef);
        } catch (e) {
          console.error('Error deleting cover:', e);
        }
      }

      await deleteDoc(doc(db, 'articles', article.id));
      onSave();
    } catch (error) {
      console.error('Error deleting article:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-anton text-3xl text-[var(--head)] tracking-[0.01em]">
          {article ? 'Editar Artículo' : 'Nuevo Artículo'}
        </h1>
        <button
          onClick={onCancel}
          className="p-2 text-[var(--text3)] hover:text-[var(--head)] cursor-pointer border-none bg-transparent"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] mb-2">
            Título
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            maxLength={200}
            className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--acc)]"
          />
        </div>

        {/* Section & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] mb-2">
              Sección
            </label>
            <select
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value as any })}
              className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--acc)]"
            >
              <option value="noticias">Noticias</option>
              <option value="discusion">Discusión</option>
              <option value="resenas">Reseñas</option>
            </select>
          </div>

          <div>
            <label className="block font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] mb-2">
              Categoría
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              maxLength={80}
              className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--acc)]"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] mb-2">
            Extracto
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            required
            maxLength={400}
            rows={3}
            className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--acc)]"
          />
        </div>

        {/* Body */}
        <div>
          <label className="block font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] mb-2">
            Cuerpo del artículo
          </label>
          <textarea
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            required
            rows={15}
            className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--acc)] font-mono text-sm"
          />
        </div>

        {/* Cover */}
        <div>
          <label className="block font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] mb-2">
            Portada
          </label>
          <div className="space-y-3">
            {formData.cover && (
              <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                <img src={formData.cover} alt="Cover" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, cover: '' })}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer border-none"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded"
            />
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] mb-2">
            Imágenes adicionales
          </label>
          <MediaUploader
            acceptedTypes="image"
            onMediaAdd={(media) => setImages([...images, media])}
          />
          <div className="mt-3">
            <MediaList
              items={images.map((img) => ({ ...img, type: 'image' as const }))}
              onRemove={(i) => setImages(images.filter((_, idx) => idx !== i))}
              onUpdateCaption={(i, caption) => {
                const newImages = [...images];
                newImages[i].caption = caption;
                setImages(newImages);
              }}
              onUpdateEmbed={() => {}}
            />
          </div>
        </div>

        {/* Videos */}
        <div>
          <label className="block font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] mb-2">
            Videos
          </label>
          <MediaUploader
            acceptedTypes="video"
            onMediaAdd={(media) => setVideos([...videos, media])}
          />
          <div className="mt-3">
            <MediaList
              items={videos.map((vid) => ({ ...vid, type: 'video' as const }))}
              onRemove={(i) => setVideos(videos.filter((_, idx) => idx !== i))}
              onUpdateCaption={(i, caption) => {
                const newVideos = [...videos];
                newVideos[i].caption = caption;
                setVideos(newVideos);
              }}
              onUpdateEmbed={(i, embed) => {
                const newVideos = [...videos];
                newVideos[i].embed = embed;
                setVideos(newVideos);
              }}
            />
          </div>
        </div>

        {/* Audios */}
        <div>
          <label className="block font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] mb-2">
            Audios
          </label>
          <MediaUploader
            acceptedTypes="audio"
            onMediaAdd={(media) => setAudios([...audios, media])}
          />
          <div className="mt-3">
            <MediaList
              items={audios.map((aud) => ({ ...aud, type: 'audio' as const }))}
              onRemove={(i) => setAudios(audios.filter((_, idx) => idx !== i))}
              onUpdateCaption={(i, caption) => {
                const newAudios = [...audios];
                newAudios[i].caption = caption;
                setAudios(newAudios);
              }}
              onUpdateEmbed={(i, embed) => {
                const newAudios = [...audios];
                newAudios[i].embed = embed;
                setAudios(newAudios);
              }}
            />
          </div>
        </div>

        {/* Score for reviews */}
        {formData.section === 'resenas' && (
          <div>
            <label className="block font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] mb-2">
              Puntuación (1-10)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={formData.score}
              onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--acc)]"
            />
          </div>
        )}

        {/* Author & Read Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] mb-2">
              Autor
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              maxLength={100}
              className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--acc)]"
            />
          </div>

          <div>
            <label className="block font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] mb-2">
              Tiempo de lectura
            </label>
            <input
              type="text"
              value={formData.readtime}
              onChange={(e) => setFormData({ ...formData, readtime: e.target.value })}
              placeholder="5 min"
              className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--acc)]"
            />
          </div>
        </div>

        {/* Pinned */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="pinned"
            checked={formData.pinned}
            onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
            className="w-5 h-5"
          />
          <label htmlFor="pinned" className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text2)] cursor-pointer">
            Destacar en home
          </label>
        </div>

        {/* Actions */}
        {validationErrors.length > 0 && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-red-500 mb-2">
                  Por favor corrige los siguientes errores:
                </p>
                <ul className="space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-red-400">
                      • {error}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center gap-4 pt-6 border-t border-[var(--border)]">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 font-barlow-condensed text-sm font-bold tracking-widest uppercase bg-[var(--head)] text-[var(--bg)] rounded hover:bg-[var(--acc)] transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save size={16} />
            {loading ? 'Guardando...' : 'Guardar'}
          </button>

          {article && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 font-barlow-condensed text-sm font-bold tracking-widest uppercase bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Trash2 size={16} />
              Eliminar
            </button>
          )}

          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 font-barlow-condensed text-sm font-bold tracking-widest uppercase border border-[var(--border)] rounded hover:border-[var(--head)] transition-colors cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
