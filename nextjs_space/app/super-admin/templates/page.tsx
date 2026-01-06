import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UploadTemplateDialog } from './upload-dialog';
import { TemplateActions } from './template-actions';

export default async function TemplatesManagementPage() {
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

  // Fetch all templates
  const templates = await prisma.template.findMany({
    orderBy: { createdAt: 'desc' },
  });

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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Template Management</h1>
            <p className="text-gray-600 mt-2">Manage home page templates for tenants</p>
          </div>
          <UploadTemplateDialog />
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template: any) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={template.isActive ? 'default' : 'secondary'}>
                    {template.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge variant="outline">{template.category}</Badge>
                </div>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Metadata */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Version: {template.version}</div>
                    <div>Author: {template.author || 'Unknown'}</div>
                    <div>Used by: {template.usageCount} tenant(s)</div>
                    <div>Downloads: {template.downloadCount}</div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 4).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <TemplateActions
                      templateId={template.id}
                      templateName={template.name}
                      usageCount={template.usageCount}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {templates.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No templates found. Upload your first template to get started.</p>
            </CardContent>
          </Card>
        )}

        {/* Info Box */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="py-6">
            <h3 className="font-semibold text-blue-900 mb-2">Template System Information</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Templates are stored in <code>/templates</code> directory</li>
              <li>• Each template consists of index.tsx, components/, styles.css, template.config.json, and defaults.json</li>
              <li>• Templates automatically inherit tenant branding (colors, fonts, images)</li>
              <li>• Upload templates directly from GitHub repositories using the \"Upload New Template\" button</li>
              <li>• Templates can be deleted if they are not currently in use by any tenant</li>
              <li>• See TEMPLATE_DESIGN_GUIDE.md for template creation guidelines</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
