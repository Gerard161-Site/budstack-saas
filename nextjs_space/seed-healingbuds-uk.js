const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding HealingBuds UK template...\n');

  // Check if template already exists
  const existing = await prisma.template.findUnique({
    where: { slug: 'healingbuds-uk' }
  });

  if (existing) {
    console.log('✅ Template "healingbuds-uk" already exists');
    console.log(`   ID: ${existing.id}`);
    console.log(`   Name: ${existing.name}`);
    console.log(`   Usage Count: ${existing.usageCount}\n`);
    return;
  }

  // Create the template
  const template = await prisma.template.create({
    data: {
      slug: 'healingbuds-uk',
      name: 'HealingBuds UK',
      description: 'A professional medical cannabis template designed specifically for UK market compliance, featuring MHRA-focused messaging, British color scheme, and regulatory-compliant content.',
      category: 'medical',
      tags: ['uk', 'medical', 'mhra', 'professional', 'british', 'healthcare'],
      version: '1.0.0',
      author: 'BudStack Team',
      isActive: true,
      isPremium: false,
      price: 0,
      layoutFilePath: '/templates/healingbuds-uk/index.tsx',
      componentsPath: '/templates/healingbuds-uk/components',
      stylesPath: '/templates/healingbuds-uk/styles.css',
      packagePath: null,
      previewUrl: '',
      thumbnailUrl: '',
      metadata: {
        features: [
          'UK market focused',
          'MHRA compliance messaging',
          'British color scheme (Blue, Red, Navy)',
          'Professional medical design',
          'Full responsive layout',
          'Video/Image hero support',
          'Multi-section homepage',
          'International presence showcase'
        ],
        customization: {
          colors: {
            primary: '#0F4C81',
            secondary: '#C8102E',
            accent: '#012169'
          },
          fonts: {
            base: 'Inter, system-ui, sans-serif',
            heading: 'Inter, system-ui, sans-serif'
          }
        },
        compatibility: {
          nextjs: '14.x',
          react: '18.x'
        },
        dependencies: ['framer-motion', 'lucide-react']
      }
    }
  });

  console.log('✅ Successfully created HealingBuds UK template!');
  console.log(`   ID: ${template.id}`);
  console.log(`   Slug: ${template.slug}`);
  console.log(`   Name: ${template.name}\n`);
}

main()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
