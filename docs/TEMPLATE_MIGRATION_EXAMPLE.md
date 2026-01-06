# Template Migration Example: hbgpt → BudStack (TenantTemplate System)

## Overview

This document demonstrates how to convert a standalone React template (hbgpt) into a multi-tenant BudStack template using the new **TenantTemplate** system with S3 storage and per-tenant cloning.

> **Updated for TenantTemplate System**: This guide now reflects the new architecture where templates are cloned per-tenant instead of shared, with assets stored in S3.

---

## Understanding the TenantTemplate Architecture

### The Three-Layer System

```
1. Base Template (System)
   ↓ (Template Registry)
2. Cloned TenantTemplate (Per-Tenant Instance)
   ↓ (Active Template Reference)
3. Live Tenant Store (Customer-Facing)
```

### Database Models

**Template** (Base template registry):
```prisma
model Template {
  id          String   @id
  slug        String   @unique
  name        String
  description String?
  // Base template stored in /templates/ directory
  tenantTemplates TenantTemplate[]
}
```

**TenantTemplate** (Tenant-specific instance):
```prisma
model TenantTemplate {
  id             String
  tenantId       String
  baseTemplateId String
  s3Path         String?  // S3 folder for assets
  designSystem   Json?    // CSS variables
  pageContent    Json?    // Content overrides
  logoUrl        String?
  heroImageUrl   String?
  // Tenant customizations
}
```

**Relationship**:
```
Tenant.activeTenantTemplate → TenantTemplate → Template (base)
```

### S3 Storage Structure

```
s3://bucket/7742/tenants/{tenantId}/templates/{timestamp}/
├── assets/
│   ├── images/
│   │   ├── hero.jpg
│   │   └── logo.png
│   ├── videos/
│   │   └── hero-video.mp4
│   └── fonts/
├── manifest.json
└── README.md
```

---

## Source Template Analysis

### hbgpt Structure (Standalone)

```
hbgpt/
├── src/
│   ├── App.tsx                 # Router with all pages
│   ├── pages/
│   │   ├── Index.tsx           # Home page (assembles components)
│   │   ├── WhatWeDo.tsx
│   │   ├── AboutUs.tsx
│   │   └── Contact.tsx
│   ├── components/
│   │   ├── Hero.tsx            # Full-screen video hero
│   │   ├── AboutHero.tsx       # About section with image
│   │   ├── ValueProps.tsx      # 3 value cards
│   │   ├── Cultivation.tsx     # Production section
│   │   ├── International.tsx   # Global presence
│   │   ├── News.tsx            # News articles
│   │   ├── Header.tsx          # Navigation
│   │   └── Footer.tsx          # Footer
│   └── assets/
│       ├── hero-video.mp4
│       ├── hb-logo-square.png
│       └── *.jpg (images)
├── public/
└── package.json
```

### Key Characteristics

1. **Hardcoded Data**:
   ```tsx
   <h1>Healing Buds</h1>
   <p>Pioneering tomorrow's medical cannabis solutions</p>
   ```

2. **React Router for Navigation**:
   ```tsx
   <Link to="/about-us">About</Link>
   ```

3. **Static Component Assembly**:
   ```tsx
   <Hero />
   <AboutHero />
   <ValueProps />
   ```

---

## Migration Process

### Step 1: Create Base Template Directory

```bash
mkdir -p nextjs_space/templates/healingbuds/components
cd nextjs_space/templates/healingbuds
```

Create files:
- `index.tsx` (main template component)
- `defaults.json` (default settings & design system)
- `template.config.json` (metadata)
- `README.md` (documentation)
- `components/` (section components)

### Step 2: Register Template in Database

Create a migration or seed script:

```typescript
// scripts/register-template.ts
import { prisma } from '@/lib/db';

await prisma.template.create({
  data: {
    slug: 'healingbuds',
    name: 'Healing Buds - Video Hero',
    description: 'Premium template with full-screen video hero',
    category: 'medical',
    isPublic: true,
    isActive: true,
    tags: ['video', 'modern', 'dark-theme'],
  },
});
```

### Step 3: Define Standard Props Interface

**Before (hbgpt):**
```typescript
// components/Hero.tsx
export function Hero() {
  return (
    <section>
      <h1>Healing Buds</h1>
      <video src="/hero-video.mp4" />
    </section>
  );
}
```

**After (BudStack TenantTemplate):**
```typescript
// components/Hero.tsx
'use client';

import Image from 'next/image';

interface HeroProps {
  businessName: string;           // From tenant.businessName
  tagline?: string | null;        // From tenantTemplate.pageContent
  videoUrl?: string | null;       // From S3 or tenantTemplate.heroImageUrl
  logoUrl?: string | null;        // From S3 via tenantTemplate.logoUrl
  tenant: Tenant;                 // Full tenant object
}

export function Hero({
  businessName,
  tagline,
  videoUrl,
  logoUrl,
  tenant
}: HeroProps) {
  return (
    <section>
      <h1>{businessName}</h1>
      {videoUrl && <video src={videoUrl} />}
      <p>{tagline || 'Welcome'}</p>
    </section>
  );
}
```

### Step 4: Create Main Template Component

**File: `templates/healingbuds/index.tsx`**

```typescript
'use client';

import { Tenant } from '@/types/client';
import { Hero } from './components/Hero';
import { AboutHero } from './components/AboutHero';
import { ValueProps } from './components/ValueProps';
import { Cultivation } from './components/Cultivation';
import { News } from './components/News';
import PageTransition from './components/PageTransition';

interface TemplateProps {
  tenant: Tenant;
  consultationUrl?: string;
  productsUrl?: string;
  contactUrl?: string;
  heroImageUrl?: string | null;
  logoUrl?: string | null;
}

export default function HealingBudsTemplate({
  tenant,
  consultationUrl,
  productsUrl,
  contactUrl,
  heroImageUrl,
  logoUrl
}: TemplateProps) {
  return (
    <PageTransition variant="elegant">
      <div className="min-h-screen template-healingbuds">
        <main>
          <Hero
            businessName={tenant.businessName}
            heroImageUrl={heroImageUrl}
            tenant={tenant}
          />
          <AboutHero />
          <ValueProps />
          <Cultivation />
          <News />
        </main>
      </div>
    </PageTransition>
  );
}
```

### Step 5: Create defaults.json with Design System

**File: `templates/healingbuds/defaults.json`**

```json
{
  "template": "healingbuds",
  "designSystem": {
    "colors": {
      "primary": "#16a34a",
      "secondary": "#059669",
      "background": "#0a0a0a",
      "text": "#e5e7eb",
      "heading": "#ffffff",
      "border": "#1f2937",
      "success": "#10b981",
      "warning": "#f59e0b",
      "error": "#ef4444"
    },
    "typography": {
      "fontFamily": {
        "base": "'Inter', sans-serif",
        "heading": "'Playfair Display', serif"
      },
      "fontSize": {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      }
    },
    "spacing": {
      "xs": "0.25rem",
      "sm": "0.5rem",
      "md": "1rem",
      "lg": "1.5rem",
      "xl": "2rem"
    }
  },
  "pageContent": {
    "home": {
      "heroTitle": "Welcome to Your Medical Cannabis Journey",
      "heroSubtitle": "Premium medical cannabis products delivered with care"
    }
  }
}
```

### Step 6: Integrate with Template Registry

**File: `lib/template-registry.ts`**

```typescript
import dynamic from 'next/dynamic';

export const TEMPLATE_COMPONENTS: Record<string, any> = {
  'healingbuds': dynamic(() => import('@/templates/healingbuds/index')),
  // ... other templates
};

export const TEMPLATE_NAVIGATION: Record<string, any> = {
  'healingbuds': dynamic(() => import('@/templates/healingbuds/components/Navigation')),
};

export const TEMPLATE_FOOTER: Record<string, any> = {
  'healingbuds': dynamic(() => import('@/templates/healingbuds/components/Footer')),
};
```

### Step 7: Template Cloning Workflow

When a tenant selects this template, the system:

1. **Clones the template** via API:
   ```typescript
   POST /api/tenant-admin/templates/clone
   {
     "baseTemplateId": "healingbuds-template-id",
     "templateName": "My Custom Healing Buds"
   }
   ```

2. **System creates TenantTemplate**:
   ```typescript
   // lib/template-service.ts
   const timestamp = Date.now();
   const s3Path = `7742/tenants/${tenantId}/templates/${timestamp}`;
   
   // Copy assets to S3
   await copyTemplateAssets(baseTemplate, s3Path);
   
   // Create TenantTemplate record
   const tenantTemplate = await prisma.tenantTemplate.create({
     data: {
       tenantId,
       baseTemplateId,
       templateName,
       s3Path,
       designSystem: baseTemplate.defaults.designSystem,
       pageContent: baseTemplate.defaults.pageContent,
     },
   });
   
   // Set as active
   await prisma.tenant.update({
     where: { id: tenantId },
     data: { activeTenantTemplateId: tenantTemplate.id },
   });
   ```

3. **Assets stored in S3**:
   ```
   s3://bucket/7742/tenants/cmk01pac.../templates/1767643053685/
   ├── assets/
   │   ├── hero-video.mp4
   │   └── logo.png
   └── manifest.json
   ```

4. **TenantThemeProvider applies styles**:
   ```typescript
   // Injects CSS variables from tenantTemplate.designSystem
   --tenant-color-primary: #16a34a;
   --tenant-color-background: #0a0a0a;
   --tenant-font-base: 'Inter', sans-serif;
   ```

---

## Key Differences: Old vs New System

| Aspect | Old (Shared Template) | New (TenantTemplate) |
|--------|----------------------|----------------------|
| **Storage** | Single template for all tenants | Cloned instance per tenant |
| **Assets** | Shared `/public/` or S3 root | Tenant-specific S3 folder |
| **Customization** | Limited to `tenant.settings` | Full `TenantTemplate` record |
| **Design System** | Applied via script | Applied during cloning |
| **Isolation** | Shared resources | Completely isolated |
| **Upgrades** | Risky (affects all tenants) | Safe (upgrade opt-in) |

---

## Testing the Migrated Template

### 1. Register Base Template

```bash
npx tsx scripts/register-template.ts
```

### 2. Clone Template for Tenant

Via API or admin UI:
```bash
curl -X POST /api/tenant-admin/templates/clone \
  -H "Content-Type: application/json" \
  -d '{"baseTemplateId": "...", "templateName": "My Store"}'
```

### 3. Verify Database

```sql
SELECT 
  t.businessName,
  t.subdomain,
  tt.templateName,
  tt.s3Path,
  bt.name as baseTemplateName
FROM "Tenant" t
LEFT JOIN "TenantTemplate" tt ON t."activeTenantTemplateId" = tt.id
LEFT JOIN "Template" bt ON tt."baseTemplateId" = bt.id
WHERE t.subdomain = 'healingbuds';
```

### 4. Check S3 Assets

```bash
aws s3 ls s3://bucket/7742/tenants/{tenantId}/templates/ --recursive
```

### 5. Visual Check

Visit: `http://localhost:3000/store/healingbuds`

Verify:
- ✅ Template components render
- ✅ CSS variables applied
- ✅ Images load from S3
- ✅ Navigation and footer use template components

---

## Common Issues & Solutions

### Issue 1: Assets Not Loading from S3

**Problem:** Images return 404

**Solution:**
```typescript
// Ensure S3 URLs are properly generated
import { getFileUrl } from '@/lib/s3';

const imageUrl = await getFileUrl(tenantTemplate.s3Path + '/assets/hero.jpg');
```

### Issue 2: Template Not Appearing in Marketplace

**Problem:** Template doesn't show in admin UI

**Solution:**
```typescript
// Verify template is public and active
await prisma.template.update({
  where: { slug: 'healingbuds' },
  data: { isPublic: true, isActive: true },
});
```

### Issue 3: Design System Not Applying

**Problem:** CSS variables missing

**Solution:**
```typescript
// Ensure designSystem exists in defaults.json
// Re-clone template to get latest design system
```

---

## Next Steps

1. **Template Marketplace**: List template for other tenants to clone
2. **Customization UI**: Build tenant admin interface for template customization
3. **Version Management**: Support template updates and migrations
4. **Asset Management**: UI for uploading tenant-specific assets to S3

---

## Reference Files

- [Template Design Guide](./TEMPLATE_DESIGN_GUIDE.md)
- [Template Cloning Service](../nextjs_space/lib/template-service.ts)
- [S3 Asset Management](../nextjs_space/lib/s3.ts)
- [TenantThemeProvider](../nextjs_space/components/tenant-theme-provider.tsx)
