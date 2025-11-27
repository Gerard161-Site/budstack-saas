import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import BrandingForm from './branding-form';
import { TemplateSelector } from './template-selector';

export default async function BrandingPage() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    redirect('/auth/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { 
      tenant: {
        include: {
          template: true,
        },
      },
    },
  });

  if (!user?.tenant) {
    redirect('/dashboard');
  }

  // Fetch all available templates
  const templates = await prisma.template.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/tenant-admin">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Store Branding</h1>
        <p className="text-gray-600 mt-2">Customize the look and feel of your storefront</p>
      </div>

      {/* Template Selector */}
      <div className="mb-8">
        <TemplateSelector tenant={user.tenant} templates={templates} />
      </div>

      {/* Branding Form */}
      <BrandingForm tenant={user.tenant} />
    </div>
  );
}
