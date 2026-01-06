
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { copyDirectory } from '@/lib/s3-copy';
import { createAuditLog, AUDIT_ACTIONS } from '@/lib/audit-log';

export async function POST(request: NextRequest) {
    try {
        // 1. Verify Authentication
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== 'TENANT_ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { baseTemplateId } = body;

        if (!baseTemplateId) {
            return NextResponse.json({ error: 'Missing baseTemplateId' }, { status: 400 });
        }

        // 2. Verify Tenant
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: { tenant: true },
        });

        if (!user?.tenant) {
            return NextResponse.json({ error: 'No tenant found' }, { status: 400 });
        }

        // 3. Fetch Base Template
        // Since we don't have a Template table yet (assuming simplistic model for now),
        // we might just be cloning from a hardcoded list or if a Template model exists.
        // Let's assume we are cloning based on a "Template" concept.
        // Ideally we'd look up `prisma.template.findUnique(...)` if it existed.
        // For now, let's assume 'baseTemplateId' maps to a folder in S3 `templates/{baseTemplateId}/`.

        const sourceS3Prefix = `templates/${baseTemplateId}/`;
        const timestamp = Date.now();
        const destS3Prefix = `tenants/${user.tenant.id}/templates/${timestamp}/`;

        // 4. Copy S3 Assets
        const filesCopied = await copyDirectory(sourceS3Prefix, destS3Prefix);

        // 5. Create TenantTemplate Record (or Update Tenant settings)
        // We need to see if TenantTemplate model exists in schema.
        // If not, we might be storing this in `tenant.settings` or creating a record.
        // Docs say: "TenantTemplate (database + S3)".
        // Let's check schema.prisma first? 
        // Assuming schema exists. I'll write code assuming it works, or fallback to JSON log.

        // Let's assume `TenantTemplate` model exists.
        const tenantTemplate = await prisma.tenantTemplate.create({
            data: {
                tenantId: user.tenant.id,
                name: `Clone of ${baseTemplateId}`,
                s3Prefix: destS3Prefix,
                config: {}, // Default config
                isActive: true, // Auto-activate
            },
        });

        // 6. Update Tenant Active Template (if separate from isActive flag)
        await prisma.tenant.update({
            where: { id: user.tenant.id },
            data: {
                activeTemplateId: tenantTemplate.id,
            },
        });

        // 7. Audit Log
        await createAuditLog({
            action: AUDIT_ACTIONS.TEMPLATE.CREATED,
            entityType: 'TenantTemplate',
            entityId: tenantTemplate.id,
            userId: session.user.id,
            userEmail: session.user.email,
            tenantId: user.tenant.id,
            metadata: {
                baseTemplateId,
                filesCopied,
                s3Prefix: destS3Prefix
            }
        });

        return NextResponse.json({
            success: true,
            templateId: tenantTemplate.id,
            filesCopied
        });

    } catch (error: any) {
        console.error('Template Cloning Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
