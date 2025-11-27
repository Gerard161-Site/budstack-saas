'use client';

import { useState } from 'react';
import { Tenant, Template } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Check, Sparkles, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface TemplateSelectorProps {
  tenant: Tenant & { template?: Template | null };
  templates: Template[];
}

export function TemplateSelector({ tenant, templates }: TemplateSelectorProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(tenant.templateId || null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingTemplateId, setPendingTemplateId] = useState<string | null>(null);

  const handleTemplateClick = (templateId: string) => {
    // If it's the same template, no need to confirm
    if (templateId === selectedTemplateId) {
      return;
    }

    // Show confirmation dialog
    setPendingTemplateId(templateId);
    setShowConfirmDialog(true);
  };

  const handleConfirmTemplateChange = async () => {
    if (!pendingTemplateId) return;

    setIsUpdating(true);
    setShowConfirmDialog(false);
    
    try {
      const response = await fetch('/api/tenant-admin/select-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: pendingTemplateId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update template');
      }

      setSelectedTemplateId(pendingTemplateId);
      toast.success(data.message || 'Template applied successfully!');
      
      // Reload to see changes
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error('Error updating template:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update template');
    } finally {
      setIsUpdating(false);
      setPendingTemplateId(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Home Page Template
        </CardTitle>
        <CardDescription>
          Choose a design template for your store's home page. Colors and fonts will adapt to your brand settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => {
            const isSelected = selectedTemplateId === template.id;
            
            return (
              <div
                key={template.id}
                className={`relative border-2 rounded-lg p-4 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
                onClick={() => !isUpdating && handleTemplateClick(template.id)}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}

                <div className="mb-3">
                  <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                  <Badge variant="outline">{template.category}</Badge>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {template.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  className="w-full"
                  disabled={isUpdating}
                >
                  {isSelected ? 'Selected' : 'Select Template'}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-900">
            <strong className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Important:
            </strong>
            Changing templates will reset all design settings (colors, fonts, spacing, etc.) to the new template's defaults. 
            Your uploaded logo and hero images will be preserved. You can customize the template after applying it.
          </p>
        </div>
      </CardContent>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Reset All Template Settings?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>
                Selecting a new template will <strong>reset all design customizations</strong> including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Colors (primary, secondary, accent)</li>
                <li>Fonts and typography</li>
                <li>Button styles and sizes</li>
                <li>Spacing and layout</li>
                <li>Content sections and text</li>
              </ul>
              <p className="text-amber-600 font-medium">
                ✓ Your uploaded logo and hero images will be preserved.
              </p>
              <p>
                You can customize the new template after it's applied.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingTemplateId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmTemplateChange}
              className="bg-green-600 hover:bg-green-700"
            >
              Apply Template & Reset Settings
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
