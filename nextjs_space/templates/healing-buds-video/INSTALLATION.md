# Healing Buds Video Hero Template - Installation Guide

## Overview

This template is designed for the BudStack multi-tenant platform and showcases an immersive full-screen video background with parallax scrolling effects.

---

## Quick Installation

### Method 1: GitHub URL Upload (Recommended)

1. **Log in to BudStack** as a Super Admin
2. Navigate to **Super Admin > Templates**
3. Click **"Upload Template from GitHub"**
4. Enter repository URL:
   ```
   https://github.com/your-org/healing-buds-video-template.git
   ```
5. Select branch: `main`
6. Click **"Import Template"**
7. Template will be available for all tenants

### Method 2: Manual Upload

1. **Extract** the ZIP file
2. **Upload** via Super Admin dashboard
3. Select all files including:
   - `index.tsx`
   - `components/` folder
   - `defaults.json`
   - `template.config.json`
   - `styles.css`
   - `assets/` folder

### Method 3: Developer Setup

```bash
# 1. Clone your BudStack platform
git clone https://github.com/your-org/budstack-platform.git
cd budstack-platform

# 2. Navigate to templates directory
cd nextjs_space/templates

# 3. Clone this template
git clone https://github.com/your-org/healing-buds-video-template.git healing-buds-video

# 4. Install dependencies (if any)
cd healing-buds-video
yarn install  # or npm install

# 5. Seed template to database
cd ../../scripts
yarn tsx seed-template.ts healing-buds-video

# 6. Restart platform
cd ..
yarn dev
```

---

## Verification

### Test Template Installation

1. **Log in as Tenant Admin**
2. Go to **Tenant Admin > Branding**
3. Click **"Select Template"**
4. Find **"Healing Buds Video Hero"** in the list
5. Click **"Apply Template"**
6. Visit your storefront: `https://platform.com/store/your-subdomain`

### Expected Result

- ✅ Full-screen video hero loads and autoplays
- ✅ Your business name displays prominently
- ✅ All sections render correctly
- ✅ Colors match your tenant branding
- ✅ Footer shows your contact information
- ✅ Navigation links work properly

---

## Configuration

### Applying Template to a Tenant

**Via UI:**
1. Tenant Admin > Branding > Select Template
2. Choose "Healing Buds Video Hero"
3. Customize colors, fonts, logo, hero video
4. Save changes

**Via API:**
```bash
curl -X POST https://platform.com/api/tenant-admin/select-template \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "templateId": "healing-buds-video"
  }'
```

**Via Database:**
```sql
UPDATE "Tenant"
SET "templateId" = (SELECT id FROM "Template" WHERE slug = 'healing-buds-video')
WHERE subdomain = 'your-subdomain';
```

### Customization Options

**Colors:**
- Primary: `#059669` (Emerald green)
- Secondary: `#10b981`
- Accent: `#34d399`
- Background: `#ffffff`
- Text: `#1f2937`

**Typography:**
- Body: Inter
- Headings: Playfair Display
- Sizes: Small | Medium | Large

**Hero:**
- Type: Video, Image, or Gradient
- Default video: `/hero-video.mp4`
- Supported formats: MP4, WebM

**Logo:**
- Recommended: 200x80px (horizontal) or 120x120px (square)
- Formats: PNG, SVG, JPG
- Scroll-aware: Auto-switches between white/dark logos

---

## Troubleshooting

### Template Not Appearing in Selector

**Check:**
```sql
SELECT * FROM "Template" WHERE slug = 'healing-buds-video';
```

If not found, run seed script:
```bash
yarn tsx scripts/seed-healing-buds-template.ts
```

### Video Not Autoplaying

**Solution:**
1. Ensure video is muted (required for autoplay)
2. Use MP4 format (best browser support)
3. Keep file size under 10MB
4. Check `heroVideoUrl` in tenant settings

### White Text on White Background

**Solution:**
This template uses inline styles for critical sections to prevent CSS variable conflicts. If you see this issue, check that the template version is up to date.

### Images Not Loading

**Check:**
1. Verify S3 bucket configuration
2. Check `logoPath` and `heroImagePath` in tenant settings
3. Ensure image URLs are signed (for S3)
4. Fallback to public folder images if S3 fails

### Build Errors

**Common Issues:**

```bash
# Missing dependencies
yarn add framer-motion lucide-react

# Prisma client not generated
yarn prisma generate

# TypeScript errors
yarn tsc --noEmit
```

---

## Dependencies

### Required Platform Packages

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "next": "^14.2.0",
    "@prisma/client": "^6.7.0",
    "framer-motion": "^10.18.0",
    "lucide-react": "^0.446.0"
  }
}
```

### Optional Enhancements

```json
{
  "devDependencies": {
    "@types/react": "^18.2.22",
    "typescript": "^5.2.2"
  }
}
```

---

## File Structure Reference

```
healing-buds-video/
├── index.tsx                    # Main template component
├── components/
│   ├── Hero.tsx                 # Video hero section
│   ├── AboutHero.tsx            # About introduction
│   ├── ValueProps.tsx           # Value propositions
│   ├── Cultivation.tsx          # Production showcase
│   ├── International.tsx        # Global presence
│   ├── News.tsx                 # Latest updates
│   └── Footer.tsx               # Site footer
├── defaults.json                # Default settings
├── template.config.json         # Template metadata
├── styles.css                   # Custom CSS
├── README.md                    # Template documentation
├── INSTALLATION.md              # This file
└── assets/
    ├── preview.jpg              # Full template preview
    └── thumbnail.jpg            # Selector thumbnail
```

---

## Seeding Script Example

**File:** `scripts/seed-healing-buds-template.ts`

```typescript
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Healing Buds Video Hero template...');

  const template = await prisma.template.upsert({
    where: { slug: 'healing-buds-video' },
    update: {
      name: 'Healing Buds Video Hero',
      description: 'Immersive video background with parallax scrolling',
      category: 'modern',
      isActive: true,
    },
    create: {
      slug: 'healing-buds-video',
      name: 'Healing Buds Video Hero',
      description: 'Immersive full-screen video hero template with parallax effects',
      category: 'modern',
      tags: ['video', 'parallax', 'modern', 'medical'],
      version: '1.0.0',
      author: 'BudStack',
      isActive: true,
      isPremium: false,
      layoutFilePath: '/templates/healing-buds-video/index.tsx',
      componentsPath: '/templates/healing-buds-video/components',
      stylesPath: '/templates/healing-buds-video/styles.css',
      previewUrl: '/templates/healing-buds-video/assets/preview.jpg',
      thumbnailUrl: '/templates/healing-buds-video/assets/thumbnail.jpg',
      metadata: {
        features: ['hero_video', 'parallax_scrolling', 'responsive_design'],
        performance: { lighthouse_score: 95 },
        accessibility: { wcag_level: 'AA' },
      },
    },
  });

  console.log('✅ Template seeded:', template.slug);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

**Run:**
```bash
yarn tsx scripts/seed-healing-buds-template.ts
```

---

## Support

For installation issues:

- **GitHub Issues:** https://github.com/your-org/healing-buds-video-template/issues
- **Email:** support@budstack.io
- **Discord:** BudStack Community

---

## Version Compatibility

| Template Version | Platform Version | Next.js | React |
|-----------------|------------------|---------|-------|
| 1.0.x | >= 1.0.0 | >= 14.0.0 | >= 18.0.0 |

---

## License

MIT License - See LICENSE file for details

---

© 2025 BudStack. All rights reserved.
