# 🚀 Quick Start Guide

## 5-Minute Setup

### Step 1: Upload to GitHub

1. **Create New Repository:**
   ```bash
   # On GitHub.com
   - Click "New Repository"
   - Name: healingbuds-template
   - Description: Premium medical cannabis template
   - Public or Private
   - Don't initialize with README (we have one)
   - Click "Create Repository"
   ```

2. **Upload Files:**
   ```bash
   # If using Git CLI
   cd healingbuds-template-package/
   git init
   git add .
   git commit -m "Initial commit - Healing Buds Template v2.0.0"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/healingbuds-template.git
   git push -u origin main
   ```

   **OR use GitHub Desktop / Upload via Web Interface**

3. **Copy GitHub URL:**
   ```
   https://github.com/YOUR-USERNAME/healingbuds-template.git
   ```

---

### Step 2: Upload to BudStack

1. **Login as Super Admin:**
   - URL: https://budstack.to/auth/login
   - Email: `superadmin@budstack.io`
   - Password: (your password)

2. **Navigate to Templates:**
   - Go to: https://budstack.to/super-admin/templates
   - Or: Dashboard > Template Management

3. **Upload Template:**
   - Click "Upload New Template" button
   - Paste GitHub URL: `https://github.com/YOUR-USERNAME/healingbuds-template.git`
   - Click "Upload"
   - Wait for success message

---

### Step 3: Apply to Tenant

1. **Login as Tenant Admin:**
   - URL: https://budstack.to/auth/login
   - Email: `admin@healingbuds.pt`
   - Password: `admin123`

2. **Navigate to Branding:**
   - Go to: https://budstack.to/tenant-admin/branding
   - Or: Dashboard > Branding

3. **Select Template:**
   - Find dropdown: "Template Selection"
   - Select: "Healing Buds Video Hero"
   - Click "Save Changes"
   - Wait for green success message

4. **Hard Refresh:**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

---

### Step 4: View Your Store

**Visit:** https://budstack.to/store/healingbuds

**✅ You should see:**
- Emerald green color scheme
- Consistent branding across all pages
- Smooth animations
- Professional layout

---

## 📦 Package Contents

```
healingbuds-template-package/
├── README.md                  # Full documentation
├── QUICK_START.md             # This file
├── CHANGELOG.md               # Version history
├── CUSTOMIZATION_GUIDE.md     # How to customize
├── INSTALLATION.md            # Detailed install
├── template.config.json       # Metadata
├── defaults.json              # Design system
├── index.tsx                  # Main component
├── styles.css                 # Custom styles
└── components/                # All sections
    ├── Hero.tsx
    ├── AboutHero.tsx
    ├── ValueProps.tsx
    ├── Cultivation.tsx
    ├── International.tsx
    ├── News.tsx
    └── Footer.tsx
```

---

## ⚙️ Customization (Optional)

### Change Colors

Edit `defaults.json`:

```json
{
  "designSystem": {
    "colors": {
      "primary": "#YOUR_COLOR",     // Main brand color
      "secondary": "#YOUR_COLOR",   // Secondary color
      "accent": "#YOUR_COLOR"       // Highlight color
    }
  }
}
```

### Change Fonts

Edit `defaults.json`:

```json
{
  "designSystem": {
    "typography": {
      "fontFamily": {
        "base": "'Your Font', sans-serif",
        "heading": "'Your Heading Font', serif"
      }
    }
  }
}
```

### Upload Logo

1. Go to: Tenant Admin > Branding
2. Click "Upload Logo"
3. Select file (PNG/SVG, 200x80px recommended)
4. Click "Save"

### Upload Hero Video

1. Go to: Tenant Admin > Branding
2. Click "Upload Hero Video"
3. Select file (MP4, max 10MB, 1920x1080 recommended)
4. Click "Save"

---

## 🐛 Troubleshooting

### Template Not Showing?

1. **Check Upload Status:**
   - Go to: Super Admin > Templates
   - Verify "Healing Buds Video Hero" is listed
   - Status should be "Active"

2. **Re-apply Template:**
   - Tenant Admin > Branding
   - Select template again
   - Save Changes

3. **Hard Refresh:**
   - `Ctrl+Shift+R` or `Cmd+Shift+R`

### Changes Not Appearing?

1. **Clear Cache:**
   - Browser cache
   - CDN cache (if applicable)

2. **Check DevTools:**
   - Press `F12`
   - Look for CSS variables:
     ```css
     --tenant-color-primary: #059669;
     ```
   - If missing, re-apply template

### White Text on White Background?

**This is FIXED in v2.0.0!**

- Ensure you uploaded v2.0.0
- Re-apply template
- Hard refresh

---

## 📞 Support

- **Documentation:** See README.md
- **GitHub Issues:** Report bugs
- **Email:** support@healingbuds.pt
- **Platform Docs:** https://budstack.to/docs

---

## ✅ Success Checklist

- [ ] Files uploaded to GitHub
- [ ] Template uploaded to BudStack
- [ ] Template applied to tenant
- [ ] Hard refresh performed
- [ ] Storefront displays correctly
- [ ] All pages use consistent theme
- [ ] Logo shows correctly
- [ ] Video plays (if uploaded)
- [ ] Mobile responsive
- [ ] No console errors

---

**🎉 Congratulations! Your template is live!**

**Next Steps:**
- Customize colors and fonts
- Upload logo and hero video
- Add custom content
- Test on all devices
- Share with your team

---

**Template Version:** 2.0.0  
**Last Updated:** November 25, 2025  
**Made with 💚 by Healing Buds**
