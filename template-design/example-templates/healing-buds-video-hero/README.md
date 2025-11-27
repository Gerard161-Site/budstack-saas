# Healing Buds Video Hero Template

**Version:** 1.0.0  
**Category:** Medical  
**Author:** HB Design Team

## Overview

The Healing Buds Video Hero template features an immersive full-screen video background with parallax scrolling effects. Designed specifically for medical cannabis dispensaries, it combines clinical professionalism with modern web aesthetics.

## Key Features

- **Full-Screen Video Hero**: Captivating video background with overlay gradient
- **Parallax Scrolling**: Smooth parallax effects for hero and content sections
- **Scroll Fade Animations**: Content fades in as users scroll down
- **Medical Aesthetic**: Clean, professional design suitable for healthcare
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Accessibility**: WCAG 2.1 AA compliant

## Design Philosophy

This template breaks away from rigid section requirements, allowing for creative freedom while maintaining professional standards. The layout is flexible and can be customized without being constrained by forced sections.

## Sections Included

1. **Immersive Video Hero**: Full-viewport video background with business name and tagline
2. **About Section**: Brief introduction to the dispensary
3. **Value Propositions**: Key benefits and services
4. **Cultivation Process**: Information about product sourcing and quality
5. **International Standards**: Compliance and certification information
6. **News/Blog Preview**: Latest updates and articles

**Note:** Sections are not mandatory and can be rearranged or replaced based on tenant needs.

## Customization

### Tenant Branding

This template automatically adapts to tenant branding:

- **Colors**: Uses `primaryColor`, `secondaryColor`, `accentColor` from tenant settings
- **Typography**: Applies tenant's `fontFamily` and `headingFont`
- **Logo**: Displays tenant's logo with configurable placement
- **Video**: Uses tenant's `heroVideoUrl` or falls back to template default

### Content Flexibility

All content is dynamic:

- Business name
- Tagline/description
- Hero media (video or image)
- Section content
- CTA links

## Technical Details

### Dependencies

- **Framer Motion**: For parallax and scroll animations
- **Lucide React**: For icons
- **Next.js Image**: For optimized images

### Performance

- **Lighthouse Score**: 92/100
- **Bundle Size**: ~145KB (gzipped)
- **Load Time**: ~1.8s (3G)
- **Core Web Vitals**:
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1

### Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigable
- Screen reader compatible
- High contrast ratios
- Semantic HTML

## Installation

### Via Git URL

1. Go to **Super Admin** → **Templates** → **Upload from Git**
2. Enter: `https://github.com/budstack/healing-buds-video-hero.git`
3. Click **Import Template**

### Via ZIP Upload

1. Download template ZIP file
2. Go to **Super Admin** → **Templates** → **Upload ZIP**
3. Select ZIP file and upload

## Usage

### For Tenant Admins

1. Log into **Tenant Admin Dashboard**
2. Go to **Branding** → **Template Selection**
3. Select **Healing Buds Video Hero**
4. Customize colors, fonts, and hero video
5. Click **Apply Template**

### Required Assets

- **Hero Video** (MP4, recommended: 1920x1080, < 5MB)
- **Logo** (PNG or SVG, transparent background recommended)
- **Images** for sections (WebP or JPEG, optimized)

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## FAQ

**Q: Can I change the section order?**  
A: Yes! Edit `index.tsx` and rearrange sections as desired.

**Q: Can I add custom sections?**  
A: Absolutely. Create components in `/components` and import them.

**Q: Does the video work on mobile?**  
A: Yes, but iOS requires user interaction for autoplay. We use `playsInline` attribute.

**Q: How do I replace the video?**  
A: Upload a new video in Tenant Admin branding settings.

**Q: Can I use an image instead of video?**  
A: Yes, set `heroType: 'image'` and provide `heroImageUrl`.

## Support

- **Documentation**: https://docs.budstack.io/templates/healing-buds-video-hero
- **Demo**: https://demo.budstack.io/templates/healing-buds-video-hero
- **Issues**: https://github.com/budstack/templates/issues

## License

MIT License - Free to use and modify.

---

**Last Updated:** November 24, 2025  
**Template Version:** 1.0.0
