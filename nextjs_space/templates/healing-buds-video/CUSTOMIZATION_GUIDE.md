# Healing Buds Video Hero - Customization Guide

## Table of Contents

1. [Overview](#overview)
2. [Quick Customization](#quick-customization)
3. [Color Scheme](#color-scheme)
4. [Typography](#typography)
5. [Hero Section](#hero-section)
6. [Logo Configuration](#logo-configuration)
7. [Content Sections](#content-sections)
8. [Footer](#footer)
9. [Advanced Customization](#advanced-customization)
10. [Examples](#examples)

---

## Overview

The Healing Buds Video Hero template is fully customizable through the **Tenant Admin > Branding** panel. All changes are applied in real-time and stored in the tenant's database settings.

---

## Quick Customization

### Via Tenant Admin UI

1. **Log in** as Tenant Admin
2. Navigate to **Tenant Admin > Branding**
3. Select **"Healing Buds Video Hero"** template
4. Customize:
   - Colors
   - Fonts
   - Logo
   - Hero video/image
   - Tagline
   - Contact information
5. Click **"Save Changes"**
6. View changes at `/store/your-subdomain`

### Via API

```bash
curl -X POST https://platform.com/api/tenant-admin/branding \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "primaryColor": "#059669",
    "tagline": "Your custom tagline",
    "heroType": "video",
    "heroVideoUrl": "/your-video.mp4"
  }'
```

---

## Color Scheme

### Primary Colors

**Primary Color** (Main brand color)
- Used for: Buttons, links, accents
- Default: `#059669` (Emerald green)
- Example:
  ```json
  {
    "primaryColor": "#059669"
  }
  ```

**Secondary Color** (Supporting color)
- Used for: Hover states, backgrounds
- Default: `#10b981`
- Example:
  ```json
  {
    "secondaryColor": "#10b981"
  }
  ```

**Accent Color** (Highlights)
- Used for: Badges, icons, special elements
- Default: `#34d399`
- Example:
  ```json
  {
    "accentColor": "#34d399"
  }
  ```

### Background & Text Colors

**Background Color**
- Default: `#ffffff` (White)
- Example:
  ```json
  {
    "backgroundColor": "#ffffff"
  }
  ```

**Text Color**
- Default: `#1f2937` (Dark gray)
- Example:
  ```json
  {
    "textColor": "#1f2937"
  }
  ```

**Heading Color**
- Default: `#111827` (Almost black)
- Example:
  ```json
  {
    "headingColor": "#111827"
  }
  ```

### Color Presets

**Emerald Theme** (Default)
```json
{
  "primaryColor": "#059669",
  "secondaryColor": "#10b981",
  "accentColor": "#34d399"
}
```

**Blue Theme**
```json
{
  "primaryColor": "#2563eb",
  "secondaryColor": "#3b82f6",
  "accentColor": "#60a5fa"
}
```

**Purple Theme**
```json
{
  "primaryColor": "#7c3aed",
  "secondaryColor": "#8b5cf6",
  "accentColor": "#a78bfa"
}
```

**Dark Theme**
```json
{
  "primaryColor": "#14b8a6",
  "secondaryColor": "#2dd4bf",
  "backgroundColor": "#111827",
  "textColor": "#f9fafb",
  "headingColor": "#ffffff"
}
```

---

## Typography

### Font Families

**Body Font**
- Options: `inter`, `roboto`, `open-sans`, `lato`, `poppins`
- Default: `inter`
- Example:
  ```json
  {
    "fontFamily": "inter"
  }
  ```

**Heading Font**
- Options: `playfair`, `merriweather`, `lora`, `inter`, `roboto`
- Default: `playfair`
- Example:
  ```json
  {
    "headingFontFamily": "playfair"
  }
  ```

### Font Sizes

**Size Scale**
- Options: `small`, `medium`, `large`
- Default: `medium`
- Example:
  ```json
  {
    "fontSize": "large"
  }
  ```

**Scale Comparison:**

| Element | Small | Medium | Large |
|---------|-------|--------|-------|
| Body | 14px | 16px | 18px |
| H1 | 36px | 48px | 60px |
| H2 | 30px | 36px | 48px |
| H3 | 24px | 30px | 36px |

### Typography Presets

**Modern Professional**
```json
{
  "fontFamily": "inter",
  "headingFontFamily": "inter",
  "fontSize": "medium"
}
```

**Classic Elegant**
```json
{
  "fontFamily": "lora",
  "headingFontFamily": "playfair",
  "fontSize": "large"
}
```

**Bold & Friendly**
```json
{
  "fontFamily": "poppins",
  "headingFontFamily": "poppins",
  "fontSize": "medium"
}
```

---

## Hero Section

### Hero Types

**Video Hero** (Default)
```json
{
  "heroType": "video",
  "heroVideoUrl": "/hero-video.mp4"
}
```

**Image Hero**
```json
{
  "heroType": "image",
  "heroImagePath": "/uploaded/hero-image.jpg"
}
```

**Gradient Hero**
```json
{
  "heroType": "gradient"
}
```

### Video Requirements

- **Format:** MP4 (H.264 codec recommended)
- **Resolution:** 1920x1080 (Full HD)
- **File Size:** < 10MB
- **Duration:** 10-30 seconds (loops automatically)
- **Audio:** No audio (muted for autoplay)

### Tagline

**Default:** "Pioneering tomorrow's medical cannabis solutions"

**Examples:**
```json
{
  "tagline": "Premium medical cannabis, delivered with care"
}
```

```json
{
  "tagline": "Your wellness journey starts here"
}
```

```json
{
  "tagline": "Nature's healing power, scientifically proven"
}
```

### Hero Content

**Title & Subtitle:**
```json
{
  "pageContent": {
    "home": {
      "heroTitle": "Welcome to Your Medical Cannabis Journey",
      "heroSubtitle": "Premium medical cannabis products delivered with care",
      "heroCtaText": "Get Started"
    }
  }
}
```

---

## Logo Configuration

### Logo Options

**Upload Custom Logo:**
1. Go to Tenant Admin > Branding
2. Click "Upload Logo"
3. Select image (PNG, SVG, or JPG)
4. Logo is automatically uploaded to S3
5. Save changes

**Use Default Template Logo:**
```json
{
  "logoPath": null
}
```

When `logoPath` is `null`, the template uses scroll-aware logos:
- **Top of page:** White logo on transparent background
- **Scrolled:** Dark logo on white background

### Logo Specifications

**Horizontal Logo:**
- Recommended: 200x80px
- Max: 300x120px
- Aspect ratio: 2.5:1

**Square Logo:**
- Recommended: 120x120px
- Max: 200x200px
- Aspect ratio: 1:1

**File Requirements:**
- Format: PNG (with transparency), SVG, or JPG
- File size: < 500KB
- Color: Provide both white and dark versions if possible

### Scroll-Aware Logos

**How It Works:**

The navigation component automatically switches logos based on scroll position:

```tsx
// At top (transparent header)
logoUrl = null → uses "/hb-logo-white.png"

// Scrolled (white header)
logoUrl = null → uses "/hb-logo-dark.png"
```

**To Use Your Own:**
1. Upload two logos: `your-logo-white.png` and `your-logo-dark.png`
2. Place in `/public/` folder
3. Update `defaults.json`:
   ```json
   {
     "logoPathWhite": "/your-logo-white.png",
     "logoPathDark": "/your-logo-dark.png"
   }
   ```

---

## Content Sections

### About Section

```json
{
  "pageContent": {
    "about": {
      "title": "About Us",
      "content": "Committed to excellence in every product we create and championing worldwide cannabis acceptance through quality and integrity."
    }
  }
}
```

### Value Propositions

**Built-in Values:**
1. Quality & Purity
2. Patient-Centered Care
3. Scientific Excellence

**Customization:**
To change, modify the `ValueProps.tsx` component directly.

### Cultivation Section

**Image:** Default shows cultivation facility

**To Customize:**
1. Upload new image via branding panel
2. Or update component to use tenant settings:
   ```tsx
   const cultivationImage = settings.cultivationImage || '/default-cultivation.jpg';
   ```

### International Section

**Countries Displayed:**
- Portugal (Active)
- Germany (Coming Soon)
- Netherlands (Coming Soon)

**To Customize:**
Edit `International.tsx` component to reflect your markets.

### News Section

**Default Articles:**
3 pre-defined news articles

**To Add Dynamic News:**
1. Add news API endpoint
2. Fetch articles in component:
   ```tsx
   const articles = await fetch('/api/news').then(r => r.json());
   ```

---

## Footer

### Contact Information

```json
{
  "contactEmail": "info@healingbuds.com",
  "contactPhone": "+351 289 123 456",
  "address": "Av. Fco. Sá Carneiro, Quarteira, Portugal"
}
```

### Social Links

```json
{
  "socialLinks": {
    "facebook": "https://facebook.com/yourpage",
    "twitter": "https://twitter.com/yourhandle",
    "instagram": "https://instagram.com/yourprofile",
    "linkedin": "https://linkedin.com/company/yourcompany"
  }
}
```

**Leave empty to hide:**
```json
{
  "socialLinks": {
    "facebook": "",
    "twitter": "",
    "instagram": "",
    "linkedin": ""
  }
}
```

### Footer Links

**Automatic:**
- About: `/store/{subdomain}/about`
- Products: `/store/{subdomain}/products`
- Contact: `/store/{subdomain}/contact`
- Terms: `/store/{subdomain}/terms`
- Privacy: `/store/{subdomain}/privacy`

---

## Advanced Customization

### Custom CSS

**Via Branding Panel:**
1. Go to Tenant Admin > Branding
2. Scroll to "Custom CSS" section
3. Add your CSS:
   ```css
   .custom-section {
     background: linear-gradient(to right, #059669, #10b981);
     padding: 4rem 0;
   }
   
   .custom-heading {
     font-size: 3rem;
     color: #ffffff;
   }
   ```
4. Save changes

**Note:** Custom CSS is scoped to tenant theme container.

### Modify Components

**To Change Section Order:**

Edit `index.tsx`:

```tsx
export default function HealingBudsVideoTemplate(props) {
  return (
    <>
      <Hero {...props} />
      {/* Move sections around */}
      <International {...props} />
      <ValueProps {...props} />
      <Cultivation {...props} />
      <News {...props} />
      <AboutHero {...props} />
      <Footer {...props} />
    </>
  );
}
```

**To Add New Section:**

1. Create `components/CustomSection.tsx`:
   ```tsx
   export function CustomSection({ tenant }: { tenant: Tenant }) {
     return (
       <section className="py-16">
         <h2>{tenant.businessName} Custom Section</h2>
       </section>
     );
   }
   ```

2. Import and use in `index.tsx`:
   ```tsx
   import { CustomSection } from './components/CustomSection';
   
   export default function HealingBudsVideoTemplate(props) {
     return (
       <>
         <Hero {...props} />
         <CustomSection tenant={props.tenant} />
         {/* ... rest of sections */}
       </>
     );
   }
   ```

### Animation Customization

**Change Animation Speed:**

Edit `styles.css`:

```css
:root {
  --transition-speed: 0.5s; /* Default: 0.3s */
  --animation-duration: 1s; /* Default: 0.6s */
}
```

**Disable Animations:**

Remove `framer-motion` components and replace with regular divs:

```tsx
// Before
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Content
</motion.div>

// After
<div>
  Content
</div>
```

---

## Examples

### Example 1: Corporate Professional

```json
{
  "template": "healing-buds-video",
  "primaryColor": "#1e40af",
  "secondaryColor": "#3b82f6",
  "fontFamily": "roboto",
  "headingFontFamily": "roboto",
  "fontSize": "medium",
  "heroType": "image",
  "tagline": "Professional medical cannabis solutions",
  "buttonStyle": "square"
}
```

### Example 2: Natural & Organic

```json
{
  "template": "healing-buds-video",
  "primaryColor": "#16a34a",
  "secondaryColor": "#22c55e",
  "fontFamily": "lora",
  "headingFontFamily": "merriweather",
  "fontSize": "large",
  "heroType": "video",
  "tagline": "Nature's healing power, cultivated with care",
  "borderRadius": "large",
  "shadowStyle": "soft"
}
```

### Example 3: Modern Minimalist

```json
{
  "template": "healing-buds-video",
  "primaryColor": "#000000",
  "secondaryColor": "#374151",
  "backgroundColor": "#ffffff",
  "textColor": "#111827",
  "fontFamily": "inter",
  "headingFontFamily": "inter",
  "fontSize": "medium",
  "heroType": "gradient",
  "tagline": "Medical cannabis, simplified",
  "spacing": "relaxed",
  "borderRadius": "none",
  "shadowStyle": "none"
}
```

### Example 4: Dark Mode

```json
{
  "template": "healing-buds-video",
  "primaryColor": "#10b981",
  "secondaryColor": "#34d399",
  "backgroundColor": "#111827",
  "textColor": "#f9fafb",
  "headingColor": "#ffffff",
  "fontFamily": "poppins",
  "headingFontFamily": "poppins",
  "fontSize": "medium",
  "heroType": "video",
  "tagline": "Premium cannabis, delivered 24/7"
}
```

---

## Preview Before Publishing

**Steps:**
1. Make changes in Branding panel
2. Click "Preview" (opens in new tab)
3. Review all sections
4. Test on mobile/tablet
5. If satisfied, click "Save & Publish"

**Preview URL:**
```
https://platform.com/store/your-subdomain?preview=true
```

---

## Reset to Defaults

**To restore template defaults:**

1. Tenant Admin > Branding
2. Click "Reset to Template Defaults"
3. Confirm action
4. All customizations will be lost (logo/images remain)

**Via API:**
```bash
curl -X POST https://platform.com/api/tenant-admin/branding/reset \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Support

For customization help:

- **Documentation:** https://docs.budstack.io/templates
- **Email:** support@budstack.io
- **Discord:** BudStack Community

---

© 2025 BudStack. All rights reserved.
