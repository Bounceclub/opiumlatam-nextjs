'use client';

import Image from 'next/image';

interface MediaImageProps {
  url: string;
  caption?: string;
  align?: 'left' | 'center' | 'right';
}

export default function MediaImage({ url, caption, align = 'center' }: MediaImageProps) {
  return (
    <figure className={`art-media ${align === 'left' ? 'align-left' : align === 'right' ? 'align-right' : 'align-center'}`}>
      <img
        src={url}
        alt={caption || ''}
        className="w-full max-w-full object-contain"
      />
      {caption && (
        <figcaption className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
