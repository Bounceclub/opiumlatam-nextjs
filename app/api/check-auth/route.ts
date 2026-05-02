import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';

export async function GET() {
  try {
    const user = auth.currentUser;

    console.log('🔍 Checking authentication status...');
    console.log('👤 User:', user ? {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerId: user.providerId,
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime
      }
    } : 'No user authenticated');

    if (!user) {
      return NextResponse.json({
        authenticated: false,
        message: 'No user authenticated',
        advice: 'Please login with latamopium@gmail.com in the admin panel'
      });
    }

    if (user.email !== 'latamopium@gmail.com') {
      return NextResponse.json({
        authenticated: true,
        isAdmin: false,
        email: user.email,
        message: 'User is not admin',
        advice: 'Please login with latamopium@gmail.com'
      });
    }

    return NextResponse.json({
      authenticated: true,
      isAdmin: true,
      email: user.email,
      uid: user.uid,
      emailVerified: user.emailVerified,
      message: 'User is authenticated and is admin'
    });

  } catch (error) {
    console.error('❌ Auth check error:', error);
    return NextResponse.json({
      error: 'Error checking auth status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}