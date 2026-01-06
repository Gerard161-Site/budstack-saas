import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import PostsList from './posts-list';

export const metadata = {
    title: 'The Wire Management',
};

export default async function TheWirePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/auth/login');
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { tenant: true },
    });

    if (!user?.tenant) {
        redirect('/tenant-admin');
    }

    const posts = await prisma.post.findMany({
        where: { tenantId: user.tenant.id },
        orderBy: { createdAt: 'desc' },
        include: { author: true },
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <div className="mb-2">
                        <Link href="/tenant-admin" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                            ← Back to Dashboard
                        </Link>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">The Wire</h1>
                    <p className="text-muted-foreground">Manage your news and articles.</p>
                </div>
                <Link href="/tenant-admin/the-wire/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Article
                    </Button>
                </Link>
            </div>

            <PostsList initialPosts={posts} />
        </div>
    );
}
