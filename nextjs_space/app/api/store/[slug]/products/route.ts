
import { NextRequest, NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/doctor-green-api';
import { getTenantBySlug } from '@/lib/tenant';

/**
 * GET /api/store/[slug]/products
 * Fetch products for a specific tenant's country
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');
    
    // Get tenant by slug
    const tenant = await getTenantBySlug(slug);
    
    if (!tenant) {
      return NextResponse.json({
        success: false,
        error: 'Tenant not found',
        data: [],
        count: 0,
      }, { status: 404 });
    }
    
    // Get country code from tenant (default to PT if not set)
    const country = tenant.countryCode || 'PT';
    
    // Fetch from Doctor Green API with tenant's country code
    const products = await fetchProducts(country);
    
    // If product ID is provided, return single product with similar products
    if (productId) {
      const product = products.find(p => p.id === productId);
      
      if (!product) {
        return NextResponse.json({
          success: false,
          error: 'Product not found',
          data: null,
        }, { status: 404 });
      }
      
      // Find similar products (same type, excluding current product)
      const similarProducts = products
        .filter(p => 
          p.id !== productId && 
          p.type === product.type &&
          p.isAvailable
        )
        .slice(0, 4); // Limit to 4 similar products
      
      return NextResponse.json({
        success: true,
        data: product,
        similarProducts: similarProducts,
        country: country,
        tenant: {
          businessName: tenant.businessName,
          subdomain: tenant.subdomain,
        },
        source: 'api',
      });
    }
    
    // Return all products
    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
      country: country,
      tenant: {
        businessName: tenant.businessName,
        subdomain: tenant.subdomain,
      },
      source: 'api',
    });
  } catch (error) {
    console.error('Doctor Green API Error:', error instanceof Error ? error.message : 'Unknown error');
    
    // Return error - NO MOCK FALLBACK (API ONLY)
    return NextResponse.json({
      success: false,
      error: `Failed to fetch products: ${error instanceof Error ? error.message : 'Unknown error'}`,
      data: [],
      count: 0,
      source: 'api_error',
    }, { status: 500 });
  }
}
