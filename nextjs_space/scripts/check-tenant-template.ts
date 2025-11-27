import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.findUnique({
    where: { subdomain: 'healingbuds' },
    include: { template: true }
  });

  console.log('\n=== TENANT DATA ===');
  console.log('Business Name:', tenant?.businessName);
  console.log('Subdomain:', tenant?.subdomain);
  console.log('Template ID:', tenant?.templateId);
  console.log('Template:', tenant?.template?.name);
  console.log('Template Slug:', tenant?.template?.slug);
  console.log('\n=== SETTINGS ===');
  console.log(JSON.stringify(tenant?.settings, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
