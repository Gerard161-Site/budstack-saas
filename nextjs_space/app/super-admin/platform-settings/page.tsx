
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import PlatformBrandingForm from './platform-branding-form';

export default async function PlatformSettingsPage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect('/auth/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (user?.role !== 'SUPER_ADMIN') {
    redirect('/dashboard');
  }

  // Get or create platform settings
  let settings = await prisma.platformSettings.findUnique({
    where: { id: 'platform' },
  });

  if (!settings) {
    settings = await prisma.platformSettings.create({
      data: { id: 'platform' },
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 theme-force-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/super-admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Platform Branding</h1>
          <p className="text-gray-600 mt-2">Customize the look and feel of the main BudStack platform</p>
        </div>

        {/* Branding Form */}
        <PlatformBrandingForm settings={settings} />
      </div>
    </div>
  );
}
