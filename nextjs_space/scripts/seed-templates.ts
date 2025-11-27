import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedTemplates() {
  console.log('🌱 Seeding templates...');

  const templates = [
    {
      name: 'Modern Minimal',
      slug: 'modern-minimal',
      description: 'Clean, product-focused design with bold typography and ample whitespace. Perfect for established brands seeking a professional, contemporary look.',
      category: 'modern',
      version: '1.0.0',
      author: 'BudStack Design Team',
      tags: ['minimal', 'clean', 'professional', 'product-focused', 'bold-typography'],
      layoutFilePath: 'templates/modern-minimal/layout.tsx',
      metadata: {
        compatibility: {
          platform_version: '1.0+',
          requires_features: ['hero-image', 'consultation-booking'],
        },
        customization_options: {
          layout_variants: ['centered', 'split'],
          hero_styles: ['full-bleed', 'contained'],
          section_order: true,
        },
        seo_optimized: true,
        performance_score: 95,
        accessibility_score: 100,
      },
      isActive: true,
      isPremium: false,
    },
    {
      name: 'Medical Professional',
      slug: 'medical-professional',
      description: 'Trust-focused, clinical design emphasizing medical authority, certifications, and regulatory compliance. Perfect for doctor-led practices.',
      category: 'medical',
      version: '1.0.0',
      author: 'BudStack Design Team',
      tags: ['medical', 'clinical', 'professional', 'trust', 'authority'],
      layoutFilePath: 'templates/medical-professional/layout.tsx',
      metadata: {
        compatibility: {
          platform_version: '1.0+',
          requires_features: ['hero-image', 'consultation-booking', 'doctor-profiles'],
        },
        customization_options: {
          layout_variants: ['clinical', 'traditional'],
          hero_styles: ['split-screen', 'traditional'],
          section_order: true,
        },
        seo_optimized: true,
        performance_score: 94,
        accessibility_score: 100,
      },
      isActive: true,
      isPremium: false,
    },
    {
      name: 'Wellness & Nature',
      slug: 'wellness-nature',
      description: 'Organic, calming design with natural imagery and holistic wellness focus. Perfect for wellness-focused brands and alternative medicine practices.',
      category: 'wellness',
      version: '1.0.0',
      author: 'BudStack Design Team',
      tags: ['wellness', 'nature', 'organic', 'holistic', 'calming'],
      layoutFilePath: 'templates/wellness-nature/layout.tsx',
      metadata: {
        compatibility: {
          platform_version: '1.0+',
          requires_features: ['hero-image', 'consultation-booking'],
        },
        customization_options: {
          layout_variants: ['organic', 'flowing'],
          hero_styles: ['nature', 'calming'],
          section_order: true,
        },
        seo_optimized: true,
        performance_score: 93,
        accessibility_score: 100,
      },
      isActive: true,
      isPremium: false,
    },
  ];

  for (const template of templates) {
    const existing = await prisma.template.findUnique({
      where: { slug: template.slug },
    });

    if (existing) {
      console.log(`  ✓ Template "${template.name}" already exists, updating...`);
      await prisma.template.update({
        where: { slug: template.slug },
        data: template,
      });
    } else {
      console.log(`  + Creating template "${template.name}"...`);
      await prisma.template.create({
        data: template,
      });
    }
  }

  console.log('✅ Templates seeded successfully!\n');
}

seedTemplates()
  .catch((error) => {
    console.error('❌ Error seeding templates:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
