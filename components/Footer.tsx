import Link from 'next/link';
import NewsletterForm from '@/components/NewsletterForm';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 sm:py-12">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text3)] no-underline hover:text-[var(--head)] transition-colors block mb-4"
            >
              OpiumLATAM
            </Link>
            <p className="font-source-serif text-sm text-[var(--text3)] mb-4">
              Noticias de Hip-Hop para Latinoamérica
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/OpiumLATAM__"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text3)] hover:text-[var(--head)] transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com/OpiumLATAM"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text3)] hover:text-[var(--head)] transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com/@OpiumLATAM_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text3)] hover:text-[var(--head)] transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <NewsletterForm />
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] no-underline hover:text-[var(--head)] transition-colors"
          >
            © {new Date().getFullYear()} OpiumLATAM
          </Link>
          <div className="flex gap-4">
            <Link
              href="/privacidad"
              className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] no-underline hover:text-[var(--head)] transition-colors"
            >
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
