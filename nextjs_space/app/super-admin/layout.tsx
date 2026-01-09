import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { DashboardSidebar } from '@/components/admin/DashboardSidebar';

export default async function SuperAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'SUPER_ADMIN') {
        redirect('/auth/login');
    }

    return (
        <div className="flex h-screen bg-gray-50 theme-force-light">
            <DashboardSidebar
                userName={session.user.name || 'Super Admin'}
                userEmail={session.user.email || 'admin@budstack.io'}
            />
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
