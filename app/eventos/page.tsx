'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

interface Event {
  title: string;
  date: string;
  url?: string;
  venue?: string;
  address?: string;
  flyerUrl?: string;
}

export default function EventosPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const docRef = doc(db, 'config', 'evento');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEvent(docSnap.data() as Event);
        }
      } catch (error) {
        console.error('Error loading event:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="max-w-[900px] mx-auto px-6 py-16 text-center">
          <span className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)] block mb-3">
            🎟 Evento recomendado por OpiumLATAM
          </span>
          {loading ? (
            <div className="space-y-4">
              <div className="h-12 bg-[var(--bg2)] animate-pulse" />
              <div className="h-8 bg-[var(--bg2)] animate-pulse" />
              <div className="h-64 bg-[var(--bg2)] animate-pulse" />
            </div>
          ) : event ? (
            <>
              <h1 className="font-anton text-5xl lg:text-[6rem] leading-[0.92] tracking-[0.02em] uppercase text-[var(--text)] mb-6">
                {event.title}
              </h1>
              <div className="flex items-center justify-center gap-6 flex-wrap mb-8">
                <div className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text3)]">
                  <strong className="text-[var(--text)] block text-base mb-1">
                    {event.date}
                  </strong>
                  Fecha
                </div>
                <div className="w-3 h-3 bg-[var(--text3)] rounded-full" />
                <div className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text3)]">
                  <strong className="text-[var(--text)] block text-base mb-1">
                    {event.venue}
                  </strong>
                  Lugar
                </div>
                <div className="w-3 h-3 bg-[var(--text3)] rounded-full" />
                <div className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text3)]">
                  <strong className="text-[var(--text)] block text-base mb-1">
                    {event.address}
                  </strong>
                  Dirección
                </div>
              </div>

              {event.flyerUrl && (
                <div className="max-w-[900px] mx-auto px-6 mb-8">
                  <Image
                    src={event.flyerUrl}
                    alt="Flyer del evento"
                    width={900}
                    height={520}
                    className="w-full max-h-[520px] object-contain"
                  />
                </div>
              )}

              {event.url && (
                <div className="flex flex-col items-center gap-4">
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[var(--head)] text-[var(--bg)] font-barlow-condensed text-sm font-bold tracking-widest uppercase px-10 py-4 no-underline transition-all hover:opacity-85 hover:-translate-y-[-2px]"
                  >
                    🎟 Comprar entradas
                  </a>
                  <span className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)]">
                    Serás redirigido a la plataforma oficial de tickets
                  </span>
                </div>
              )}
            </>
          ) : (
            <p className="font-source-serif text-lg italic text-[var(--text3)]">
              No hay eventos publicados por el momento.
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
