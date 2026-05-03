'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        router.push(redirect)
      } else {
        setError('Contraseña incorrecta')
      }
    } catch {
      setError('Error al intentar autenticar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg2)] p-4">
      <div className="w-full max-w-md bg-[var(--bg)] rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--head)] mb-2">
            Acceso Restringido
          </h1>
          <p className="text-[var(--text2)]">
            Este sitio está en desarrollo. Ingresa la contraseña para continuar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--text)] mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--bg2)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--acc)] focus:border-transparent"
              placeholder="Ingresa la contraseña"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--head)] text-white py-3 px-4 rounded-lg font-medium hover:bg-[var(--acc2)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[var(--text3)]">
          <p>Si no tienes la contraseña, contacta al equipo de desarrollo.</p>
        </div>
      </div>
    </div>
  )
}
