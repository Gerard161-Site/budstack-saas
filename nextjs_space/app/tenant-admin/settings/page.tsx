
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/db';
import SettingsForm from './settings-form';

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== 'TENANT_ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    redirect('/auth/login');
  }

  const user = await prisma.users.findUnique({
    where: { id: session.user.id },
    include: { tenants: true },
  });

  // Mask the secret key before passing to client
  if (user?.tenant?.drGreenSecretKey) {
    // Only indicate it exists, don't send value
    user.tenant.drGreenSecretKey = '********';
  }

  if (!user?.tenant) {
    redirect('/tenant-admin');
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Store Settings</h1>
        <p className="text-slate-600 mt-2">Configure your store preferences</p>
      </div>

      <div className="max-w-4xl">
        <SettingsForm tenant={user.tenant} />
      </div>
    </div>
  );
}
