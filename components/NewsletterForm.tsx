'use client';

import { useState } from 'react';
import { Mail, Check, X } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Por favor ingresa un email válido');
      return;
    }

    setStatus('loading');

    try {
      // Subscribe to Firebase
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('¡Gracias por suscribirte!');
        setEmail('');
      } else {
        const data = await response.json();
        setStatus('error');
        setMessage(data.error || 'Error al suscribirse');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Error al suscribirse. Intenta nuevamente.');
    }
  };

  return (
    <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[var(--head)] rounded-full">
          <Mail size={20} className="text-[var(--bg)]" />
        </div>
        <div>
          <h3 className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--head)]">
            Newsletter
          </h3>
          <p className="font-source-serif text-xs text-[var(--text3)]">
            Recibe las últimas noticias de Hip-Hop
          </p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500 rounded">
          <Check size={16} className="text-green-500" />
          <span className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-green-500">
            {message}
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu email"
            className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--acc)] text-sm"
            disabled={status === 'loading'}
          />
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-500">
              <X size={14} />
              <span className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase">
                {message}
              </span>
            </div>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 font-barlow-condensed text-sm font-bold tracking-widest uppercase bg-[var(--head)] text-[var(--bg)] rounded hover:bg-[var(--acc)] transition-colors cursor-pointer disabled:opacity-50"
          >
            {status === 'loading' ? 'Suscribiendo...' : 'Suscribirse'}
          </button>
        </form>
      )}
    </div>
  );
}
