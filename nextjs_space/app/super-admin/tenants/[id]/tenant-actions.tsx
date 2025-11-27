
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TenantActionsProps {
  tenant: {
    id: string;
    isActive: boolean;
  };
}

export default function TenantActions({ tenant }: TenantActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const toggleTenantStatus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/super-admin/tenants/${tenant.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !tenant.isActive }),
      });

      if (!res.ok) throw new Error('Failed to update tenant');

      toast.success(`Tenant ${tenant.isActive ? 'deactivated' : 'activated'} successfully`);
      router.refresh();
    } catch (error) {
      toast.error('Failed to update tenant status');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        variant={tenant.isActive ? 'destructive' : 'default'}
        className="w-full"
        onClick={toggleTenantStatus}
        disabled={isLoading}
      >
        {tenant.isActive ? 'Deactivate Tenant' : 'Activate Tenant'}
      </Button>
    </div>
  );
}
