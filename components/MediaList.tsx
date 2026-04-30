'use client';

import { X, Image as ImageIcon, Video, Music } from 'lucide-react';
import { useState } from 'react';

interface MediaItem {
  type: 'image' | 'video' | 'audio';
  url: string;
  name?: string;
  caption?: string;
  embed?: string;
}

interface MediaListProps {
  items: MediaItem[];
  onRemove: (index: number) => void;
  onUpdateCaption: (index: number, caption: string) => void;
  onUpdateEmbed: (index: number, embed: string) => void;
}

export default function MediaList(props: MediaListProps) {
  const { items, onRemove, onUpdateCaption, onUpdateEmbed } = props;
  const [editingCaption, setEditingCaption] = useState<number | null>(null);
  const [editingEmbed, setEditingEmbed] = useState<number | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon size={16} />;
      case 'video':
        return <Video size={16} />;
      case 'audio':
        return <Music size={16} />;
      default:
        return null;
    }
  };

  const getPreview = (item: MediaItem) => {
    if (item.embed) {
      return (
        <div className="aspect-video bg-[var(--bg3)] flex items-center justify-center">
          <span className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)]">
            Embed
          </span>
        </div>
      );
    }

    switch (item.type) {
      case 'image':
        return (
          <img
            src={item.url}
            alt={item.name || ''}
            className="w-full h-full object-cover"
          />
        );
      case 'video':
        return (
          <video src={item.url} className="w-full h-full object-cover" />
        );
      case 'audio':
        return (
          <div className="aspect-square bg-[var(--bg3)] flex items-center justify-center">
            <Music size={32} className="text-[var(--text3)]" />
          </div>
        );
      default:
        return null;
    }
  };

  if (items.length === 0) {
    return (
      <p className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] text-center py-4">
        No hay archivos subidos
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className="flex gap-3 p-3 bg-[var(--bg2)] rounded-lg border border-[var(--border)]"
          >
            <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded bg-[var(--bg3)]">
              {getPreview(item)}
            </div>

            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                {getIcon(item.type)}
                <span className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] truncate">
                  {item.name || item.type}
                </span>
              </div>

              {editingCaption === index ? (
                <input
                  type="text"
                  value={item.caption || ''}
                  onChange={(e) => onUpdateCaption(index, e.target.value)}
                  onBlur={() => setEditingCaption(null)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditingCaption(null)}
                  placeholder="Pie de foto..."
                  className="w-full px-2 py-1 text-sm bg-[var(--bg)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--acc)]"
                  autoFocus
                />
              ) : (
                <div
                  onClick={() => setEditingCaption(index)}
                  className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] cursor-pointer hover:text-[var(--acc)]"
                >
                  {item.caption || 'Agregar pie de foto...'}
                </div>
              )}

              {(item.type === 'video' || item.type === 'audio') && (
                editingEmbed === index ? (
                  <input
                    type="text"
                    value={item.embed || ''}
                    onChange={(e) => onUpdateEmbed(index, e.target.value)}
                    onBlur={() => setEditingEmbed(null)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingEmbed(null)}
                    placeholder="URL de embed (YouTube, SoundCloud, etc.)"
                    className="w-full px-2 py-1 text-sm bg-[var(--bg)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--acc)]"
                    autoFocus
                  />
                ) : (
                  <div
                    onClick={() => setEditingEmbed(index)}
                    className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)] cursor-pointer hover:text-[var(--acc)]"
                  >
                    {item.embed ? 'Embed configurado' : 'Agregar embed...'}
                  </div>
                )
              )}
            </div>

            <button
              onClick={() => onRemove(index)}
              className="flex-shrink-0 p-2 text-[var(--text3)] hover:text-[var(--head)] hover:bg-[var(--bg3)] rounded transition-colors cursor-pointer border-none bg-transparent"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
