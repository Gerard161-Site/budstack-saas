import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function exportData() {
  console.log('📦 Exporting existing data using raw SQL...');

  try {
    const blogPosts = await prisma.$queryRaw`SELECT * FROM blog_posts`;
    const faqs = await prisma.$queryRaw`SELECT * FROM faqs`;
    const medicalConditions = await prisma.$queryRaw`SELECT * FROM medical_conditions`;
    const products = await prisma.$queryRaw`SELECT * FROM products`;
    const testimonials = await prisma.$queryRaw`SELECT * FROM testimonials`;
    
    const data = {
      blogPosts,
      faqs,
      medicalConditions,
      products,
      testimonials,
    };

    fs.writeFileSync(
      'scripts/exported-data.json',
      JSON.stringify(data, null, 2)
    );

    console.log('✅ Data exported to scripts/exported-data.json');
    console.log(`  - ${(blogPosts as any[]).length} blog posts`);
    console.log(`  - ${(faqs as any[]).length} FAQs`);
    console.log(`  - ${(medicalConditions as any[]).length} medical conditions`);
    console.log(`  - ${(products as any[]).length} products`);
    console.log(`  - ${(testimonials as any[]).length} testimonials`);
  } catch (error) {
    console.error('Error exporting data:', error);
  }
}

exportData()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
