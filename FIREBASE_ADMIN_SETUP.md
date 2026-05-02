# Firebase Admin SDK Service Account

Para usar Firebase Admin SDK en el servidor, necesitas un archivo de credenciales de servicio.

## Pasos para obtener las credenciales:

1. Ve a Firebase Console: https://console.firebase.google.com/
2. Selecciona el proyecto: opiumlatam
3. Ve a: Configuración del proyecto → Cuentas de servicio
4. Haz clic en "Generar nueva clave privada"
5. Descarga el archivo JSON
6. Renombra el archivo a `firebase-service-account.json`
7. Colócalo en la raíz del proyecto (junto a package.json)

## Importante:

- **NO** commits este archivo a Git
- **NO** lo compartas con nadie
- Guárdalo en un lugar seguro
- Si se filtra, revócalo inmediatamente en Firebase Console

## Alternativa:

Si no puedes obtener las credenciales de servicio, puedes usar la configuración predeterminada de Firebase Admin SDK, pero esto requiere que el servidor tenga acceso a las credenciales de Google Cloud.

## Archivo .gitignore

Asegúrate de agregar `firebase-service-account.json` a tu archivo .gitignore:

```
firebase-service-account.json
```