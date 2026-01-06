# Welcome, Designer! 👋

This is your quick-start guide to working on BudStack core pages.

## 🚀 Quick Start (5 Minutes)

### Step 1: Read the Main Guide
**📖 Start here**: `CORE_PAGES_DESIGNER_GUIDE.md`

This is your **bible** for working on core pages. It explains:
- What core pages are
- The 5 pages you'll be designing
- Critical rules (CSS variables, no hardcoded colors!)
- Code examples
- Testing procedures

**Time**: 30 minutes

---

### Step 2: Set Up Your Environment
**📖 Follow this**: `LOCAL_DEVELOPMENT_SETUP.md`

This will help you:
- Install prerequisites (Node.js, Docker)
- Start the local database
- Run the development server
- Access test accounts

**Time**: 15 minutes

---

### Step 3: Understand File Structure
**📖 Reference this**: `CORE_PAGES_FILE_STRUCTURE.md`

This shows you:
- Where every file lives
- What to edit
- Where to put assets
- Component library reference

**Time**: 15 minutes (as needed)

---

## 📍 What Pages Are You Designing?

### Platform Pages (budstack.to)

| Page | File Location | Difficulty |
|------|--------------|------------|
| **Platform Home** | `/app/page.tsx` | ⭐⭐ Medium |

**Note**: Platform pages use **fixed BudStack branding** (NOT tenant CSS variables)

### Tenant Storefront Pages (/store/[slug])

| Page | File Location | Difficulty |
|------|--------------|------------|
| **Contact** | `/app/store/[slug]/contact/page.tsx` | ⭐ Easy (start here!) |
| **How It Works** | `/app/store/[slug]/how-it-works/page.tsx` | ⭐⭐ Medium |
| **Conditions** | `/app/store/[slug]/conditions/page.tsx` | ⭐⭐ Medium |
| **Products** | `/app/store/[slug]/products/page.tsx` | ⭐⭐⭐ Hard |
| **Consultation** | `/app/store/[slug]/consultation/page.tsx` | ⭐⭐⭐ Hard |

**Note**: Tenant pages MUST use **CSS variables** for all colors/fonts

---

## ⚡ Quick Commands

```bash
# Start Docker database
cd nextjs_space
docker-compose up -d

# Install dependencies
yarn install

# Set up database
yarn prisma generate
yarn prisma migrate deploy
yarn prisma db seed

# Start development server
yarn dev
```

**Access the app**: http://localhost:3000

---

## 🎨 Key Rules (Read This!)

### ✅ DO

1. **Always use CSS variables for colors**
   ```tsx
   <div style={{ backgroundColor: 'var(--tenant-color-primary)' }}>
   ```

2. **Make content tenant-aware**
   ```tsx
   <h1>{tenant.businessName}'s Store</h1>
   ```

3. **Test on multiple tenants**
   - http://localhost:3000/store/cooleysbuds (Wellness theme)
   - http://localhost:3000/store/healingbuds (Medical UK theme - Restored)
   - http://localhost:3000/store/portugalbuds (GTA theme)

---

### ❌ DON'T

1. **Don't hardcode colors**
   ```tsx
   ❌ <div className="bg-blue-500 text-white">
   ✅ <div style={{ backgroundColor: 'var(--tenant-color-primary)', color: '#fff' }}>
   ```

2. **Don't hardcode business names**
   ```tsx
   ❌ <h1>Welcome to HealingBuds</h1>
   ✅ <h1>Welcome to {tenant.businessName}</h1>
   ```

3. **Don't use template-specific components in core pages**

---

## 🧪 Test Accounts

**Super Admin**:
- Email: `admin@budstack.io`
- Password: `admin123`

**Tenant Admin (Cooleys Buds)**:
- Email: `admin@cooleysbuds.com`
- Password: `admin123`

---

## 📦 Where to Put Assets

```
/public/core-pages/
├── conditions/
│   ├── chronic-pain.jpg
│   ├── anxiety.jpg
│   └── ...
├── how-it-works/
│   ├── step-1.svg
│   ├── step-2.svg
│   └── step-3.svg
└── icons/
    ├── check.svg
    └── ...
```

**Reference them**:
```tsx
<Image src="/core-pages/conditions/chronic-pain.jpg" alt="Chronic Pain" />
```

---

## 🐛 Troubleshooting

### Database won't connect?
```bash
docker ps  # Check if running
docker-compose up -d  # Start if not
```

### Port 3000 in use?
```bash
PORT=3001 yarn dev  # Use different port
```

### Changes not showing?
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Restart dev server

### CSS variables not working?
- Make sure you're on a tenant page (`/store/[slug]/...`)
- Check browser DevTools → Computed styles
- Verify tenant has a template assigned

---

## 📚 Full Documentation

**All guides are in the root directory:**

| File | Purpose |
|------|----------|
| `DESIGNER_DOCUMENTATION_INDEX.md` | 📖 Complete index of all docs |
| `CORE_PAGES_DESIGNER_GUIDE.md` | 🎨 Main design guide (START HERE) |
| `CORE_PAGES_FILE_STRUCTURE.md` | 📁 File location reference |
| `LOCAL_DEVELOPMENT_SETUP.md` | 💻 Environment setup |
| `COMPREHENSIVE_THEMING_GUIDE.md` | 🎨 Theming deep dive |

---

## 🎯 Your First Task

**Start with the Contact page** (easiest):

1. Open `/app/store/[slug]/contact/page.tsx`
2. Improve the visual design
3. Ensure all colors use CSS variables
4. Test on 3 different tenants
5. Check responsive design (mobile, tablet, desktop)
6. Verify accessibility (Lighthouse score 90+)

---

## 💬 Questions?

- Check `CORE_PAGES_DESIGNER_GUIDE.md` → Common Pitfalls section
- Review `LOCAL_DEVELOPMENT_SETUP.md` → Troubleshooting section
- Look at existing pages like `/app/store/[slug]/about/page.tsx` for examples

---

**Good luck! 🚀**

You've got this! The documentation is comprehensive, and the existing codebase has good examples to follow.
