'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Users, Search, Mail, Phone, Calendar, ShoppingBag } from 'lucide-react';
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

/**
 * Customer data shape from Prisma query
 */
export interface Customer {
  id: string;
  email: string;
  name: string | null;
  phone?: string | null;
  createdAt: Date;
  _count: {
    orders: number;
  };
}

interface CustomersTableProps {
  /** Array of customer data from server */
  customers: Customer[];
}

/**
 * CustomersTable - Client component for displaying customers with search functionality.
 *
 * Features:
 * - Debounced search across name (firstName/lastName), email, phone
 * - Case-insensitive filtering
 * - URL state persistence (?search=value)
 * - Empty state for no results with clear action
 */
export function CustomersTable({ customers }: CustomersTableProps) {
  const [{ search }, { setSearch }] = useTableState();

  // Filter customers based on search query
  const filteredCustomers = useMemo(() => {
    if (!search.trim()) {
      return customers;
    }

    const searchLower = search.toLowerCase().trim();

    return customers.filter((customer) => {
      // Search across name, email, phone
      const searchableFields = [
        customer.name,
        customer.email,
        customer.phone,
      ];

      return searchableFields.some(
        (field) => field && field.toLowerCase().includes(searchLower)
      );
    });
  }, [customers, search]);

  const hasSearchQuery = search.trim().length > 0;
  const noResults = hasSearchQuery && filteredCustomers.length === 0;

  // Build description for empty state
  const emptyDescription = useMemo(() => {
    if (hasSearchQuery) {
      return `No customers found matching "${search}". Try a different search term.`;
    }
    return 'No customers yet. Share your store URL to get started.';
  }, [hasSearchQuery, search]);

  // Clear search handler
  const handleClearSearch = () => {
    setSearch('');
  };

  // Get initials for avatar
  const getInitials = (name: string | null): string => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <Card className="shadow-lg border-slate-200">
      <CardHeader className="border-b bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-slate-900">
            <span>
              {hasSearchQuery
                ? `Results (${filteredCustomers.length})`
                : `All Customers (${customers.length})`}
            </span>
            <Badge variant="outline" className="text-sm font-normal bg-white/60">
              {customers.length} Total
            </Badge>
          </CardTitle>

          {/* Search Input */}
          <div className="w-full sm:w-72">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search customers..."
              aria-label="Search customers"
              debounceMs={300}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {noResults ? (
          <EmptyState
            icon={Search}
            heading="No customers found"
            description={emptyDescription}
            variant="muted"
            size="default"
            action={{
              label: 'Clear search',
              onClick: handleClearSearch,
              variant: 'outline',
            }}
            className="my-8"
          />
        ) : filteredCustomers.length === 0 ? (
          <EmptyState
            icon={Users}
            heading="No customers yet"
            description="Share your store URL to get started"
            size="default"
            className="my-8"
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      Email
                    </span>
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    <span className="flex items-center justify-center gap-1.5">
                      <ShoppingBag className="h-3.5 w-3.5 text-slate-400" />
                      Orders
                    </span>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      Joined
                    </span>
                  </TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {/* Avatar with initials */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-medium text-sm shadow-sm group-hover:shadow-md transition-shadow">
                          {getInitials(customer.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 truncate">
                            {customer.name || 'N/A'}
                          </p>
                          {customer.phone && (
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {customer.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      <a
                        href={`mailto:${customer.email}`}
                        className="hover:text-cyan-600 hover:underline transition-colors"
                      >
                        {customer.email}
                      </a>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                        {customer._count.orders}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">
                      {format(new Date(customer.createdAt), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Link href={`/tenant-admin/customers/${customer.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300 transition-colors"
                        >
                          View Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
