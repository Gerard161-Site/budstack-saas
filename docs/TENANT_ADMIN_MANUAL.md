
# BudStack Tenant Admin Manual

**Version 1.0 | Last Updated: November 2025**

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Branding & Customization](#branding--customization)
4. [Template Management](#template-management)
5. [The Wire Blog](#the-wire-blog)
6. [Product Management](#product-management)
7. [Order Management](#order-management)
8. [Settings & Configuration](#settings--configuration)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Accessing Your Tenant Admin Panel

1. **Login URL**: `https://budstack.to/tenant-admin`
2. **Your Store URL**: `https://[your-subdomain].budstack.to`
3. **Credentials**: Provided during onboarding

### First Steps After Onboarding

1. ✅ Complete your store branding
2. ✅ Review and customize product offerings
3. ✅ Test the customer experience
4. ✅ Set up your custom domain (optional)

---

## Dashboard Overview

### Main Dashboard Features

**Quick Stats**
- Total orders (current month)
- Revenue overview
- Active customers
- Pending consultations

**Navigation Menu**
- **Dashboard**: Overview and analytics
- **Branding**: Customize your store appearance
- **Products**: Manage product catalog
- **Orders**: View and manage customer orders
- **Settings**: Account and store settings

### Viewing Your Live Store

Click the **"View Live Store"** button in the top right corner to preview your customer-facing website.

---

## Branding & Customization

### The 6-Tab Branding System

#### 1. Design Tab
**Logo Management**
- Upload your logo (PNG, JPG, SVG)
- Recommended size: 200x80px
- Transparent background preferred

**Hero Section**
- Main headline (default: "Welcome to [Your Business]")
- Subheadline/tagline
- Call-to-action button text

**Featured Image**
- Hero section background image
- Recommended size: 1920x1080px

#### 2. Colors Tab
**Primary Brand Colors**
- Primary color: Main brand color
- Secondary color: Accent color
- Background color: Page background

**Text Colors**
- Text color: Main content text
- Heading color: Headlines and titles

**Interactive Elements**
- Link color: Hyperlinks
- Button color: Call-to-action buttons
- Button text color: Text on buttons

**Feedback Colors**
- Success color: Confirmations
- Warning color: Alerts
- Error color: Error messages

#### 3. Typography Tab
**Font Selection**
- Heading font: For titles and headings
- Body font: For paragraphs and content
- Font size: Base text size (14-18px recommended)

**Common Font Pairs**
- Modern: Montserrat + Open Sans
- Professional: Roboto + Lato
- Classic: Playfair Display + Source Sans Pro
- Clean: Inter + Inter

#### 4. Layout Tab
**Header Settings**
- Header style: Transparent, solid, or sticky
- Navigation position: Left, center, or right

**Layout Options**
- Container width: Full-width or contained
- Section spacing: Compact, normal, or spacious
- Border radius: Sharp, rounded, or circular

**Footer Settings**
- Footer style: Minimal, standard, or detailed
- Social media links

#### 5. Content Tab
**About Section**
- Company description
- Mission statement
- Years of experience

**Services Overview**
- Service highlights
- Key differentiators

**Contact Information**
- Business address
- Phone number
- Email address
- Operating hours

**Legal Pages**
- Terms of service
- Privacy policy
- Cookie policy
- Regulatory compliance

#### 6. Advanced Tab
**Custom CSS**
- Add custom styling code
- Override default styles
- Advanced customization

**Meta Tags**
- SEO title
- Meta description
- Keywords
- Open Graph tags for social sharing

**Scripts**
- Analytics tracking codes
- Third-party integrations
- Custom JavaScript

### Saving Your Changes

1. Fill in the fields you want to customize
2. Preview changes in real-time (if available)
3. Click **"Save Branding"**
4. Visit your live store to see changes

### Branding Best Practices

✅ **Do:**
- Use high-quality images
- Choose accessible color combinations (good contrast)
- Keep your design consistent across all tabs
- Test on mobile devices
- Update content regularly

❌ **Don't:**
- Use copyrighted images without permission
- Choose colors with poor contrast
- Overload pages with too much text
- Forget to save your changes

---

## Template Management

### Overview
BudStack uses a **TenantTemplate** system where you start with a base template design and then clone it to create your own unique version.

### Template Actions

1. **Browse Marketplace**: View available base templates (Medical, Recreational, Minimalist, etc.)
2. **Clone Template**: When you select a template, a private copy is created for your store.
3. **Switch Active Template**: You can have multiple cloned templates and switch between them instantly.

### Customizing Your Template
Once cloned, your template assets are stored privately in S3 storage.
- **Upload Assets**: Upload your own hero videos, images, and fonts.
- **Edit Design System**: Customize colors, fonts, and spacing variables.
- **Safety**: Your changes are isolated and won't be affected by system-wide updates unless you choose to upgrade.

---

## The Wire Blog

### Managing Articles
Your store comes with access to **The Wire**, a shared cannabis news and education network.

- **URL**: `https://[your-subdomain].budstack.to/store/[slug]/the-wire`
- **Content**: Automatically syndicated industry news, compliance updates, and educational articles.
- **Styling**: Blog pages automatically adapt to your active template's color scheme and branding.

### Article Visibility
*Coming Soon*: Ability to pin specific articles or hide content not relevant to your region.

---

## Product Management

### Understanding the Product Catalog

Your product catalog is synced with the Doctor Green API, providing:
- Real-time inventory
- Up-to-date pricing
- Product specifications
- Compliance information

### Viewing Products

1. Navigate to **Products** from the dashboard
2. Browse available products
3. Use filters to find specific items:
   - Category (flower, oil, edibles, etc.)
   - Brand
   - THC/CBD content
   - Price range

### Product Display Options

**On/Off Toggle**
- Hide specific products from your store
- Products remain in the catalog but won't display to customers

**Featured Products**
- Mark products as "Featured" to highlight on your homepage
- Recommend up to 6 featured products

### Product Information

Each product displays:
- Product name and image
- Brand and category
- THC/CBD percentages
- Price per unit
- Description and effects
- Compliance information

### Managing Product Visibility

**Coming Soon**: Full product management where you can:
- Set custom pricing (within regulatory limits)
- Add product descriptions
- Create product bundles
- Manage inventory alerts

---

## Order Management

### Viewing Orders

Navigate to **Orders** to see:
- Recent orders
- Order status
- Customer information
- Order details

### Order Information

Each order shows:
- Order number and date
- Customer name and email
- Shipping address
- Product details and quantities
- Total amount
- Order status

### Order Statuses

- **Pending**: New order awaiting review
- **Processing**: Order confirmed, being prepared
- **Shipped**: Order dispatched to customer
- **Delivered**: Order received by customer
- **Cancelled**: Order cancelled

### Order Actions

**Current Actions:**
- View order details
- Export order data
- Contact customer

**Coming Soon:**
- Update order status
- Process refunds
- Generate shipping labels
- Send order notifications

---

## Settings & Configuration

### Account Settings

**Profile Information**
- Business name
- Contact email
- Phone number
- Tax identification

**Password & Security**
- Change password
- Two-factor authentication (coming soon)
- Session management

### Store Settings

**Business Details**
- Legal business name
- Licenses and certifications
- Operating hours
- Service areas

**Notification Preferences**
- Order notifications
- Customer inquiry alerts
- System updates
- Marketing communications

### Custom Domain Setup

**Request Custom Domain**
1. Purchase your domain (e.g., yourbrand.com)
2. Contact BudStack support
3. We'll configure DNS settings
4. Domain typically active within 24-48 hours

**Benefits:**
- Professional branding
- Better SEO
- Customer trust
- Brand consistency

---

## Best Practices

### Store Launch Checklist

**Before Going Live:**
- [ ] Logo uploaded and displays correctly
- [ ] Brand colors match your identity
- [ ] All contact information is accurate
- [ ] About section completed
- [ ] Legal pages reviewed
- [ ] Featured products selected
- [ ] Test order placed successfully
- [ ] Mobile experience verified
- [ ] All pages load quickly

### Ongoing Maintenance

**Weekly:**
- Review new orders
- Check product availability
- Respond to customer inquiries
- Update featured products

**Monthly:**
- Review analytics
- Update seasonal content
- Check for system updates
- Backup important data

**Quarterly:**
- Refresh hero images
- Update about section
- Review pricing strategy
- Evaluate customer feedback

### Customer Experience Tips

1. **High-Quality Images**: Invest in professional product photography
2. **Clear Descriptions**: Help customers understand products
3. **Fast Response**: Answer inquiries within 24 hours
4. **Transparent Policies**: Clear shipping and return information
5. **Educational Content**: Blog posts about medical cannabis
6. **Trust Signals**: Display licenses and certifications
7. **Mobile Optimization**: Most customers shop on mobile

---

## Troubleshooting

### Common Issues

**Can't Log In**
- Verify you're using the correct email
- Use "Forgot Password" to reset
- Clear browser cache and cookies
- Try a different browser

**Changes Not Appearing**
- Click "Save" after making changes
- Refresh your store page (Ctrl+F5)
- Wait 5 minutes for CDN cache to clear
- Check browser console for errors

**Images Not Uploading**
- Check file size (max 5MB)
- Use supported formats (JPG, PNG, SVG)
- Check file name (no special characters)
- Verify stable internet connection

**Products Not Displaying**
- Check product visibility toggles
- Verify Doctor Green API connection
- Contact support for API issues
- Check category filters

**Orders Not Showing**
- Refresh the orders page
- Check date filter settings
- Verify order status filters
- Contact support if orders are missing

### Getting Help

**Support Channels:**
- Email: support@budstack.to
- Support hours: Monday-Friday, 9 AM - 6 PM PST
- Response time: Within 24 hours
- Emergency hotline: (Coming soon)

**Documentation:**
- User manuals: budstack.to/docs
- Video tutorials: budstack.to/videos
- FAQ: budstack.to/faq
- Community forum: (Coming soon)

**Technical Issues:**
- Check status page: status.budstack.to
- Report bugs: bugs@budstack.to
- Feature requests: features@budstack.to

---

## Appendix

### Keyboard Shortcuts

- `Ctrl+S`: Save current form
- `Ctrl+K`: Search
- `Ctrl+/`: Show shortcuts

### Glossary

- **Tenant**: Your individual store on BudStack platform
- **Subdomain**: Your unique URL (yourname.budstack.to)
- **SKU**: Stock Keeping Unit (product identifier)
- **API**: Application Programming Interface (connects to Doctor Green)
- **CDN**: Content Delivery Network (faster image loading)

### Compliance Reminders

⚠️ **Important:**
- Follow all local cannabis regulations
- Verify customer age and eligibility
- Keep licenses current
- Maintain accurate records
- Report as required by law

---

## Quick Reference Card

### Essential URLs
- Admin Dashboard: `budstack.to/tenant-admin`
- Your Store: `[your-subdomain].budstack.to`
- Support: `support@budstack.to`

### Key Actions
- Save Branding: Go to Branding tab → Make changes → Save
- View Orders: Dashboard → Orders
- Update Logo: Branding → Design → Upload Logo
- View Store: Click "View Live Store" button

### Support Contact
**Email**: support@budstack.to  
**Hours**: Mon-Fri, 9 AM - 6 PM PST  
**Response**: Within 24 hours

---

**End of Tenant Admin Manual**

*For the latest version of this manual, visit: budstack.to/docs/tenant-admin*
