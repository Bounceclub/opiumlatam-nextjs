# Configuración de Variables de Entorno en Vercel

Para que Firebase Admin SDK funcione en Vercel, necesitas configurar las variables de entorno.

## Pasos para configurar en Vercel:

1. **Convertir el archivo de credenciales a JSON string:**

   Abre tu archivo `firebase-service-account.json` y conviértelo a una sola línea (sin saltos de línea).

2. **Ir a Vercel Dashboard:**
   - Ve a https://vercel.com/dashboard
   - Selecciona tu proyecto: opiumlatam-nextjs
   - Ve a Settings → Environment Variables

3. **Agregar la variable de entorno:**
   - Nombre: `FIREBASE_SERVICE_ACCOUNT_KEY`
   - Valor: El contenido de `firebase-service-account.json` como una sola línea JSON
   - Entornos: Production, Preview, Development

4. **Guardar y redeploy:**
   - Haz clic en "Save"
   - Vercel hará un redeploy automático

## Ejemplo de formato:

El valor debe ser algo como:
```json
{"type":"service_account","project_id":"opiumlatam","private_key_id":"...","private_key":"...","client_email":"..."}
```

Pero todo en una sola línea.

## Nota importante:

- **NO** commits el archivo `firebase-service-account.json` a GitHub
- **NO** compartas las credenciales con nadie
- El archivo ya está en `.gitignore` para evitar commits accidentales

## Verificación:

Después de configurar la variable de entorno, puedes verificar que funciona:

1. Ve a Vercel Dashboard → tu proyecto → Deployments
2. Verifica que el último deployment fue exitoso
3. Abre el sitio y verifica que los artículos se muestran correctamente