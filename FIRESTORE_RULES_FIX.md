# Reglas de Seguridad de Firestore - Diagnóstico

## Problema Identificado

**Error:** `7 PERMISSION_DENIED: Missing or insufficient permissions.`

**Causa:** Las reglas de seguridad de Firestore están bloqueando operaciones de escritura.

## Estado Actual

- ✅ Firebase se inicializa correctamente
- ✅ Firestore se inicializa correctamente
- ✅ Puede LEER de la colección articles (5 artículos encontrados)
- ❌ NO puede ESCRIBIR en la colección articles (PERMISSION_DENIED)

## Solución Necesaria

Las reglas de seguridad de Firestore deben actualizarse para permitir escritura. 

### Reglas Recomendadas (para desarrollo)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Reglas para la colección articles
    match /articles/{articleId} {
      // Permitir lectura a todos
      allow read: if true;
      
      // Permitir escritura solo a usuarios autenticados
      allow write: if request.auth != null;
      
      // Alternativa: Permitir escritura a todos (NO RECOMENDADO para producción)
      // allow write: if true;
    }
    
    // Reglas para otras colecciones
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Pasos para Solucionar

1. Ir a Firebase Console: https://console.firebase.google.com/
2. Seleccionar el proyecto: opiumlatam
3. Navegar a: Firestore Database → Reglas
4. Actualizar las reglas con el código de arriba
5. Hacer clic en "Publicar"

## Notas Importantes

- Para desarrollo, puedes usar `allow write: if true;` para permitir escritura a todos
- Para producción, usa `allow write: if request.auth != null;` para requerir autenticación
- Verifica que el usuario esté autenticado en el admin panel antes de intentar escribir