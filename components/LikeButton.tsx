'use client';

import { Heart } from 'lucide-react';
import { useArticleLikes } from '@/lib/useLikes';

interface LikeButtonProps {
  articleId: string;
}

export default function LikeButton({ articleId }: LikeButtonProps) {
  const { likes, isLiked, loading, toggleLike } = useArticleLikes(articleId);

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 font-barlow-condensed text-xs font-bold tracking-widest uppercase border rounded transition-all cursor-pointer ${
        isLiked
          ? 'bg-red-500 text-white border-red-500'
          : 'bg-transparent text-[var(--text2)] border-[var(--border)] hover:border-[var(--head)] hover:text-[var(--head)]'
      }`}
      title={isLiked ? 'Ya no me gusta' : 'Me gusta'}
    >
      <Heart size={16} className={isLiked ? 'fill-current' : ''} />
      <span>{likes}</span>
    </button>
  );
}
