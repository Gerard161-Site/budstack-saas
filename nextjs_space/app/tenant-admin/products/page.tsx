
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/db';

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== 'TENANT_ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    redirect('/auth/login');
  }

  const user = await prisma.users.findUnique({
    where: { id: session.user.id },
    include: {
      tenant: {
        include: {
          products: {
            orderBy: { createdAt: 'desc' },
          },
        },
      },
    },
  });

  if (!user?.tenant) {
    redirect('/tenant-admin');
  }

  const products = user.tenant.products;

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Product Management</h1>
            <p className="text-slate-600 mt-2">Manage your product catalog</p>
          </div>
          <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all">
            Sync from Dr Green Admin
          </Button>
        </div>
      </div>

      <Card className="shadow-lg border-slate-200">
        <CardHeader className="border-b bg-gradient-to-r from-emerald-50 to-teal-50">
          <CardTitle className="text-2xl font-bold text-slate-900">All Products ({products.length})</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">No products found</p>
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all">
                Sync Products from Dr Green Admin
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="font-semibold text-slate-700">Name</TableHead>
                  <TableHead className="font-semibold text-slate-700">Category</TableHead>
                  <TableHead className="font-semibold text-slate-700">THC %</TableHead>
                  <TableHead className="font-semibold text-slate-700">CBD %</TableHead>
                  <TableHead className="font-semibold text-slate-700">Price</TableHead>
                  <TableHead className="font-semibold text-slate-700">Stock</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product: any) => (
                  <TableRow key={product.id} className="border-slate-200">
                    <TableCell className="font-medium text-slate-900">{product.name}</TableCell>
                    <TableCell className="text-slate-700">{product.category}</TableCell>
                    <TableCell className="text-slate-700">{product.thcContent}%</TableCell>
                    <TableCell className="text-slate-700">{product.cbdContent}%</TableCell>
                    <TableCell className="text-slate-700">€{product.price}</TableCell>
                    <TableCell className="text-slate-700">{product.stock > 0 ? product.stock : 'Out of stock'}</TableCell>
                    <TableCell>
                      {product.stock > 0 ? (
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">In Stock</Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200">Out of Stock</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
