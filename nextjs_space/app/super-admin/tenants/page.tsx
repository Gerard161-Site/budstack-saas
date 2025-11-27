
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { prisma } from '@/lib/db';
import { format } from 'date-fns';
import { getTenantUrl } from '@/lib/tenant';
import { ExternalLink } from 'lucide-react';

export default async function TenantsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'SUPER_ADMIN') {
    redirect('/auth/login');
  }

  const tenants = await prisma.tenant.findMany({
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/super-admin">
                <Button variant="ghost" className="mb-2">← Back to Dashboard</Button>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Tenant Management</h1>
            </div>
            <Link href="/super-admin/onboarding">
              <Button>Review Applications</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>All Tenants ({tenants.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business Name</TableHead>
                  <TableHead>NFT Token ID</TableHead>
                  <TableHead>Store URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenants.map((tenant: any) => {
                  const tenantUrl = getTenantUrl(tenant);
                  return (
                    <TableRow key={tenant.id}>
                      <TableCell className="font-medium">{tenant.businessName}</TableCell>
                      <TableCell>{tenant.nftTokenId || 'N/A'}</TableCell>
                      <TableCell>
                        <a 
                          href={tenantUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <span className="truncate max-w-[200px]">{tenantUrl}</span>
                          <ExternalLink className="h-3 w-3 flex-shrink-0" />
                        </a>
                      </TableCell>
                      <TableCell>
                        {tenant.isActive ? (
                          <Badge variant="default" className="bg-green-500">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell>{tenant._count.users}</TableCell>
                      <TableCell>{tenant._count.products}</TableCell>
                      <TableCell>{tenant._count.orders}</TableCell>
                      <TableCell>{format(new Date(tenant.createdAt), 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <Link href={`/super-admin/tenants/${tenant.id}`}>
                          <Button variant="outline" size="sm">Manage</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
