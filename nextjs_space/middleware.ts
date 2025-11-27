
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - API routes that don't need tenant context
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';
  const pathname = url.pathname;
  
  // Extract subdomain or custom domain
  const currentHost = hostname.replace(/(:\d+)/, ''); // Remove port if present
  
  // Admin routes - always allow access without tenant context
  if (
    pathname.startsWith('/super-admin') ||
    pathname.startsWith('/api/super-admin') ||
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/api/onboarding') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/tenant-admin') ||
    pathname.startsWith('/api/tenant-admin')
  ) {
    return NextResponse.next();
  }

  // PRIORITY 1: Path-based routing /store/{tenantSlug} (PRIMARY METHOD)
  const storeMatch = pathname.match(/^\/store\/([^\/]+)/);
  if (storeMatch) {
    const tenantSlug = storeMatch[1];
    const response = NextResponse.next();
    response.headers.set('x-tenant-slug', tenantSlug);
    return response;
  }

  // PRIORITY 2: Subdomain-based routing (e.g., portugalbuds.budstack.to)
  // Only used when subdomain DNS is configured by Abacus.AI
  let subdomain = '';
  
  // Check if it's a budstack.to subdomain
  if (currentHost.endsWith('.budstack.to')) {
    subdomain = currentHost.replace('.budstack.to', '');
    
    // Exclude 'www' and root domain
    if (subdomain && subdomain !== 'www') {
      const response = NextResponse.next();
      response.headers.set('x-tenant-subdomain', subdomain);
      return response;
    }
  }

  // PRIORITY 3: Custom domain routing (e.g., customdomain.com)
  if (
    !currentHost.includes('localhost') &&
    !currentHost.includes('.abacusai.app') &&
    !currentHost.includes('budstack.to') &&
    !currentHost.startsWith('www.')
  ) {
    // For custom domains, pass the full hostname
    const response = NextResponse.next();
    response.headers.set('x-tenant-custom-domain', currentHost);
    return response;
  }

  // For .abacusai.app deployment URLs, show platform landing page
  if (
    currentHost === 'localhost' ||
    currentHost.startsWith('localhost:') ||
    currentHost === 'healingbuds.abacusai.app' ||
    currentHost.endsWith('.abacusai.app') ||
    currentHost === 'budstack.to' ||
    currentHost === 'www.budstack.to'
  ) {
    // No tenant context for platform pages
    return NextResponse.next();
  }

  // Default: no tenant context
  return NextResponse.next();
}
