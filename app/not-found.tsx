import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página No Encontrada - OpiumLATAM',
  description: 'La página que buscas no existe - OpiumLATAM',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-[var(--bg2)] rounded-lg p-8 sm:p-12 border border-[var(--border)]">
          <h1 className="text-6xl sm:text-8xl font-bold text-[var(--head)] mb-4">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--head)] mb-6">
            Página No Encontrada
          </h2>

          <p className="text-[var(--text2)] text-lg mb-8">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-[var(--head)] text-[var(--bg)] rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Volver al Inicio
            </Link>

            <Link
              href="/noticias"
              className="inline-flex items-center justify-center px-6 py-3 bg-[var(--bg3)] text-[var(--head)] rounded-lg font-semibold border border-[var(--border)] hover:bg-[var(--bg)] transition-colors"
            >
              Ver Noticias
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <p className="text-[var(--text3)] text-sm">
              ¿Buscas algo específico?{' '}
              <Link href="/noticias" className="text-[var(--head)] hover:underline">
                Explora nuestras noticias
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
