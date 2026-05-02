import { NextResponse } from 'next/server';
import { seedArticles } from '@/lib/seed-articles';

export async function POST() {
  const result = await seedArticles();

  if (result.success) {
    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${result.count} articles`,
      count: result.count
    });
  } else {
    return NextResponse.json({
      success: false,
      error: result.error
    }, { status: 500 });
  }
}
