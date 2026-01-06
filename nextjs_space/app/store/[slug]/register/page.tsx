'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClientOnboarding } from '@/components/shop/ClientOnboarding';

export default function ShopRegisterPage() {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || status === 'loading') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--tenant-color-background)' }}
      >
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: 'var(--tenant-color-primary)' }} />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div 
        className="min-h-screen pb-24 lg:pb-0 flex items-center justify-center"
        style={{ backgroundColor: 'var(--tenant-color-background)' }}
      >
        <div className="max-w-md mx-auto text-center py-20 px-4">
          <h1 
            className="text-2xl font-bold mb-4"
            style={{ color: 'var(--tenant-color-heading)', fontFamily: 'var(--tenant-font-heading)' }}
          >
            Sign In Required
          </h1>
          <p 
            className="mb-6"
            style={{ color: 'var(--tenant-color-text)', fontFamily: 'var(--tenant-font-base)' }}
          >
            Please sign in or create an account to register as a medical cannabis patient.
          </p>
          <Button asChild>
            <Link href="/auth/login">
              Sign In / Create Account
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen pb-24 lg:pb-0"
      style={{ backgroundColor: 'var(--tenant-color-background)' }}
    >
      <main className="pt-28 md:pt-32">
        <ClientOnboarding />
      </main>
    </div>
  );
}
