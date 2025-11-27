
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Package, Palette, Settings, ExternalLink, BarChart3, Shield, Webhook } from 'lucide-react';
import { prisma } from '@/lib/db';
import { getTenantUrl } from '@/lib/tenant';

export default async function TenantAdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.role !== 'TENANT_ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    redirect('/auth/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      tenant: {
        include: {
          _count: {
            select: {
              products: true,
              orders: true,
              users: true,
            },
          },
        },
      },
    },
  });

  if (!user?.tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Tenant Associated</h1>
          <p className="text-gray-600 mb-4">Your account is not associated with any tenant.</p>
          <p className="text-sm text-gray-500 mb-4">
            If you're a tenant admin, please contact support to link your account to a tenant.
          </p>
          <div className="space-x-4">
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline">Login Again</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tenant = user.tenant;
  
  // If user is logged in with a different account or needs to access via store URL
  // Provide a helpful message with the correct URL
  const tenantStoreUrl = getTenantUrl(tenant);
  const tenantUrl = getTenantUrl(tenant);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tenant Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Managing: <span className="font-semibold">{tenant.businessName}</span>
        </p>
        
        {/* Store URL Info */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ExternalLink className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">Your Store URL</p>
              <p className="text-xs text-blue-700">{tenantStoreUrl}</p>
            </div>
          </div>
          <Link href={tenantStoreUrl} target="_blank">
            <Button variant="outline" size="sm">
              Visit Store
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tenant._count.products}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tenant._count.orders}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tenant._count.users}</div>
              <p className="text-xs text-muted-foreground">Active users</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View store performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/tenant-admin/analytics">
                <Button className="w-full">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>Customize your store appearance</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/tenant-admin/branding">
                <Button className="w-full">
                  <Palette className="mr-2 h-4 w-4" />
                  Customize
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your product catalog</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/tenant-admin/products">
                <Button className="w-full">
                  <Package className="mr-2 h-4 w-4" />
                  Manage Products
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>View and manage orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/tenant-admin/orders">
                <Button className="w-full">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View Orders
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Store configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/tenant-admin/settings">
                <Button className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>View activity history</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/tenant-admin/audit-logs">
                <Button className="w-full">
                  <Shield className="mr-2 h-4 w-4" />
                  View Logs
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>Manage integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/tenant-admin/webhooks">
                <Button className="w-full">
                  <Webhook className="mr-2 h-4 w-4" />
                  Configure
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Store Info */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Store URL</p>
                  <a href={tenantUrl} target="_blank" rel="noopener noreferrer" className="text-base text-blue-600 hover:underline flex items-center gap-1">
                    {tenantUrl}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Custom Domain</p>
                  <p className="text-base">{tenant.customDomain || 'Not configured'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">NFT Token ID</p>
                  <p className="text-base">{tenant.nftTokenId || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="text-base">{tenant.isActive ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
