'use client';

import { useArticle } from '@/lib/hooks';
import { formatDate, calculateReadTime, getSectionLabel } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import LikeButton from '@/components/LikeButton';
import Comments from '@/components/Comments';
import { ArrowLeft, Share2, Twitter, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface ArticleContentProps {
  articleId: string;
}

export default function ArticleContent({ articleId }: ArticleContentProps) {
  const { article, loading } = useArticle(articleId);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const handleShareTwitter = () => {
    const url = window.location.href;
    const text = article?.title || '';
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&via=OpiumLATAM__`,
      '_blank'
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-[740px] mx-auto px-6 py-16">
          <div className="space-y-4">
            <div className="h-8 bg-[var(--bg2)] animate-pulse" />
            <div className="h-64 bg-[var(--bg2)] animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-[var(--bg2)] animate-pulse" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-[740px] mx-auto px-6 py-16 text-center">
          <p className="font-source-serif text-lg italic text-[var(--text3)]">
            Artículo no encontrado.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const sectionLabel = article.category || getSectionLabel(article.section);
  const readTime = article.readtime || calculateReadTime(article.body);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <article className="max-w-[740px] mx-auto px-4 sm:px-6 py-12 sm:py-16 animate-fade-up">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text3)] cursor-pointer border-none bg-transparent p-0 mb-6 sm:mb-8 transition-colors hover:text-[var(--acc)]"
          >
            <ArrowLeft size={14} />
            Volver
          </button>

          {/* Article Header */}
          <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--acc)] mb-3 sm:mb-4">
            {sectionLabel}
          </div>
          <h1 className="font-anton text-2xl sm:text-3xl lg:text-[4rem] leading-[0.97] text-[var(--head)] tracking-[0.01em] mb-3 sm:mb-4">
            {article.title}
          </h1>
          <p className="font-source-serif text-sm sm:text-lg italic font-normal leading-[1.65] text-[var(--text2)] py-3 sm:py-4 border-t border-b border-[var(--border)] mb-4 sm:mb-6">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-barlow-condensed text-xs sm:text-sm font-bold tracking-widest uppercase text-[var(--text3)] mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-3 border-[var(--head)]">
            <strong className="text-[var(--head)]">{article.author || 'Redacción'}</strong>
            <span>·</span>
            <span>{formatDate(article.date)}</span>
            <span>·</span>
            <span>{readTime}</span>
          </div>

          {/* Cover Image */}
          {article.cover && (
            <div className="w-full overflow-hidden my-6 sm:my-8">
              <Image
                src={article.cover}
                alt={article.title}
                width={740}
                height={416}
                className="w-full max-w-full"
                priority
              />
            </div>
          )}

          {/* Article Body */}
          <div className="font-source-serif text-sm sm:text-base leading-[1.88] text-[var(--text)]">
            {article.body.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 sm:mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Additional Images */}
          {article.images && article.images.length > 0 && (
            <div className="my-6 sm:my-8">
              {article.images.map((media, index) => (
                <div key={index} className="w-full overflow-hidden my-4">
                  <Image
                    src={media.url}
                    alt={media.caption || media.name || ''}
                    width={740}
                    height={416}
                    className="w-full max-w-full"
                  />
                  {media.caption && (
                    <p className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] mt-2 text-center">
                      {media.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Videos */}
          {article.videos && article.videos.length > 0 && (
            <div className="my-6 sm:my-8">
              {article.videos.map((media, index) => (
                <div key={index} className="w-full overflow-hidden my-4">
                  {media.embed ? (
                    <iframe
                      src={media.embed}
                      className={`w-full ${
                        media.embed.includes('youtube') ? 'aspect-video' : ''
                      } ${media.embed.includes('soundcloud') ? 'h-[152px]' : ''}`}
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <video controls className="w-full">
                      <source src={media.url} type="video/mp4" />
                    </video>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Audios */}
          {article.audios && article.audios.length > 0 && (
            <div className="my-6 sm:my-8">
              {article.audios.map((media, index) => (
                <div key={index} className="w-full my-4">
                  {media.embed ? (
                    <iframe
                      src={media.embed}
                      className="w-full h-[152px] scrolling='no' frameBorder='no'"
                      allow="autoplay; encrypted-media"
                    />
                  ) : (
                    <audio controls className="w-full">
                      <source src={media.url} type="audio/mpeg" />
                    </audio>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Music Embed */}
          {article.musicEmbed && (
            <div className="my-6 sm:my-8">
              <iframe
                src={article.musicEmbed}
                width="100%"
                height={
                  article.musicPlatform === 'YouTube'
                    ? 315
                    : article.musicPlatform === 'Apple Music'
                    ? 175
                    : 152
                }
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="block"
              />
            </div>
          )}

          {/* Score for Reviews */}
          {article.score && article.section === 'resenas' && (
            <div className="my-6 sm:my-8 p-4 sm:p-6 border-3 border-[var(--head)]">
              <div className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] mb-2">
                Puntuación
              </div>
              <div className="flex items-center gap-4">
                <span className="font-anton text-xl sm:text-2xl text-[var(--head)]">
                  {article.score}/10
                </span>
                <div className="flex-1 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--head)] transition-all"
                    style={{ width: `${article.score * 10}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[var(--border)]">
            <LikeButton articleId={articleId} />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] border border-[var(--border)] px-3 sm:px-4 py-2 cursor-pointer transition-all hover:border-[var(--head)] hover:text-[var(--head)]"
            >
              {copied ? '✓ Copiado' : <><Share2 size={14} /> Copiar link</>}
            </button>
            <button
              onClick={handleShareTwitter}
              className="flex items-center gap-2 font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] border border-[var(--border)] px-3 sm:px-4 py-2 cursor-pointer transition-all hover:border-[var(--head)] hover:text-[var(--head)]"
            >
              <Twitter size={14} />
              Twitter
            </button>
          </div>

          {/* Comments */}
          <Comments articleId={articleId} />
        </article>
      </main>

      <Footer />
    </div>
  );
}
