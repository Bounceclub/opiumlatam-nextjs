import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-6 text-center">
      <Link
        href="/"
        className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] no-underline hover:text-[var(--head)] transition-colors"
      >
        OpiumLATAM — Noticias de Hip-Hop para Latinoamérica
      </Link>
    </footer>
  );
}
