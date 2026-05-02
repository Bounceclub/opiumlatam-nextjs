import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, enableMultiTabIndexedDbPersistence, clearIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDmvOiL1fJYW9sM_dw1zw-zijtcV4Crb0k",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "opiumlatam.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "opiumlatam",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "opiumlatam.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "572727555725",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:572727555725:web:2ff18230345838002754c4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);

// Initialize services
export { db };
export const storage = getStorage(app);
export const auth = getAuth(app);

// App Check disabled temporarily due to errors
// TODO: Re-enable when properly configured
// if (typeof window !== 'undefined') {
//   const { initializeAppCheck, ReCaptchaV3Provider } = await import('firebase/app-check');
//   initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider(
//       process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Lfqe3MsAAAAAFylkrCtNvEQm3hWnHozbMi6OFZq'
//     ),
//     isTokenAutoRefresh: true
//   });
// }

export default app;
