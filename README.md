# OpiumLATAM - Next.js PWA

Sitio web de noticias de Hip-Hop en español para Latinoamérica. PWA con Next.js 16.2.4, Firebase, y Tailwind CSS.

## 🚀 Stack Tecnológico

- **Framework:** Next.js 16.2.4 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Base de datos:** Firebase Firestore
- **Autenticación:** Firebase Auth
- **Storage:** Firebase Storage
- **PWA:** next-pwa
- **Analytics:** Google Analytics
- **Build:** Webpack (Turbopack incompatible con next-pwa)

## 📁 Estructura del Proyecto

```
opiumlatam-nextjs/
├── app/
│   ├── api/
│   │   └── newsletter/
│   │       └── subscribe/
│   │           └── route.ts          # API endpoint para newsletter
│   ├── admin/
│   │   └── page.tsx                  # Panel de administración
│   ├── articulo/
│   │   └── [id]/
│   │       ├── page.tsx              # Página de artículo (server component)
│   │       └── ArticleContent.tsx    # Contenido del artículo (client component)
│   ├── discusion/
│   │   └── page.tsx                  # Página de discusiones
│   ├── eventos/
│   │   └── page.tsx                  # Página de eventos
│   ├── noticias/
│   │   └── page.tsx                  # Página de noticias
│   ├── resenas/
│   │   └── page.tsx                  # Página de reseñas
│   ├── layout.tsx                    # Layout principal con analytics
│   ├── page.tsx                      # Homepage responsive
│   ├── robots.txt                    # Robots.txt para SEO
│   └── sitemap.ts                    # Sitemap dinámico
├── components/
│   ├── ArticleCard.tsx               # Tarjeta de artículo
│   ├── ArticleEditor.tsx             # Editor de artículos
│   ├── Comments.tsx                  # Sistema de comentarios
│   ├── HeroSection.tsx               # Hero section adaptativo
│   ├── LikeButton.tsx                # Botón de likes
│   ├── NewsletterForm.tsx            # Formulario de newsletter
│   ├── PushNotificationPrompt.tsx    # Prompt de notificaciones push
│   └── SearchOverlay.tsx             # Overlay de búsqueda
├── lib/
│   ├── firebase.ts                   # Configuración de Firebase
│   ├── rateLimit.ts                  # Rate limiting con localStorage
│   ├── sanitize.ts                   # Sanitización de HTML (XSS prevention)
│   ├── seo.ts                        # Generación de metadata y schema
│   ├── useComments.ts                # Hook para comentarios
│   ├── useLikes.ts                   # Hook para likes
│   └── useNewsletter.ts             # Hook para newsletter
├── public/
│   ├── manifest.json                 # Manifest de PWA
│   ├── sw.js                         # Service worker (generado por next-pwa)
│   └── icons/                        # Iconos de la app
├── types/
│   └── index.ts                      # Definiciones de tipos TypeScript
├── .env.local                        # Variables de entorno (local)
├── next.config.js                    # Configuración de Next.js (webpack)
├── package.json                      # Dependencias
└── tsconfig.json                      # Configuración de TypeScript
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=opiumlatam.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=opiumlatam
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=opiumlatam.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar producción
npm start
```

## 🎨 Sistema de Diseño

### Colores (Variables CSS)

El proyecto usa variables CSS para theming:

```css
--bg: #0a0a0a;        /* Fondo principal */
--bg2: #1a1a1a;       /* Fondo secundario */
--bg3: #2a2a2a;       /* Fondo terciario */
--text: #ffffff;      /* Texto principal */
--text2: #cccccc;     /* Texto secundario */
--text3: #888888;     /* Texto terciario */
--head: #ffffff;      /* Encabezados */
--acc: #ff6b35;       /* Acento */
--border: #333333;    /* Bordes */
```

### Tipografías

- **Anton:** Títulos grandes (display)
- **Barlow Condensed:** Encabezados y UI
- **Source Serif 4:** Cuerpo de texto
- **DM Sans:** Texto secundario

## ✨ Características Implementadas

### 1. SEO Optimizado

- **Metadata dinámica:** Open Graph, Twitter Cards
- **Schema.org:** NewsArticle y ReviewNewsArticle
- **Sitemap dinámico:** Generado automáticamente desde Firestore
- **Robots.txt:** Configurado para crawlers

### 2. Búsqueda

- **Búsqueda en tiempo real:** Debounce de 300ms
- **Campos buscados:** Título, excerpt, body
- **Máximo 10 resultados:** Para mejor UX
- **Overlay modal:** UI intuitiva

### 3. Notificaciones Push

- **Prompt automático:** Aparece después de 5 segundos
- **Service Worker:** Integrado con next-pwa
- **VAPID keys:** Configurar en Vercel para producción

### 4. Sistema de Likes

- **Contador en tiempo real:** Firebase onSnapshot
- **Prevención de duplicados:** localStorage
- **UI reactiva:** Actualización instantánea

### 5. Newsletter

- **Validación de email:** Regex
- **Firebase integration:** Almacenamiento seguro
- **Estados de UI:** Loading, success, error

### 6. Seguridad

#### Rate Limiting

- **5 intentos máximos:** Por identificador
- **Lockout de 15 minutos:** Después de exceder límite
- **localStorage:** Persistencia en cliente

#### Sanitización de Contenido

- **XSS prevention:** Remoción de scripts
- **Event handlers:** Remoción de on* attributes
- **Validación de longitud:** Límites por campo

### 7. Comentarios

- **Comentarios en tiempo real:** Firebase onSnapshot
- **Formato de tiempo relativo:** "hace 5 min", "hace 2 h"
- **Permisos de eliminación:** Autor y admin (latamopium@gmail.com)
- **Autenticación requerida:** Solo usuarios logueados

### 8. Analytics

- **Google Analytics:** G-SNRQY97T7V
- **Page tracking:** Automático
- **Event tracking:** Configurable

### 9. PWA

- **Manifest.json:** Configuración de app
- **Service Worker:** Caching offline
- **Responsive:** Mobile-first design
- **Instalable:** Add to home screen

### 10. Responsive Design

- **Mobile-first:** 1 columna en móvil
- **Tablet:** 2 columnas
- **Desktop:** 3-4 columnas
- **Hero adaptativo:** 400px → 500px → 560px

## 🗄️ Firebase Collections

### articles

```typescript
{
  id: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  date: Timestamp;
  category: 'noticias' | 'resenas' | 'eventos' | 'discusion';
  imageUrl?: string;
  likes?: number;
}
```

### comments

```typescript
{
  id: string;
  articleId: string;
  text: string;
  author: string;
  uid: string;
  createdAt: Timestamp;
}
```

### likes

```typescript
{
  articleId: string;
  uid: string;
  timestamp: Timestamp;
}
```

### newsletter

```typescript
{
  email: string;
  subscribedAt: Timestamp;
}
```

## 🚢 Deployment

### Vercel

1. **Conectar repositorio:** https://github.com/Bounceclub/opiumlatam-nextjs
2. **Configurar variables de entorno:** (ver sección Variables de Entorno)
3. **Build command:** `npm run build`
4. **Output directory:** `.next`
5. **Framework preset:** Next.js

### Dominio

Para configurar `opiumlatam.com`:

1. En Vercel: Settings → Domains → Add Domain
2. Agregar DNS records en tu registrador:

```
Type: CNAME
Name: @ (o blank)
Value: cname.vercel-dns.com

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

3. Vercel emitirá certificados SSL automáticamente

## 📝 Panel de Administración

Acceso: `/admin`

Funcionalidades:
- Crear, editar, eliminar artículos
- Subir imágenes a Firebase Storage
- Categorizar artículos
- Vista previa en tiempo real

## 🔍 Troubleshooting

### Build Errors

**Error:** Turbopack conflict with next-pwa
**Solución:** Usar `npm run build` (ya configurado con `--webpack`)

**Error:** Firebase connection during build
**Solución:** Normal, Firestore no se conecta en build time

### Runtime Errors

**Error:** Firebase App Check
**Solución:** Deshabilitado temporalmente, requiere configuración adicional

**Error:** Hydration warnings
**Solución:** Suprimidos en layout.tsx con script de console.error override

### Development

**Error:** Hot reload no funciona
**Solución:** Reiniciar dev server: `npm run dev`

## 📦 Scripts Disponibles

```bash
npm run dev          # Desarrollo con hot reload
npm run build        # Build para producción
npm start            # Iniciar producción
npm run lint         # Linting con ESLint
```

## 🎯 Próximas Mejoras

- [ ] Configurar VAPID keys para push notifications
- [ ] Re-habilitar Firebase App Check
- [ ] Agregar paginación en listas de artículos
- [ ] Implementar dark/light mode toggle
- [ ] Agregar más tests unitarios
- [ ] Optimizar imágenes con next/image
- [ ] Implementar cache de búsqueda

## 📄 Licencia

Proyecto privado - OpiumLATAM

## 👥 Equipo

- **Desarrollo:** OpiumLATAM
- **Diseño:** OpiumLATAM
- **Analytics:** Google Analytics (G-SNRQY97T7V)

## 📞 Contacto

- Email: latamopium@gmail.com
- Web: https://opiumlatam.com
- GitHub: https://github.com/Bounceclub/opiumlatam-nextjs

---

**Nota para Claude Code:** Este proyecto usa Next.js 16.2.4 con App Router. Todos los componentes en `app/` son server components por defecto. Los componentes interactivos (con hooks) deben ser client components con `'use client'` al inicio del archivo. El build usa webpack explícitamente debido a incompatibilidad con next-pwa y Turbopack.
