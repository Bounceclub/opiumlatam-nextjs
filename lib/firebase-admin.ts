import admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    // Try to initialize with environment variables (for Vercel deployment)
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: 'opiumlatam'
      });
      console.log('✅ Firebase Admin initialized with environment variables');
    } else {
      // Try to initialize with service account file (for local development)
      const serviceAccount = require('../firebase-service-account.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: 'opiumlatam'
      });
      console.log('✅ Firebase Admin initialized with service account file');
    }
  } catch (error) {
    console.log('⚠️ Could not initialize Firebase Admin:', error instanceof Error ? error.message : String(error));
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