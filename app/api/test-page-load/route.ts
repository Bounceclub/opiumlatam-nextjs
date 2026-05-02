import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🔍 Testing page load...');

    // Test if the page is accessible
    console.log('📄 Test 1: Check if page is accessible');
    const pageResponse = await fetch('http://localhost:3000', {
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    });

    console.log(`✅ Page response: ${pageResponse.status}`);

    // Check if the page contains the expected content
    const pageContent = await pageResponse.text();
    const hasOpiumLatam = pageContent.includes('OpiumLATAM');
    const hasNoticias = pageContent.includes('Noticias');
    const hasHipHop = pageContent.includes('Hip-Hop');

    console.log(`📋 Page content analysis:`);
    console.log(`   - Contains "OpiumLATAM": ${hasOpiumLatam}`);
    console.log(`   - Contains "Noticias": ${hasNoticias}`);
    console.log(`   - Contains "Hip-Hop": ${hasHipHop}`);

    return NextResponse.json({
      success: true,
      pageStatus: pageResponse.status,
      contentAnalysis: {
        hasOpiumLatam,
        hasNoticias,
        hasHipHop
      },
      message: 'Page load test completed'
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