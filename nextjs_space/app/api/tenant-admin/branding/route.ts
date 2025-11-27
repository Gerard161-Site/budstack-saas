
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { uploadFile } from '@/lib/s3';
import { TenantSettings } from '@/lib/types';

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'TENANT_ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { tenant: true },
    });

    if (!user?.tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    const formData = await req.formData();

    // Extract business name and settings JSON
    const businessName = formData.get('businessName') as string;
    const settingsJSON = formData.get('settings') as string;
    
    if (!settingsJSON) {
      return NextResponse.json({ error: 'Settings data is required' }, { status: 400 });
    }

    const settings: TenantSettings = JSON.parse(settingsJSON);

    // Handle file uploads
    const logo = formData.get('logo') as File;
    if (logo && logo.size > 0) {
      const buffer = Buffer.from(await logo.arrayBuffer());
      const fileName = `logo-${Date.now()}-${logo.name}`;
      settings.logoPath = await uploadFile(buffer, fileName);
    }

    const heroImage = formData.get('heroImage') as File;
    if (heroImage && heroImage.size > 0) {
      const buffer = Buffer.from(await heroImage.arrayBuffer());
      const fileName = `hero-${Date.now()}-${heroImage.name}`;
      settings.heroImagePath = await uploadFile(buffer, fileName);
    }

    const favicon = formData.get('favicon') as File;
    if (favicon && favicon.size > 0) {
      const buffer = Buffer.from(await favicon.arrayBuffer());
      const fileName = `favicon-${Date.now()}-${favicon.name}`;
      settings.faviconPath = await uploadFile(buffer, fileName);
    }

    // Update tenant
    await prisma.tenant.update({
      where: { id: user.tenant.id },
      data: {
        businessName,
        settings: settings as any, // Cast to any for Prisma JSON field
      },
    });

    return NextResponse.json({ success: true, message: 'Branding updated successfully' });
  } catch (error) {
    console.error('Error updating branding:', error);
    return NextResponse.json(
      { error: 'Failed to update branding', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Keep POST for backwards compatibility
export async function POST(req: NextRequest) {
  return PUT(req);
}
