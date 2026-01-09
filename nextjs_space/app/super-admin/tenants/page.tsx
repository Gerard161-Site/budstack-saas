
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/db';
import { TenantsTable } from './tenants-table';

export default async function TenantsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'SUPER_ADMIN') {
    redirect('/auth/login');
  }

  const tenants = await prisma.tenants.findMany({
    include: {
      _count: {
        select: {
          users: true,
          products: true,
          orders: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tenant Management</h1>
            <p className="text-slate-600 mt-2">Manage all tenant accounts and NFT holders</p>
          </div>
          <Link href="/super-admin/onboarding">
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all">
              Review Applications
            </Button>
          </Link>
        </div>
      </div>

      {/* Tenants Table with Search */}
      <TenantsTable tenants={tenants} />
    </div>
  );
}
