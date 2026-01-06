
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { prisma } from '@/lib/db';
import { format } from 'date-fns';
import OnboardingActions from './onboarding-actions';

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'SUPER_ADMIN') {
    redirect('/auth/login');
  }

  // Get pending onboarding requests (inactive tenants)
  const pendingRequests = await prisma.tenant.findMany({
    where: { isActive: false },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-gray-50 theme-force-light">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/super-admin">
            <Button variant="ghost" className="mb-2">← Back to Dashboard</Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Onboarding Requests</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals ({pendingRequests.length})</CardTitle>
            <CardDescription>Review and approve new tenant applications</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingRequests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No pending onboarding requests</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>NFT Token ID</TableHead>
                    <TableHead>Subdomain</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests.map((request: any) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.businessName}</TableCell>
                      <TableCell>{request.nftTokenId || 'Not provided'}</TableCell>
                      <TableCell>{request.subdomain}</TableCell>
                      <TableCell>{format(new Date(request.createdAt), 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Pending</Badge>
                      </TableCell>
                      <TableCell>
                        <OnboardingActions tenantId={request.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
