import { NextResponse } from 'next/server';
import { testFirebaseConnection } from '@/lib/test-firebase';

export async function GET() {
  const result = await testFirebaseConnection();

  if (result.success) {
    return NextResponse.json(result);
  } else {
    return NextResponse.json(result, { status: 500 });
  }
}
