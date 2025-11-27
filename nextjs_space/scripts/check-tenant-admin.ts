import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkTenantAdmin() {
  try {
    // Find all tenant admin users
    const tenantAdmins = await prisma.user.findMany({
      where: {
        role: 'TENANT_ADMIN'
      },
      include: {
        tenant: true
      }
    });
    
    console.log('\n📋 Tenant Admin Users:\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (tenantAdmins.length === 0) {
      console.log('❌ No tenant admin users found');
    } else {
      tenantAdmins.forEach((admin, index) => {
        console.log(`\n${index + 1}. Email: ${admin.email}`);
        console.log(`   Name: ${admin.name || 'N/A'}`);
        console.log(`   Tenant ID: ${admin.tenantId || '❌ NOT SET'}`);
        if (admin.tenant) {
          console.log(`   Tenant Name: ${admin.tenant.businessName}`);
          console.log(`   Tenant Subdomain: ${admin.tenant.subdomain}`);
        } else {
          console.log(`   ❌ NO TENANT ASSOCIATED`);
        }
      });
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (error: any) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkTenantAdmin();
