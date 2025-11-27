
import { NextRequest, NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/doctor-green-api';

/**
 * GET /api/doctor-green/products?country=PT
 * Fetch products from Doctor Green API - API ONLY (no mock fallback)
 */
export async function GET(request: NextRequest) {
  try {
    // Get country code from query parameter (default to PT)
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') || 'PT';
    
    // Fetch from Doctor Green API with country code
    const products = await fetchProducts(country);
    
    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
      country: country,
      source: 'api',
    });
  } catch (error) {
    console.error('Doctor Green API Error:', error instanceof Error ? error.message : 'Unknown error');
    
    // Return error - NO MOCK FALLBACK (API ONLY)
    return NextResponse.json({
      success: false,
      error: `Doctor Green API unavailable: ${error instanceof Error ? error.message : 'Unknown error'}`,
      data: [],
      count: 0,
      source: 'api_error',
    }, { status: 500 });
  }
}
