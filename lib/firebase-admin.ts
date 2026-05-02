import admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID || 'opiumlatam';
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    console.log('🔧 Firebase Admin config check:', {
      projectId,
      hasClientEmail: !!clientEmail,
      hasPrivateKey: !!privateKey,
      privateKeyLength: privateKey?.length || 0
    });

    if (clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log('✅ Firebase Admin initialized with environment variables');
    } else {
      // Fallback to default config
      admin.initializeApp({
        projectId,
      });
      console.log('⚠️ Firebase Admin initialized with default config (no credentials)');
    }
  } catch (error) {
    console.log('❌ Could not initialize Firebase Admin:', error instanceof Error ? error.message : String(error));
    // Fallback to default config
    try {
      admin.initializeApp({
        projectId: 'opiumlatam',
      });
      console.log('✅ Firebase Admin initialized with fallback config');
    } catch (fallbackError) {
      console.log('❌ Could not initialize Firebase Admin with fallback:', fallbackError instanceof Error ? fallbackError.message : String(fallbackError));
    }
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export const adminStorage = admin.storage();

export default admin;
