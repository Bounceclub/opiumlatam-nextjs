import { NextRequest, NextResponse } from 'next/server';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const subscriberRef = doc(db, 'subscribers', email);
    const subscriberSnap = await getDoc(subscriberRef);

    if (subscriberSnap.exists()) {
      const data = subscriberSnap.data();
      if (data.active) {
        return NextResponse.json(
          { error: 'Ya estás suscrito' },
          { status: 400 }
        );
      }
    }

    // Subscribe
    await setDoc(subscriberRef, {
      email,
      active: true,
      date: serverTimestamp(),
      source: 'web',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { error: 'Error al suscribirse' },
      { status: 500 }
    );
  }
}
