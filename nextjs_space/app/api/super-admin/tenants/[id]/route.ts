
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getNamecheapClient } from '@/lib/namecheap-api';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { isActive, namecheapUsername } = body;

    // Get tenant before update
    const existingTenant = await prisma.tenant.findUnique({
      where: { id: params.id },
    });

    if (!existingTenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    // If activating a tenant for the first time, create subdomain via Namecheap API
    if (isActive && !existingTenant.isActive && namecheapUsername) {
      try {
        const namecheap = getNamecheapClient(namecheapUsername);
        const subdomainCreated = await namecheap.createTenantSubdomain(existingTenant.subdomain);
        
        if (!subdomainCreated) {
          return NextResponse.json({ 
            error: 'Failed to create subdomain via Namecheap API. Please try again or create manually.',
            details: 'Namecheap API call failed'
          }, { status: 500 });
        }

        console.log(`✅ Created subdomain: ${existingTenant.subdomain}.budstack.to`);
      } catch (error) {
        console.error('Namecheap API error:', error);
        return NextResponse.json({ 
          error: 'Failed to create subdomain. Please check Namecheap API credentials and whitelisted IP.',
          details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
      }
    }

    // If deactivating, optionally delete the subdomain
    if (!isActive && existingTenant.isActive && namecheapUsername) {
      try {
        const namecheap = getNamecheapClient(namecheapUsername);
        await namecheap.deleteTenantSubdomain(existingTenant.subdomain);
        console.log(`🗑️ Deleted subdomain: ${existingTenant.subdomain}.budstack.to`);
      } catch (error) {
        console.error('Error deleting subdomain:', error);
        // Don't fail the whole request if subdomain deletion fails
      }
    }

    // Update tenant status
    const tenant = await prisma.tenant.update({
      where: { id: params.id },
      data: { isActive },
    });

    return NextResponse.json(tenant);
  } catch (error) {
    console.error('Error updating tenant:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete tenant (cascade will handle related records)
    await prisma.tenant.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tenant:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
