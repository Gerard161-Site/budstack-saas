# BudStack SaaS: Shared vs Template-Specific Pages

## Architecture Overview

**Shared (SaaS-Level)** pages are reusable across all tenants and imported by tenant stores.  
**Template-Specific** pages are unique to each template's design and embedded in the template itself.

---

## Page Classification

### 🌐 Shared Pages (Platform-Level)
**Location:** `/app/` (root level)  
**Used by:** All tenant stores via import  
**Purpose:** Generic content that doesn't need customization

| Page | Path | Imported By |
|------|------|-------------|
| Privacy Policy | `/app/privacy/page.tsx` | `/store/[slug]/privacy/page.tsx` |
| Cookie Policy | `/app/cookies/page.tsx` | `/store/[slug]/cookies/page.tsx` |
| Terms of Service | `/app/terms/page.tsx` | `/store/[slug]/terms/page.tsx` |
| FAQ | `/app/faq/page.tsx` | `/store/[slug]/faq/page.tsx` |
| Regulatory Info | `/app/regulatory/page.tsx` | `/store/[slug]/regulatory/page.tsx` |

**How it works:**
```typescript
// In /app/store/[slug]/privacy/page.tsx
import PrivacyPage from '@/app/privacy/page';
export default PrivacyPage;
```

---

### 🎨 Template-Specific Pages
**Location:** `/templates/{template-name}/` or `/app/store/[slug]/`  
**Customized:** Per-template design and content

#### Home Page
- **Shared Logic:** `/app/store/[slug]/page.tsx` (loads templates)
- **Template Implementation:** `/templates/healingbuds/index.tsx`
- **Customization:** Each template has unique Hero, sections, layout

#### Blockchain
- **Component:** `/components/blockchain/BlockchainTraceability.tsx`
- **Page:** `/app/store/[slug]/blockchain/page.tsx`
- **Status:** Shared component, can be enabled per tenant

#### About
- **Location:** Embedded in template (e.g., `AboutHero` component)
- **Not a separate page:** Part of homepage sections

#### Conditions
- **List Page:** `/app/store/[slug]/conditions/page.tsx` (shared)
- **Detail Page:** `/app/store/[slug]/conditions/[id]/page.tsx` (shared)
- **Fetches:** Dr. Green API data

#### Products
- **List:** `/app/store/[slug]/products/page.tsx` (shared)
- **Detail:** `/app/store/[slug]/products/[id]/page.tsx` (shared)
- **Fetches:** Dr. Green API with tenant's API keys

#### Consultation
- **Page:** `/app/store/[slug]/consultation/page.tsx` (shared)
- **Success:** `/app/store/[slug]/consultation/success/page.tsx`
- **Creates:** Dr. Green client ID for user

#### Contact
- **Not a separate page currently**
- **Could add:** `/app/store/[slug]/contact/page.tsx` if needed

#### The Wire (Blog)
- **List:** `/app/store/[slug]/the-wire/page.tsx` (shared)
- **Post:** `/app/store/[slug]/the-wire/[postSlug]/page.tsx` (shared)
- **Fetches:** Tenant's posts from database

---

## Directory Structure

```
app/
├── privacy/page.tsx          ← SHARED: Imported by all tenants
├── cookies/page.tsx          ← SHARED
├── terms/page.tsx            ← SHARED
├── faq/page.tsx              ← SHARED
├── regulatory/page.tsx       ← SHARED
└── store/[slug]/
    ├── page.tsx              ← Loads template (/templates/healingbuds/index.tsx)
    ├── privacy/page.tsx      ← Imports from /app/privacy
    ├── products/page.tsx     ← Shared logic, tenant data
    ├── consultation/page.tsx ← Shared form, tenant config
    └── the-wire/page.tsx     ← Shared UI, tenant posts

templates/
├── healingbuds/
│   ├── index.tsx            ← TEMPLATE: Homepage layout
│   └── components/
│       ├── Hero.tsx         ← TEMPLATE: Unique design
│       ├── AboutHero.tsx    ← TEMPLATE: About section
│       └── ...
├── gta-cannabis/
│   ├── index.tsx            ← Different homepage
│   └── components/
└── medical-professional/
    └── ...
```

---

## Template Component Usage

### HealingBuds Template Components (9 total)

**Used in `index.tsx`:**
1. ✅ Hero
2. ✅ AboutHero  
3. ✅ ValueProps
4. ✅ Cultivation
5. ✅ News
6. ✅ Footer
7. ✅ Navigation  
8. ✅ BackToTop
9. ✅ PageTransition

**Previously Removed (unused):**
- ❌ InteractiveMap
- ❌ International
- ❌ MagneticButton
- ❌ ParticleField
- ❌ ScrollAnimation
- ❌ MobileBottomActions

---

## Summary

**Pages You Asked About:**

| Page | Storage Location | Type |
|------|------------------|------|
| Home | Template-specific | Each template has unique `index.tsx` |
| Blockchain | Shared component | `/components/blockchain/` |
| About | Template component | `AboutHero.tsx` in template |
| Conditions | Shared page | `/app/store/[slug]/conditions/` |
| Products | Shared page | `/app/store/[slug]/products/` |
| Consultation | Shared page | `/app/store/[slug]/consultation/` |
| Contact | Not yet implemented | Could add to `/app/store/[slug]/` |
| The Wire | Shared page | `/app/store/[slug]/the-wire/` |

**Legal Pages (newly restored):**
- Privacy, Cookies, Terms, FAQ, Regulatory → All shared in `/app/`
