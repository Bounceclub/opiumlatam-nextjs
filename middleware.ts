import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Contraseña para acceder al sitio (cámbiala por una más segura)
const SITE_PASSWORD = process.env.SITE_PASSWORD || 'opium2024'

// Rutas que no requieren autenticación
const PUBLIC_PATHS = ['/login', '/api/auth']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir acceso a rutas públicas
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Verificar si ya está autenticado
  const authCookie = request.cookies.get('site_auth')

  if (authCookie?.value === SITE_PASSWORD) {
    return NextResponse.next()
  }

  // Redirigir a login si no está autenticado
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('redirect', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
