'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ExternalLink, Building2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SearchInput, EmptyState } from '@/components/admin/shared';
import { useTableState } from '@/lib/admin/url-state';
import { getTenantUrl } from '@/lib/tenant-utils';

/**
 * Tenant data shape from Prisma query
 */
interface Tenant {
  id: string;
  businessName: string;
  subdomain: string;
  customDomain: string | null;
  nftTokenId: string | null;
  isActive: boolean;
  createdAt: Date;
  _count: {
    users: number;
    products: number;
    orders: number;
  };
}

interface TenantsTableProps {
  /** Array of tenant data from server */
  tenants: Tenant[];
}

/**
 * TenantsTable - Client component for displaying tenants with search functionality.
 *
 * Features:
 * - Debounced search across businessName, subdomain, customDomain, nftTokenId
 * - Case-insensitive filtering
 * - URL state persistence
 * - Empty state for no results
 */
export function TenantsTable({ tenants }: TenantsTableProps) {
  const [{ search }, { setSearch }] = useTableState();

  // Filter tenants based on search query
  const filteredTenants = useMemo(() => {
    if (!search.trim()) {
      return tenants;
    }

    const searchLower = search.toLowerCase().trim();

    return tenants.filter((tenant) => {
      const searchableFields = [
        tenant.businessName,
        tenant.subdomain,
        tenant.customDomain,
        tenant.nftTokenId,
      ];

      return searchableFields.some(
        (field) => field && field.toLowerCase().includes(searchLower)
      );
    });
  }, [tenants, search]);

  const activeCount = filteredTenants.filter((t) => t.isActive).length;
  const hasSearchQuery = search.trim().length > 0;
  const noResults = hasSearchQuery && filteredTenants.length === 0;

  return (
    <Card className="shadow-lg border-slate-200">
      <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-3">
            <span>
              {hasSearchQuery
                ? `Results (${filteredTenants.length})`
                : `All Tenants (${tenants.length})`}
            </span>
            <Badge variant="outline" className="text-sm font-normal">
              {activeCount} Active
            </Badge>
          </CardTitle>

          {/* Search Input */}
          <div className="w-full sm:w-72">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search tenants..."
              aria-label="Search tenants"
              debounceMs={300}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {noResults ? (
          <EmptyState
            icon={Search}
            heading="No tenants found"
            description={`No tenants match "${search}". Try a different search term.`}
            variant="muted"
            size="default"
            action={{
              label: 'Clear search',
              onClick: () => setSearch(''),
              variant: 'outline',
            }}
            className="my-8"
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="font-semibold">Business Name</TableHead>
                  <TableHead className="font-semibold">NFT Token ID</TableHead>
                  <TableHead className="font-semibold">Store URL</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-center">Users</TableHead>
                  <TableHead className="font-semibold text-center">Products</TableHead>
                  <TableHead className="font-semibold text-center">Orders</TableHead>
                  <TableHead className="font-semibold">Created</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-32">
                      <EmptyState
                        icon={Building2}
                        heading="No tenants yet"
                        description="Tenants will appear here once they complete onboarding."
                        size="sm"
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTenants.map((tenant) => {
                    const tenantUrl = getTenantUrl(tenant);
                    return (
                      <TableRow
                        key={tenant.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <TableCell className="font-medium text-slate-900">
                          {tenant.businessName}
                        </TableCell>
                        <TableCell className="text-slate-600 font-mono text-sm">
                          {tenant.nftTokenId || (
                            <span className="text-slate-400">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <a
                            href={tenantUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-600 hover:text-cyan-700 hover:underline flex items-center gap-1 transition-colors"
                          >
                            <span className="truncate max-w-[200px]">{tenantUrl}</span>
                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                          </a>
                        </TableCell>
                        <TableCell>
                          {tenant.isActive ? (
                            <Badge className="bg-emerald-500 hover:bg-emerald-600">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-slate-200">
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                            {tenant._count.users}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                            {tenant._count.products}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                            {tenant._count.orders}
                          </span>
                        </TableCell>
                        <TableCell className="text-slate-600 text-sm">
                          {format(new Date(tenant.createdAt), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <Link href={`/super-admin/tenants/${tenant.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300 transition-colors"
                            >
                              Manage
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
