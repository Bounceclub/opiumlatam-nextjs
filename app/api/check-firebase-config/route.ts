import { NextResponse } from 'next/server';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export async function GET() {
  try {
    console.log('🔍 Checking Firebase configuration...');

    // Check environment variables
    const envVars = {
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    console.log('📋 Environment variables:', envVars);

    // Check Firebase initialization
    const apps = getApps();
    console.log(`📱 Firebase apps initialized: ${apps.length}`);

    if (apps.length > 0) {
      const app = getApp();
      console.log(`📱 App name: ${app.name}`);
      console.log(`📱 App options:`, app.options);
    }

    // Test Firestore initialization
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDmvOiL1fJYW9sM_dw1zw-zijtcV4Crb0k",
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "opiumlatam.firebaseapp.com",
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "opiumlatam",
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "opiumlatam.firebasestorage.app",
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "572727555725",
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:572727555725:web:2ff18230345838002754c4"
    };

    console.log('🔧 Firebase config:', firebaseConfig);

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const db = getFirestore(app);

    console.log('✅ Firestore initialized');

    return NextResponse.json({
      success: true,
      envVars,
      appsInitialized: apps.length,
      firebaseConfig,
      message: 'Firebase configuration checked successfully'
    });

  } catch (error) {
    console.error('❌ Configuration check error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: String(error)
    }, { status: 500 });
  }
}