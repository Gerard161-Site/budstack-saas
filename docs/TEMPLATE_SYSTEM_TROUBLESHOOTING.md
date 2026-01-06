# Template System: Troubleshooting & Asset Management

## Overview

This guide covers troubleshooting and asset management for the TenantTemplate system, particularly focusing on S3-stored assets and template cloning issues.

> **Architecture Note**: Templates are cloned per-tenant. Assets are stored in tenant-specific S3 folders, not shared public directories.

---

## Asset Management (S3)

### Storage Location
Assets are stored in specific S3 paths for each tenant template version:

```
s3://bucket/7742/tenants/{tenantId}/templates/{timestamp}/
├── assets/
│   ├── images/      # Hero images, logos
│   ├── videos/      # Background videos
│   └── fonts/       # Custom fonts
└── manifest.json    # Asset registry
```

### Uploading Assets (Admin)

When cloning or updating a template via API:
1. **Prepare Assets**: Organize files in local directory structure
2. **Clone Template**: Use cloning API which handles S3 upload automatically
3. **Verify**: Check `TenantTemplate.s3Path` in database

### Updating Tenant Assets (User)

When a tenant uploads a new logo or hero image in Tenant Admin:
1. File uploaded to `s3://bucket/7742/tenants/{tenantId}/uploads/`
2. Database record updated (`TenantTemplate.logoUrl`)
3. `TenantThemeProvider` automatically uses new URL

---

## Troubleshooting Guide

### Issue 1: Images Not Loading (404)

**Symptoms:** Hero image or logo missing on storefront.

**Checklist:**
1. **Check Database Record**:
   ```sql
   SELECT "s3Path", "heroImageUrl", "logoUrl" 
   FROM "TenantTemplate" 
   WHERE id = 'active-template-id';
   ```
2. **Verify S3 URL Generation**:
   Ensure code uses `getFileUrl()` helper:
   ```typescript
   // CORRECT
   const url = await getFileUrl(`${s3Path}/assets/images/hero.jpg`);
   
   // INCORRECT
   const url = `/assets/images/hero.jpg`;
   ```
3. **Check S3 Permissions**: Ensure bucket policy allows public read (if public) or signed URLs are generating correctly.

### Issue 2: Template Styles Not Applying

**Symptoms:** Site looks unstyled or uses default colors instead of tenant theme.

**Checklist:**
1. **Verify Design System JSON**:
   Check `TenantTemplate.designSystem` column. Must contain valid JSON with `colors` object.
2. **Check Provider Wrapping**:
   Ensure `TenantThemeProvider` wraps the page content in `layout.tsx`.
3. **Inspect CSS Variables**:
   Open DevTools → Elements → Check root variables:
   ```css
   --tenant-color-primary: ...
   ```

### Issue 3: Updates Not Reflecting

**Symptoms:** Changed template or settings but site shows old version.

**Checklist:**
1. **Cache Clearing**: Next.js Data Cache might be holding old values. Revalidate path.
2. **Active Template Check**:
   Ensure `Tenant.activeTenantTemplateId` points to the *newly cloned* template ID, not an old one.
3. **Template Cloning**: If you updated the *Base Template*, existing tenants **will not** see changes until their template is re-cloned or upgraded.

### Issue 4: "File too large" Error

**Symptoms:** Uploading video hero fails.

**Limits:**
- Images: Max 5MB
- Videos: Max 50MB (Use external hosting like Vimeo/YouTube for larger files)

---

## Template Validation Checklist

Before releasing a template to the marketplace:

### Visuals
- [ ] **Hero Media**: Video/Image loads from S3 path
- [ ] **Logo**: Tenant logo replaces default placeholder
- [ ] **Favicon**: Uses tenant branding

### Functionality
- [ ] **Navigation Links**: All point to `/store/{slug}/...`
- [ ] **Contact Forms**: Submit to correct tenant email
- [ ] **Mobile Menu**: Works on small screens

### Design System
- [ ] **Primary Colors**: Used for main buttons/links
- [ ] **Fonts**: Headings use `var(--tenant-font-heading)`
- [ ] **Spacing**: Uses relative units (rem/em)

---

## Common S3 Paths Reference

| Asset Type | Standard Path Structure |
|------------|-------------------------|
| Template Root | `{tenantId}/templates/{timestamp}/` |
| Hero Image | `.../assets/images/hero-bg.jpg` |
| Logo | `.../assets/images/logo.png` |
| Fonts | `.../assets/fonts/` |
| Tenant Uploads | `{tenantId}/uploads/` |
