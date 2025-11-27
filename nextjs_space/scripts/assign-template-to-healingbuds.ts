import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Assigning template to HealingBuds tenant...');
  
  // Find the healing-buds-video template
  const template = await prisma.template.findUnique({
    where: { slug: 'healing-buds-video' }
  });

  if (!template) {
    console.error('❌ Template not found');
    return;
  }

  console.log(`🎪 Found template: ${template.name}`);

  // Find the HealingBuds tenant
  const tenant = await prisma.tenant.findUnique({
    where: { subdomain: 'healingbuds' }
  });

  if (!tenant) {
    console.error('❌ Tenant not found');
    return;
  }

  console.log(`🏪 Found tenant: ${tenant.businessName}`);

  // Assign template to tenant
  await prisma.tenant.update({
    where: { id: tenant.id },
    data: { templateId: template.id }
  });

  console.log(`✅ Assigned template "${template.name}" to tenant "${tenant.businessName}"`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
