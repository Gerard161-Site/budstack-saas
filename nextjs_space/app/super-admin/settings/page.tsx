
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import SettingsForm from './settings-form';

export default async function PlatformSettingsConfigPage() {
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

    // Get or create platform config
    let config = await prisma.platformConfig.findUnique({
        where: { id: 'config' },
    });

    if (!config) {
        config = await prisma.platformConfig.create({
            data: { id: 'config' },
        });
    }

    // Mask sensitive fields before sending to client
    const maskedConfig = {
        ...config,
        awsAccessKeyId: config.awsAccessKeyId ? '********' : '',
        awsSecretAccessKey: config.awsSecretAccessKey ? '********' : '',
        emailServer: config.emailServer ? '********' : '',
        redisUrl: config.redisUrl ? '********' : '',
    };

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
                    <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
                    <p className="text-gray-600 mt-2">Manage environment variables and system configuration</p>
                </div>

                {/* Settings Form */}
                <SettingsForm config={maskedConfig} />
            </div>
        </div>
    );
}
