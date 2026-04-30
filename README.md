# OpiumLATAM - Next.js

Sitio web de noticias de Hip-Hop en español para Latinoamérica.

## 🚀 Deploy en Vercel

### 1. Preparar el repositorio

```bash
cd C:/Users/lucas/opiumlatam-nextjs
git init
git add .
git commit -m "Initial commit"
```

### 2. Crear repositorio en GitHub

1. Ve a [github.com](https://github.com) y crea un nuevo repositorio
2. Sigue las instrucciones para conectar tu repositorio local

### 3. Deploy en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Clic en "Add New Project"
3. Importa el repositorio `opiumlatam-nextjs`
4. Vercel detectará Next.js automáticamente
5. Configura las variables de entorno:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDmvOiL1fJYW9sM_dw1zw-zijtcV4Crb0k
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=opiumlatam.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=opiumlatam
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=opiumlatam.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=572727555725
NEXT_PUBLIC_FIREBASE_APP_ID=1:572727555725:web:2ff18230345838002754c4
```

6. Clic en "Deploy"

### 4. Configurar el dominio

1. En Vercel, ve a Settings → Domains
2. Agrega `opiumlatam.com`
3. Vercel te dará instrucciones para configurar los DNS:
   - CNAME: `opiumlatam.com` → `cname.vercel-dns.com`

## 📝 Variables de entorno

Todas las variables están configuradas en `.env.local`. Para producción, agrégalas en Vercel Dashboard → Settings → Environment Variables.

## 🛠️ Desarrollo local

```bash
npm install
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## 📱 Panel de administración

Accede a `/admin` para crear y editar artículos.

## 🔥 Firebase

El proyecto usa Firebase para:
- Firestore (base de datos)
- Storage (archivos multimedia)
- Auth (autenticación del admin)

## 🌐 PWA

El sitio es una PWA (Progressive Web App) con soporte offline.
