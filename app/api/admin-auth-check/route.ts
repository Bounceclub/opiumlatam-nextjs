import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';

export async function GET() {
  try {
    const user = auth.currentUser;

    console.log('🔍 Admin Auth Check...');
    console.log('👤 Current user:', user ? {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      isAuthenticated: !!user,
      isAdmin: user?.email === 'latamopium@gmail.com'
    } : 'No user authenticated');

    if (!user) {
      return NextResponse.json({
        success: false,
        authenticated: false,
        message: 'No user authenticated',
        advice: 'Please login in the admin panel at /admin'
      });
    }

    if (user.email !== 'latamopium@gmail.com') {
      return NextResponse.json({
        success: false,
        authenticated: true,
        isAdmin: false,
        email: user.email,
        message: 'User is not admin',
        advice: 'Please login with latamopium@gmail.com'
      });
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      isAdmin: true,
      email: user.email,
      uid: user.uid,
      emailVerified: user.emailVerified,
      message: 'User is authenticated and is admin - can create articles'
    });

  } catch (error) {
    console.error('❌ Auth check error:', error);
    return NextResponse.json({
      success: false,
      error: 'Error checking auth status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}