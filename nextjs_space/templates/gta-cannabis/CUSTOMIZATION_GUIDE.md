# Vice City Cannabis Template - Customization Guide

## Overview

This guide explains how to customize the Vice City Cannabis template to match your brand identity while maintaining the bold, retro aesthetic.

## Color Scheme

### Default Colors

The template uses a vibrant, retro-inspired color palette:

- **Primary (Coral)**: `#FF6B6B` - Main CTA buttons, accents
- **Secondary (Teal)**: `#4ECDC4` - Secondary buttons, links
- **Accent (Yellow)**: `#FFE66D` - Highlights, decorative elements
- **Purple**: `#A463F2` - Additional accent color
- **Dark**: `#1A1A2E` - Text, dark sections
- **Light**: `#FAFAFA` - Backgrounds, light sections

### Customizing Colors

**Via Tenant Admin Dashboard:**

1. Go to Tenant Admin → Branding
2. Scroll to "Color Settings"
3. Update color values:
   - Primary Color: Main brand color
   - Secondary Color: Complementary color
   - Accent Color: Highlight color
4. Click "Save Changes"

**Color Recommendations:**

- Use high-contrast colors for accessibility
- Maintain readability (WCAG AA standards)
- Test colors on both light and dark backgrounds
- Keep brand consistency across all sections

## Typography

### Default Fonts

- **Headings**: `Inter`, `Montserrat` (bold, black weights)
- **Body Text**: `Inter`, sans-serif (regular, medium weights)

### Font Customization

**Via Tenant Admin Dashboard:**

1. Go to Tenant Admin → Branding
2. Find "Typography Settings"
3. Update `fontFamily` field:
   ```
   'YourFont', 'FallbackFont', sans-serif
   ```
4. Click "Save Changes"

**Recommended Font Pairings:**

- **Modern**: `'Poppins', 'Inter', sans-serif`
- **Classic**: `'Playfair Display', 'Lato', serif`
- **Bold**: `'Oswald', 'Roboto', sans-serif`
- **Friendly**: `'Nunito', 'Open Sans', sans-serif`

## Logo Customization

### Logo Upload

1. Go to Tenant Admin → Branding
2. Scroll to "Logo Settings"
3. Click "Upload Logo"
4. Select image file (PNG, JPG, SVG)
5. Recommended size: 200x200px to 400x400px
6. Logo appears in:
   - Navigation bar
   - Hero section (optional overlay)
   - Footer

### Logo Best Practices

- Use transparent background (PNG)
- Ensure logo works on both light/dark backgrounds
- Keep file size under 500KB
- Use vector format (SVG) for best quality

## Hero Section

### Hero Image

**Default Image:**
- Retro comic-style illustration with vibrant colors
- Path: `/templates/gta-cannabis/hawaii-illustration-retro-comic-style.jpg`

**Custom Hero Image:**

1. Go to Tenant Admin → Branding
2. Scroll to "Hero Section"
3. Click "Upload Hero Image"
4. Select image file
5. Recommended size: 1920x1080px (16:9 aspect ratio)
6. File formats: JPG, PNG, WebP
7. Keep file size under 2MB

**Hero Image Tips:**

- Use high-resolution images
- Ensure good text contrast
- Consider mobile responsiveness
- Retro/comic style matches template aesthetic

### Hero Content

**Title & Subtitle:**

1. Go to Tenant Admin → Branding
2. Scroll to "Page Content"
3. Update:
   - `homeHeroTitle`: Main headline
   - `homeHeroSubtitle`: Supporting text
4. Keep titles concise (5-10 words)
5. Make subtitles descriptive (10-20 words)

**CTA Buttons:**

- Primary CTA: "Book Consultation" (links to consultation page)
- Secondary CTA: "Learn More" (scrolls to about section)
- Button colors auto-adjust to theme colors

## About Section

### Team Image

**Default Image:**
- Retro comic-style portrait
- Path: `/templates/gta-cannabis/woman.jpg`

**Custom Team Image:**

1. Go to Tenant Admin → Branding
2. Scroll to "About Section"
3. Upload custom image
4. Recommended size: 800x1000px (portrait orientation)
5. Shows your team or brand personality

### About Content

**Title & Description:**

1. Go to Tenant Admin → Branding
2. Scroll to "Page Content"
3. Update:
   - `aboutTitle`: Section headline
   - `aboutDescription`: Your brand story
4. Keep title punchy (3-6 words)
5. Make description compelling (50-100 words)

**Stats Grid:**

Default stats (hardcoded in template):
- 5+ Years Experience
- 10K+ Happy Patients
- 100% Compliant

*To customize stats, you'll need to modify the `About.tsx` component.*

## Features Section

### Feature Icons & Content

Default features:
1. Certified & Compliant
2. Premium Quality
3. Expert Guidance
4. Fast Delivery
5. Patient Support
6. Verified Products

**Customizing Features:**

*Features are hardcoded in `Features.tsx` component.*

To add/modify features:
1. Edit `components/Features.tsx`
2. Update `features` array
3. Redeploy template

## Product Showcase

### Product Categories

Default categories:
- Flowers 🌸
- Oils 💧
- Edibles 🍬
- Vapes 💨

**Category Customization:**

*Categories are hardcoded in `ProductShowcase.tsx` component.*

To customize:
1. Edit `components/ProductShowcase.tsx`
2. Update `productCategories` array
3. Change icons, names, descriptions
4. Redeploy template

## Consultation CTA

### CTA Content

**Title & Description:**

Default:
- Title: "Ready to Get Started?"
- Description: "Book your free consultation..."

**Customizing:**

1. Edit `components/ConsultationCTA.tsx`
2. Update text content
3. Modify consultation steps
4. Adjust button styling
5. Redeploy template

## Footer

### Footer Content

**Sections:**
1. Company Info (business name, description, social links)
2. Quick Links (products, consultation, about, how it works)
3. Resources (FAQ, conditions, privacy, terms)
4. Contact Info (email, phone, address)

**Customizing Footer:**

1. Edit `components/Footer.tsx`
2. Update:
   - Social media links
   - Contact information
   - Navigation links
   - Copyright text
3. Redeploy template

## Animations

### Scroll Animations

The template uses Framer Motion for:
- Fade-in effects
- Slide-in transitions
- Parallax scrolling
- Hover effects

**Animation Settings:**

- Trigger: When element enters viewport
- Duration: 0.6s - 0.8s
- Delay: Staggered (0.1s - 0.2s per item)
- Easing: ease-in-out

**Customizing Animations:**

Edit `motion` components in each section:
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {/* Content */}
</motion.div>
```

## Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations

- Stacked layouts on mobile
- Larger touch targets (48x48px min)
- Simplified navigation
- Optimized images (WebP format)
- Reduced animation complexity

## Performance Optimization

### Image Optimization

1. Use Next.js `Image` component (done by default)
2. Serve images in WebP format
3. Implement lazy loading
4. Use responsive images
5. Compress images (TinyPNG, ImageOptim)

### Code Optimization

- Minimize bundle size
- Code splitting
- Tree shaking
- Lazy load components
- Optimize fonts (subset, preload)

## Accessibility

### WCAG AA Compliance

- Color contrast ratios > 4.5:1
- Keyboard navigation support
- Screen reader friendly
- Semantic HTML
- ARIA labels where needed

### Testing Accessibility

1. Use browser devtools (Lighthouse)
2. Test with screen readers (NVDA, JAWS)
3. Keyboard-only navigation
4. Color blindness simulators

## Advanced Customization

### Modifying Components

1. Clone template repository
2. Edit component files:
   - `components/Hero.tsx`
   - `components/About.tsx`
   - `components/Features.tsx`
   - etc.
3. Test locally: `yarn dev`
4. Push changes to GitHub
5. Re-upload template via Super Admin

### Adding New Sections

1. Create new component: `components/NewSection.tsx`
2. Import in `index.tsx`
3. Add to template render:
   ```tsx
   <NewSection {...props} />
   ```
4. Update `template.config.json` features
5. Redeploy template

### Styling Guidelines

- Use Tailwind CSS classes
- Add custom styles in `styles.css`
- Follow BEM naming convention
- Keep styles scoped to template
- Use CSS variables for theme colors

## Support & Resources

- **Template Documentation**: This guide
- **BudStack Docs**: https://docs.budstack.io
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion
- **Next.js**: https://nextjs.org/docs

## Frequently Asked Questions

**Q: Can I use my own fonts?**  
A: Yes, via Tenant Admin → Branding → Typography Settings

**Q: How do I change the color scheme?**  
A: Via Tenant Admin → Branding → Color Settings

**Q: Can I add more sections?**  
A: Yes, but requires editing component files and redeploying

**Q: Is the template mobile-friendly?**  
A: Yes, fully responsive with mobile-first design

**Q: Can I remove sections?**  
A: Yes, edit `index.tsx` and comment out unwanted sections

**Q: How do I update template content?**  
A: Via Tenant Admin → Branding → Page Content

## Conclusion

The Vice City Cannabis template offers extensive customization options while maintaining its signature retro aesthetic. For advanced modifications, clone the repository and edit component files directly.

For support or questions, contact the BudStack team.
