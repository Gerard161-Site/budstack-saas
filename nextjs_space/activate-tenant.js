require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Activating portugalbuds tenant...');
  
  const updated = await prisma.tenant.update({
    where: { subdomain: 'portugalbuds' },
    data: { isActive: true }
  });
  
  console.log('✅ Tenant activated successfully!');
  console.log('Subdomain:', updated.subdomain);
  console.log('isActive:', updated.isActive);
}

main().finally(() => prisma.$disconnect());
