# Authentication & Login Flow

## Overview

The BudStack platform uses a **unified, role-based authentication system** where users login through tenant-specific login pages, and the system automatically redirects them to the appropriate dashboard based on their role.

## User Roles

```typescript
enum Role {
  PATIENT         // Regular customers/patients
  TENANT_ADMIN    // Store owners/administrators  
  SUPER_ADMIN     // Platform administrators
}
```

## Login Flows

### 1. Tenant Store Login (`/store/[slug]/login`)

**Primary use**: Customer/patient login for a specific tenant's store

**Redirect Logic**:
- ✅ **PATIENT** → `/store/${slug}` (tenant store homepage)
- ✅ **TENANT_ADMIN** → `/tenant-admin` (their admin dashboard)
- ⚠️ **SUPER_ADMIN** → `/super-admin` (platform admin - should use platform login instead)

**Example**:
```
https://yourdomain.com/store/healingbuds/login
```

### 2. Platform Admin Login (`/auth/login`)

**Primary use**: Super admin and tenant admin access to platform features

**Redirect Logic**:
- ✅ **SUPER_ADMIN** → `/super-admin`
- ✅ **TENANT_ADMIN** → `/tenant-admin`
- ✅ **PATIENT** → `/store/{their-tenant}` (if they have a tenantId)

**Example**:
```
https://yourdomain.com/auth/login
```

## Implementation Details

### Role-Based Redirect (Tenant Login)

```tsx
// After successful sign in
if (result?.ok) {
    const sessionResponse = await fetch('/api/auth/session');
    const sessionData = await sessionResponse.json();
    const userRole = sessionData?.user?.role;
    
    if (userRole === 'TENANT_ADMIN') {
        router.replace('/tenant-admin');
    } else if (userRole === 'SUPER_ADMIN') {
        router.replace('/super-admin');
    } else {
        router.replace(`/store/${slug}`);
    }
}
```

### Session Data Structure

```typescript
{
  user: {
    id: string;
    email: string;
    name: string;
    role: 'PATIENT' | 'TENANT_ADMIN' | 'SUPER_ADMIN';
    tenantId?: string;
  }
}
```

## User Journey Examples

### Example 1: Patient Login
1. User visits `https://healingbuds.example.com/login` (or `/store/healingbuds/login`)
2. Enters credentials or uses Google sign-in
3. System authenticates and identifies role: `PATIENT`
4. Redirects to → `/store/healingbuds` (store homepage)
5. Can browse products, place orders, view their account

### Example 2: Tenant Admin Login
1. Admin visits their store login: `https://healingbuds.example.com/login`
2. Enters credentials
3. System authenticates and identifies role: `TENANT_ADMIN`
4. Redirects to → `/tenant-admin` (admin dashboard)
5. Can manage products, orders, branding, template customization

### Example 3: Super Admin Login
1. Super admin visits platform login: `https://platform.example.com/auth/login`
2. Enters credentials
3. System authenticates and identifies role: `SUPER_ADMIN`
4. Redirects to → `/super-admin` (platform dashboard)
5. Can manage all tenants, templates, system settings

## Best Practices

### For Customers/Patients
- ✅ Use the tenant-specific login page (`/store/[slug]/login`)
- ✅ Simple, branded experience
- ✅ Automatic redirect to their store

### For Tenant Admins
- ✅ Can use either tenant login or platform login
- ✅ Both will redirect to `/tenant-admin` dashboard
- ✅ Recommended: save `/tenant-admin` as bookmark for quick access

### For Super Admins
- ✅ Use platform login (`/auth/login`)
- ✅ Direct access to super admin features
- ❌ Avoid using tenant-specific logins (works but not ideal)

## Navigation Links

### Patient Navigation
- Login button → `/store/${slug}/login`
- After login: "My Account", "My Orders", "Logout"

### Tenant Admin Navigation  
- Login button → `/store/${slug}/login` OR `/auth/login`
- After login: "Dashboard", "Products", "Orders", "Branding", "Templates", "Logout"
- Shows "Admin Dashboard" link in header (for TENANT_ADMIN + SUPER_ADMIN roles)

### Super Admin Navigation
- Login button → `/auth/login`
- After login: "Tenants", "Templates", "Analytics", "Settings", "Logout"

## Security Considerations

1. **Role Verification**: All admin routes (`/tenant-admin/*`, `/super-admin/*`) should verify role in middleware or page component
2. **Tenant Isolation**: Tenant admins can only access their own tenant's data (enforced by `tenantId`)
3. **Token Security**: Session tokens include role and tenantId for authorization checks

## Migration Notes

- ✅ Existing users maintain their roles
- ✅ New signups default to `PATIENT` role
- ✅ Tenant admins are assigned during tenant creation
- ✅ Super admins are manually created via seed scripts

---

## Quick Reference

| Login Page | Intended For | Redirects To |
|------------|--------------|--------------|
| `/store/[slug]/login` | Customers (PATIENT) | `/store/[slug]` |
| `/store/[slug]/login` | Tenant Admins | `/tenant-admin` |
| `/auth/login` | Super Admins | `/super-admin` |
| `/auth/login` | Tenant Admins | `/tenant-admin` |
