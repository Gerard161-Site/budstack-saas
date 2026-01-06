# BudStack Subdomain DNS Troubleshooting

## Current Situation
- ✅ Root domain works: https://budstack.to
- ❌ Subdomains don't work: https://portugalbuds.budstack.to
- Nameservers: Pointed to Abacus.AI
- Deployment: Successfully deployed to budstack.to

## The Problem

Your app is correctly deployed, but **wildcard subdomain routing** (`*.budstack.to`) is not configured at the Abacus.AI platform level.

### What's Happening:
1. DNS resolves `budstack.to` → ✅ Works (app responds)
2. DNS resolves `portugalbuds.budstack.to` → ❌ Fails (no routing rule)

### Why This Happens:
When nameservers are with Abacus.AI, **they control all DNS routing**. The platform needs to be configured to route `*.budstack.to` to your application.

---

## Solution Steps

### Step 1: Check App Management Console

Visit: **https://apps.abacus.ai/chatllm/?appId=appllm_engineer**

Look for:
- Your BudStack app conversation
- Click to open app management
- Look for "Domain Settings" or "DNS Configuration" option
- Check if there's a wildcard subdomain setting

**If you find it:**
- Enable wildcard routing for `*.budstack.to`
- Point it to your app deployment

**If you DON'T find it:**
- This feature may not be available in the UI
- Proceed to Step 2

---

### Step 2: Contact Abacus.AI Support

Since wildcard DNS routing is typically a platform-level configuration, you'll likely need Abacus.AI support to enable it.

#### Email Template:

```
To: support@abacus.ai
Subject: Enable Wildcard Subdomain Routing for budstack.to

Hi Abacus.AI Support Team,

I have successfully deployed my BudStack multi-tenant application to budstack.to. 
The root domain is working correctly, but I need wildcard subdomain routing enabled 
to support my multi-tenant architecture.

CURRENT STATUS:
- Root domain: https://budstack.to ✅ WORKING
- Subdomains: https://portugalbuds.budstack.to ❌ NOT WORKING

SETUP DETAILS:
- Domain: budstack.to
- Nameservers: Already pointed to Abacus.AI
- App deployment: Successfully deployed to budstack.to
- Required routing: *.budstack.to → my BudStack application

TECHNICAL REQUIREMENTS:
- Enable wildcard DNS routing for *.budstack.to
- Route all subdomain traffic to the same app deployment
- Maintain SSL/TLS certificates for wildcard subdomains

TENANT SUBDOMAINS NEEDED:
- portugalbuds.budstack.to
- healingbuds.budstack.to
- cooleysbuds.budstack.to
- gerrysbuds.budstack.to
- (and any future tenant subdomains)

CURRENT MIDDLEWARE CONFIGURATION:
My app's middleware is already configured to detect subdomains and route to the 
appropriate tenant. I just need the platform to route *.budstack.to traffic to my app.

Please let me know:
1. If wildcard subdomain routing can be enabled for my deployment
2. Any additional configuration required on my end
3. Estimated timeline for this to be activated

Thank you for your assistance!

Best regards,
[Your Name]
```

---

### Step 3: Temporary Workaround (While Waiting)

If you need immediate access while waiting for wildcard DNS configuration, use the **path-based fallback URLs**:

Your app still supports path-based routing as a fallback:
- ✅ https://budstack.to/store/portugalbuds
- ✅ https://budstack.to/store/healingbuds
- ✅ https://budstack.to/store/cooleysbuds
- ✅ https://budstack.to/store/gerrysbuds

These will work immediately and access the same tenants!

---

## Understanding DNS Configuration with Abacus.AI

### What You SHOULD NOT Do:
❌ **Don't try to add CNAME records manually** anywhere
- Your nameservers are with Abacus.AI
- They control all DNS routing
- Manual CNAME records will conflict (causing Error 1014)

### What Abacus.AI Needs to Configure:
At their DNS infrastructure level, they need to add a routing rule:

```
Route: *.budstack.to
Target: Your app deployment (budstack.to)
Type: Wildcard subdomain routing
```

This is NOT something you can configure yourself - it's a platform-level setting.

---

## Verification After Configuration

Once Abacus.AI enables wildcard routing, test:

### Test 1: DNS Resolution
```bash
# Check if subdomain resolves
dig portugalbuds.budstack.to

# Should show Abacus.AI nameservers
```

### Test 2: Browser Access
Visit each subdomain:
- https://portugalbuds.budstack.to
- https://healingbuds.budstack.to
- https://cooleysbuds.budstack.to
- https://gerrysbuds.budstack.to

Expected result: Each should load with tenant-specific branding

### Test 3: SSL Certificates
Check certificate in browser:
- Should show valid SSL for *.budstack.to (wildcard certificate)
- Issued by Abacus.AI's certificate authority

---

## Why This Architecture Requires Platform Support

### Traditional DNS Setup:
With traditional DNS (Cloudflare, Namecheap, etc.), you'd add:
```
Type: CNAME
Name: *
Target: your-server.com
```

### Abacus.AI Managed DNS:
With Abacus.AI nameservers:
- They control the DNS zone file
- Routing rules are configured at the platform level
- This ensures proper SSL, load balancing, and edge routing
- You need their support team to add the wildcard rule

---

## Expected Timeline

### If Available in UI:
- Immediate (5-15 minutes for DNS propagation)

### If Requires Support:
- Support response: 1-24 hours
- Configuration: 5-30 minutes
- DNS propagation: 5-15 minutes
- **Total: 1-48 hours**

---

## What Your App Already Has Configured

Your BudStack app is **100% ready** for subdomain routing:

### ✅ Code Ready:
- Middleware detects subdomains
- Tenant lookup by subdomain works
- Template rendering is configured
- Database has active tenants

### ✅ Environment Ready:
```env
NEXT_PUBLIC_BASE_DOMAIN=budstack.to
```

### ✅ URLs Generated:
All tenant URLs are formatted correctly:
- https://portugalbuds.budstack.to (healing-buds-video template)
- https://healingbuds.budstack.to (healing-buds-video template)
- https://cooleysbuds.budstack.to (healing-buds-video template)
- https://gerrysbuds.budstack.to (default template)

**The ONLY missing piece is platform-level wildcard DNS routing.**

---

## Next Steps (In Order)

1. **Check App Management Console** (5 minutes)
   - Look for domain/DNS settings
   - Try to enable wildcard routing

2. **Contact Abacus.AI Support** (if not available in UI)
   - Use the email template above
   - Include all requested details
   - Be specific about wildcard subdomain requirement

3. **Use Path-Based URLs** (while waiting)
   - https://budstack.to/store/{slug}
   - Fully functional right now
   - Same tenant experience

4. **Test Subdomains** (after configuration)
   - Wait 5-15 minutes after support confirms
   - Test all 4 tenant subdomains
   - Verify SSL certificates
   - Check tenant branding loads correctly

---

## Additional Information for Support Team

If Abacus.AI support needs technical details:

### Your App Architecture:
- **Platform**: Next.js 14 (App Router)
- **Deployment**: budstack.to
- **Multi-Tenancy**: Subdomain-based tenant detection
- **Middleware**: Detects subdomain from `hostname` header
- **Database**: PostgreSQL with tenant table
- **SSL**: Requires wildcard certificate (*.budstack.to)

### Middleware Logic:
```javascript
// From middleware.ts
if (currentHost.endsWith('.budstack.to')) {
  subdomain = currentHost.replace('.budstack.to', '');
  if (subdomain && subdomain !== 'www') {
    response.headers.set('x-tenant-subdomain', subdomain);
  }
}
```

### Required Headers:
Your app expects the platform to pass the full `host` header:
- `host: portugalbuds.budstack.to` → Extracts `portugalbuds`
- Queries database for tenant with `subdomain = 'portugalbuds'`
- Renders tenant-specific template and content

---

## FAQs

### Q: Can I configure this myself?
**A:** No, since nameservers are with Abacus.AI, only they can configure DNS routing.

### Q: How long until subdomains work?
**A:** Depends on whether it's available in UI (minutes) or requires support (1-48 hours).

### Q: Will my existing setup break?
**A:** No, root domain and path-based URLs will continue working.

### Q: Do I need to change my code?
**A:** No, your code is already configured correctly. This is purely DNS routing.

### Q: What about SSL certificates?
**A:** Abacus.AI should automatically provision a wildcard SSL certificate (*.budstack.to).

### Q: Can I use individual subdomains instead of wildcard?
**A:** Technically yes, but you'd need to add each tenant subdomain manually. Wildcard is the scalable solution for multi-tenant SaaS.

---

## Summary

✅ **Your App**: Ready for subdomain routing  
✅ **Your Domain**: Successfully deployed to budstack.to  
✅ **Your DNS**: Nameservers correctly pointed to Abacus.AI  
❌ **Missing**: Platform-level wildcard DNS routing configuration  

**Action Required**: Contact Abacus.AI support to enable `*.budstack.to` wildcard routing.

**Temporary Solution**: Use `https://budstack.to/store/{slug}` URLs while waiting.
