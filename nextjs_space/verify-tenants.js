require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tenants = await prisma.tenant.findMany({
    select: {
      subdomain: true,
      businessName: true,
      isActive: true,
      templateId: true,
      customDomain: true
    }
  });
  
  console.log('=== TENANT SUBDOMAINS FOR BUDSTACK.TO ===\n');
  
  tenants.forEach(t => {
    const status = t.isActive ? '✅ ACTIVE' : '❌ INACTIVE';
    const hasTemplate = t.templateId ? '🎨 Has Template' : '⚠️  No Template';
    const url = t.customDomain 
      ? `https://${t.customDomain}` 
      : `https://${t.subdomain}.budstack.to`;
    
    console.log(`${status} ${hasTemplate}`);
    console.log(`  Name: ${t.businessName}`);
    console.log(`  Subdomain: ${t.subdomain}`);
    console.log(`  URL: ${url}`);
    console.log('');
  });
  
  console.log('=== EXPECTED URLS ===');
  console.log('https://portugalbuds.budstack.to');
  console.log('https://healingbuds.budstack.to');
  console.log('https://cooleysbuds.budstack.to');
  console.log('https://gerrysbuds.budstack.to');
}

main().finally(() => prisma.$disconnect());
