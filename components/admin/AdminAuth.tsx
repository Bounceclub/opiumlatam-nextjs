'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { checkRateLimit, recordAttempt, getLockoutTimeRemaining } from '@/lib/rateLimit';

export default function AdminAuth({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const rateLimit = checkRateLimit(email);

    if (!rateLimit.allowed) {
      const remaining = getLockoutTimeRemaining(email);
      setLockoutRemaining(remaining);
      setError('Demasiados intentos. Intenta nuevamente en unos minutos.');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      recordAttempt(email, true);
      onAuthenticated();
    } catch (err: any) {
      recordAttempt(email, false);
      const newRateLimit = checkRateLimit(email);

      if (!newRateLimit.allowed) {
        setLockoutRemaining(getLockoutTimeRemaining(email));
        setError('Demasiados intentos. Intenta nuevamente en unos minutos.');
      } else {
        setError(err.message || 'Error al iniciar sesión');
      }
    } finally {
      setLoading(false);
    }
  };

  // Update lockout timer
  useState(() => {
    const interval = setInterval(() => {
      if (lockoutRemaining > 0) {
        setLockoutRemaining(prev => Math.max(0, prev - 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md p-8 bg-[var(--bg2)] border border-[var(--border)] rounded-lg">
        <h1 className="font-anton text-3xl text-[var(--head)] tracking-[0.01em] mb-6 text-center">
          Panel Admin
        </h1>

        {lockoutRemaining > 0 ? (
          <div className="text-center py-8">
            <p className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-red-500 mb-2">
              Demasiados intentos
            </p>
            <p className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)]">
              Intenta nuevamente en {formatTime(lockoutRemaining)}
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--acc)]"
              />
            </div>

            <div>
              <label className="block font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text2)] mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--acc)]"
              />
            </div>

            {error && (
              <p className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-barlow-condensed text-sm font-bold tracking-widest uppercase bg-[var(--head)] text-[var(--bg)] rounded hover:bg-[var(--acc)] transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
