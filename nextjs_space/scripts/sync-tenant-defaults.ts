import { PrismaClient } from '@prisma/client';
import * as fs from 'fs/promises';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
    const subdomain = process.argv[2] || 'healingbuds';

    console.log(`--- SYNCING SETTINGS FOR [${subdomain}] ---`);

    const tenant = await prisma.tenant.findUnique({
        where: { subdomain },
        include: { template: true }
    });

    if (!tenant) {
        console.error(`Tenant [${subdomain}] not found`);
        return;
    }

    const templateSlug = tenant.template?.slug;
    if (!templateSlug) {
        console.error(`Template slug not found for tenant [${subdomain}]`);
        return;
    }

    const defaultsPath = path.join(process.cwd(), 'templates', templateSlug, 'defaults.json');

    try {
        const defaultsData = await fs.readFile(defaultsPath, 'utf-8');
        const defaults = JSON.parse(defaultsData);

        // Merge new design system settings into existing settings
        const currentSettings = (tenant.settings as any) || {};
        const updatedSettings = {
            ...currentSettings,
            designSystem: {
                ...(currentSettings.designSystem || {}),
                ...defaults.designSystem,
                colors: {
                    ...(currentSettings.designSystem?.colors || {}),
                    ...defaults.designSystem.colors
                }
            }
        };

        await prisma.tenant.update({
            where: { id: tenant.id },
            data: {
                settings: updatedSettings
            }
        });

        console.log(`✅ Updated settings for [${subdomain}] from [${templateSlug}/defaults.json]`);
    } catch (error) {
        console.error(`Error syncing settings: ${error}`);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
