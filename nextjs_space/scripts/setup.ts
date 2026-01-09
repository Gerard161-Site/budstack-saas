
import { seedTemplates } from './seed-templates';
import { seedCore } from './seed';
import { seedPosts } from './seed-posts';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Starting full database setup...');
    console.log('-----------------------------------');

    try {
        // 1. Seed Templates (must be first)
        console.log('\n📦 Step 1: Seeding Templates');
        await seedTemplates();

        // 2. Seed Core Data (Tenants, Users, Products)
        console.log('\n🏢 Step 2: Seeding Core Data (Tenants, Users, Products)');
        await seedCore();

        // 3. Seed Posts (Content)
        console.log('\n📝 Step 3: Seeding Posts/Content');
        await seedPosts();

        console.log('\n-----------------------------------');
        console.log('✅ Full setup complete! All data seeded successfully.');

    } catch (error) {
        console.error('\n❌ Setup failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}
