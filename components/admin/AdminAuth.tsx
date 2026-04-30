'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AdminAuth({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuthenticated();
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md p-8 bg-[var(--bg2)] border border-[var(--border)] rounded-lg">
        <h1 className="font-anton text-3xl text-[var(--head)] tracking-[0.01em] mb-6 text-center">
          Panel Admin
        </h1>

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
      </div>
    </div>
  );
}
