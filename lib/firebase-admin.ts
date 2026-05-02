import admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    // Try to initialize with service account
    const serviceAccount = require('../firebase-service-account.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: 'opiumlatam'
    });
    console.log('✅ Firebase Admin initialized with service account');
  } catch (error) {
    console.log('⚠️ Could not initialize Firebase Admin with service account:', error instanceof Error ? error.message : String(error));
    // Fallback to default config
    try {
      admin.initializeApp({
        projectId: 'opiumlatam'
      });
      console.log('✅ Firebase Admin initialized with default config');
    } catch (fallbackError) {
      console.log('❌ Could not initialize Firebase Admin:', fallbackError instanceof Error ? fallbackError.message : String(fallbackError));
    }
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export const adminStorage = admin.storage();

export default admin;