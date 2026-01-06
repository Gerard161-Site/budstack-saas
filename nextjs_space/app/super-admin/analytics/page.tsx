'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format, subDays, startOfDay, eachDayOfInterval } from 'date-fns';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Store } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface AnalyticsData {
  totalTenants: number;
  activeTenants: number;
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  recentTenants: number;
  recentUsers: number;
  recentOrders: number;
  totalRevenue: number;
  recentRevenue: number;
  topTenants: any[];
  revenueByDay: any[];
  ordersByDay: any[];
  revenueByTenant: any[];
  customerGrowth: any[];
}

export default function AnalyticsPage() {
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const status = sessionResult?.status;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    if (status === 'authenticated' && session?.user?.role !== 'SUPER_ADMIN') {
      router.push('/auth/login');
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchAnalytics();
    }
  }, [session, timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/super-admin/analytics?timeRange=${timeRange}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center theme-force-light">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!session || !analytics) {
    return null;
  }

  const revenueGrowth = analytics.recentRevenue > 0
    ? ((analytics.recentRevenue / (analytics.totalRevenue - analytics.recentRevenue || 1)) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-gray-50 theme-force-light">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/super-admin">
            <Button variant="ghost" className="mb-2">← Back to Dashboard</Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
              <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={timeRange === '7d' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange('7d')}
              >
                7 Days
              </Button>
              <Button
                variant={timeRange === '30d' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange('30d')}
              >
                30 Days
              </Button>
              <Button
                variant={timeRange === '90d' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange('90d')}
              >
                90 Days
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Key Metrics */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Total Revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">€{analytics.totalRevenue.toFixed(2)}</div>
                <div className="flex items-center gap-1 text-sm mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">+€{analytics.recentRevenue.toFixed(2)}</span>
                  <span className="text-gray-500">this period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Total Orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{analytics.totalOrders}</div>
                <p className="text-xs text-green-600 mt-1">+{analytics.recentOrders} this period</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Total Customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{analytics.totalUsers}</div>
                <p className="text-xs text-green-600 mt-1">+{analytics.recentUsers} this period</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  Active Stores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{analytics.activeTenants}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  of {analytics.totalTenants} total
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Revenue & Orders Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Daily revenue over the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.revenueByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: any) => `€${value.toFixed(2)}`}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Volume</CardTitle>
              <CardDescription>Daily orders over the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.ordersByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip labelFormatter={(label) => `Date: ${label}`} />
                  <Bar dataKey="orders" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Revenue by Tenant & Customer Growth */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Store</CardTitle>
              <CardDescription>Distribution of revenue across stores</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.revenueByTenant}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: €${entry.value.toFixed(0)}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.revenueByTenant.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `€${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
              <CardDescription>New customer registrations over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.customerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip labelFormatter={(label) => `Date: ${label}`} />
                  <Line
                    type="monotone"
                    dataKey="customers"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Stores */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Stores</CardTitle>
            <CardDescription>Stores ranked by order volume and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topTenants.map((tenant: any, index: number) => (
                <div key={tenant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center font-bold text-white text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{tenant.businessName}</p>
                      <p className="text-sm text-gray-500">{tenant.subdomain}.budstack.to</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      €{tenant._sum?.total?.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-sm text-gray-500">{tenant._count?.orders || 0} orders</p>
                  </div>
                </div>
              ))}
              {analytics.topTenants.length === 0 && (
                <p className="text-center text-gray-500 py-8">No data available yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
