import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🔍 Testing network connectivity...');

    // Test 1: Test Google connectivity
    console.log('🌐 Test 1: Testing Google connectivity...');
    const googleResponse = await fetch('https://www.google.com', {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000)
    });
    console.log(`✅ Google connectivity: ${googleResponse.status}`);

    // Test 2: Test Firebase connectivity
    console.log('🔥 Test 2: Testing Firebase connectivity...');
    const firebaseResponse = await fetch('https://firebase.google.com', {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000)
    });
    console.log(`✅ Firebase connectivity: ${firebaseResponse.status}`);

    // Test 3: Test Firestore API connectivity
    console.log('📊 Test 3: Testing Firestore API connectivity...');
    try {
      const firestoreResponse = await fetch('https://firestore.googleapis.com/v1/projects/opiumlatam/databases/(default)/documents', {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });
      console.log(`✅ Firestore API connectivity: ${firestoreResponse.status}`);
    } catch (error) {
      console.log(`❌ Firestore API error: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Test 4: Test environment variables
    console.log('🔧 Test 4: Checking environment variables...');
    const envVars = {
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Not set',
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Not set',
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Not set',
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? '✅ Set' : '❌ Not set',
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? '✅ Set' : '❌ Not set',
      NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '✅ Set' : '❌ Not set',
    };

    console.log('📋 Environment variables:', envVars);

    return NextResponse.json({
      success: true,
      connectivity: {
        google: googleResponse.status,
        firebase: firebaseResponse.status,
        firestore: 'Tested'
      },
      envVars: envVars,
      message: 'Network connectivity test completed'
    });

  } catch (error) {
    console.error('❌ Test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: String(error)
    }, { status: 500 });
  }
}