import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🎨 Seeding Healing Buds Video Template...');

  // Check if template already exists
  const existing = await prisma.template.findUnique({
    where: { slug: 'healing-buds-video' }
  });

  if (existing) {
    console.log('✅ Template already exists, updating...');
    await prisma.template.update({
      where: { id: existing.id },
      data: {
        name: 'Healing Buds Video Hero',
        description: 'Immersive full-screen video hero with parallax scrolling, perfect for medical cannabis brands seeking a modern, premium aesthetic.',
        category: 'medical',
        tags: ['video', 'parallax', 'modern', 'medical', 'premium'],
        version: '1.0.0',
        author: 'Healing Buds Design Team',
        isActive: true,
        isPremium: false,
        price: 0,
        layoutFilePath: '/templates/healing-buds-video/index.tsx',
        componentsPath: '/templates/healing-buds-video/components',
        stylesPath: '/templates/healing-buds-video/styles.css',
        packagePath: '/templates/healing-buds-video',
        previewUrl: '/templates/healing-buds-video/preview.jpg',
        thumbnailUrl: '/templates/healing-buds-video/thumbnail.jpg',
        metadata: {
          features: {
            hero_video: true,
            parallax_scrolling: true,
            scroll_animations: true,
            dark_mode: false,
            multi_language: false
          },
          performance: {
            lighthouse_score: 92,
            bundle_size_kb: 145
          },
          accessibility: {
            wcag_level: 'AA',
            screen_reader_tested: true,
            keyboard_navigable: true
          },
          compatibility: {
            platform_version: '2.0+',
            nextjs_version: '14.x',
            react_version: '18.x',
            requires_features: ['hero-video', 'consultation-booking']
          }
        }
      }
    });
    console.log('✅ Template updated successfully');
  } else {
    const template = await prisma.template.create({
      data: {
        slug: 'healing-buds-video',
        name: 'Healing Buds Video Hero',
        description: 'Immersive full-screen video hero with parallax scrolling, perfect for medical cannabis brands seeking a modern, premium aesthetic.',
        category: 'medical',
        tags: ['video', 'parallax', 'modern', 'medical', 'premium'],
        version: '1.0.0',
        author: 'Healing Buds Design Team',
        isActive: true,
        isPremium: false,
        price: 0,
        layoutFilePath: '/templates/healing-buds-video/index.tsx',
        componentsPath: '/templates/healing-buds-video/components',
        stylesPath: '/templates/healing-buds-video/styles.css',
        packagePath: '/templates/healing-buds-video',
        previewUrl: '/templates/healing-buds-video/preview.jpg',
        thumbnailUrl: '/templates/healing-buds-video/thumbnail.jpg',
        metadata: {
          features: {
            hero_video: true,
            parallax_scrolling: true,
            scroll_animations: true,
            dark_mode: false,
            multi_language: false
          },
          performance: {
            lighthouse_score: 92,
            bundle_size_kb: 145
          },
          accessibility: {
            wcag_level: 'AA',
            screen_reader_tested: true,
            keyboard_navigable: true
          },
          compatibility: {
            platform_version: '2.0+',
            nextjs_version: '14.x',
            react_version: '18.x',
            requires_features: ['hero-video', 'consultation-booking']
          }
        }
      }
    });

    console.log(`✅ Created template: ${template.name} (ID: ${template.id})`);
  }

  console.log('\n🎨 Template seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding template:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
