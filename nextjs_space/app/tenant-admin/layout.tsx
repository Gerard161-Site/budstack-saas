import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/db';
import { getTenantUrl } from '@/lib/tenant';

export default async function TenantAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== 'TENANT_ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    redirect('/auth/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { tenant: true },
  });

  if (!user?.tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Tenant Associated</h1>
          <p className="text-gray-600 mb-4">Your account is not associated with any tenant.</p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const tenant = user.tenant;
  const tenantUrl = getTenantUrl(tenant);

  return (
    <div className="min-h-screen bg-white text-slate-900 theme-force-light relative font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{tenant.businessName}</h1>
              <p className="text-slate-500 mt-1 font-medium italic">Store Management Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href={tenantUrl} target="_blank">
                <Button variant="outline" className="border-slate-300 hover:bg-slate-50 text-slate-900">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Store
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-slate-50/50 min-h-[calc(100vh-116px)]">
        {children}
      </div>
    </div>
  );
}
