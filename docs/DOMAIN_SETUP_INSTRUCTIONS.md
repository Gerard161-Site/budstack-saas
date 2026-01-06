# BudStack Domain Configuration with Abacus.AI DNS

## Current Situation
- Domain: `budstack.to`
- Nameservers: Switched to Abacus.AI
- Required: Wildcard subdomain routing for tenants
- Target URLs: `portugalbuds.budstack.to`, `healingbuds.budstack.to`, etc.

## ⚠️ Important: DNS Now Managed by Abacus.AI

Since your nameservers point to Abacus.AI, you **cannot** manually configure DNS records (CNAME/A records). Instead, you must configure domain mapping through the **Abacus.AI App Management Console**.

---

## Step-by-Step Configuration

### Step 1: Access App Management Console

Visit: **https://apps.abacus.ai/chatllm/?appId=appllm_engineer**

### Step 2: Configure Custom Domain

1. **Find Your App** in the conversation list
2. **Click on the app** to open management options
3. **Look for "Domain Settings"** or "Custom Domain" option
4. **Add your domain**: `budstack.to`

### Step 3: Configure Wildcard Subdomain Support

You need to configure the following:

#### **Primary Domain:**
```
Domain: budstack.to
Type: Root domain
```

#### **Wildcard Subdomain:**
```
Domain: *.budstack.to
Type: Wildcard
Target: healingbuds.abacusai.app (or your deployment URL)
```

### Step 4: Verify Configuration

After configuration, test these URLs:
- https://budstack.to (platform landing page)
- https://portugalbuds.budstack.to (tenant subdomain)
- https://healingbuds.budstack.to (tenant subdomain)
- https://cooleysbuds.budstack.to (tenant subdomain)

---

## Alternative: Deploy with Custom Hostname

If the App Management Console doesn't support wildcard subdomain configuration, you can:

### Option A: Deploy to budstack.to directly

The app is currently deployed to `healingbuds.abacusai.app`. You can redeploy to use `budstack.to` as the base hostname, which might automatically configure wildcard support.

**Would you like me to:**
1. Redeploy the app with `budstack.to` as the hostname?
2. This will change the deployment URL from `healingbuds.abacusai.app` to `budstack.to`

### Option B: Configure through Support

If wildcard subdomain configuration is not available in the UI:

**Contact Abacus.AI Support:**
- Email: support@abacus.ai
- Subject: "Wildcard Subdomain Configuration for budstack.to"
- Request: Enable `*.budstack.to` wildcard routing to your app deployment

**Provide these details:**
- Your app ID: (from the app management console)
- Current deployment: `healingbuds.abacusai.app`
- Desired setup: `*.budstack.to` → routes to app with tenant detection
- Specific subdomains needed:
  - portugalbuds.budstack.to
  - healingbuds.budstack.to
  - cooleysbuds.budstack.to
  - gerrysbuds.budstack.to

---

## Current App Configuration

Your BudStack app is already configured for subdomain routing:

### Middleware Priority:
1. ✅ Subdomain detection (`*.budstack.to`)
2. ✅ Custom domain detection
3. ✅ Fallback path-based routing (`/store/{slug}`)

### Environment:
```env
NEXT_PUBLIC_BASE_DOMAIN=budstack.to
```

### Tenant URLs (once DNS is configured):
- https://portugalbuds.budstack.to
- https://healingbuds.budstack.to
- https://cooleysbuds.budstack.to
- https://gerrysbuds.budstack.to

---

## Troubleshooting "Not Found" Error

### Current Issue:
You're getting "Not Found" because:
1. ✅ App code is ready for subdomain routing
2. ✅ Environment variable is set correctly
3. ❌ DNS wildcard routing is NOT configured at the platform level

### What Needs to Happen:
**Abacus.AI's infrastructure** needs to route `*.budstack.to` requests to your deployed app at `healingbuds.abacusai.app`.

This is NOT something you can configure through DNS records anymore (since NS is with Abacus.AI). It must be configured through:
- The App Management Console UI, OR
- By Abacus.AI support team

---

## Recommended Actions (In Order)

### 1. Check App Management Console First
- Visit: https://apps.abacus.ai/chatllm/?appId=appllm_engineer
- Look for domain/DNS settings
- Add `budstack.to` and `*.budstack.to` if available

### 2. If Not Available in UI
**I can redeploy your app to use `budstack.to` as the primary hostname.**

This might automatically enable wildcard support:
```bash
# Would deploy to: budstack.to
# Which should handle: *.budstack.to automatically
```

### 3. If That Doesn't Work
- Contact Abacus.AI support
- Request wildcard subdomain routing configuration
- Provide app details and domain name

---

## Path-Based URLs Still Work

While you're configuring DNS, these URLs still work as a fallback:

- ✅ https://healingbuds.abacusai.app/store/portugalbuds
- ✅ https://healingbuds.abacusai.app/store/healingbuds
- ✅ https://healingbuds.abacusai.app/store/cooleysbuds

---

## Next Steps

**Please let me know:**

1. Would you like me to **redeploy the app with `budstack.to` as the hostname**?
   - This changes the main deployment URL
   - Might enable automatic wildcard subdomain support

2. Or would you prefer to **check the App Management Console first** to see if there are domain settings available?

3. Or would you like me to help you draft a **support request** to Abacus.AI for wildcard subdomain configuration?

---

## Additional Resources

- **Official Domain Setup Guide**: https://abacus.ai/help/chatllm-ai-super-assistant/deepagent-apps-deployment
- **App Management Console**: https://apps.abacus.ai/chatllm/?appId=appllm_engineer
- **Support Email**: support@abacus.ai (if domain configuration not available in UI)
