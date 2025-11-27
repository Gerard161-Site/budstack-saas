require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const tenant = await prisma.tenant.findFirst({
      where: { subdomain: 'healingbuds' }
    });

    if (!tenant) {
      console.log('❌ Tenant not found');
      return;
    }

    const settings = tenant.settings || {};
    const updatedSettings = {
      ...settings,
      // Set to null so Navigation component handles scroll-aware logo selection
      logoPath: null,
    };

    await prisma.tenant.update({
      where: { id: tenant.id },
      data: { settings: updatedSettings }
    });

    console.log('✅ Set logoPath to null');
    console.log('Navigation will now handle scroll-aware logo selection:');
    console.log('  - White logo when at top (transparent header over video)');
    console.log('  - Dark logo when scrolled (white header background)');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
