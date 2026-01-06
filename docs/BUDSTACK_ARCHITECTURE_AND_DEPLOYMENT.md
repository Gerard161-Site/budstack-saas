# BudStack Platform - Architecture & Deployment Guide

## Executive Summary

BudStack is a **multi-tenant SaaS platform** for medical cannabis dispensaries, built with Next.js 14, PostgreSQL, and Prisma ORM. The platform enables white-label storefronts with customizable templates, patient verification workflows (KYC), product management, and compliance tracking.

**Key Metrics:**
- **Technology Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js with role-based access control
- **Deployment:** Containerized architecture with Docker
- **Scalability:** Horizontal scaling ready, database pooling enabled

---

## Table of Contents

1. [System Architecture](#1-system-architecture)
2. [Component Breakdown](#2-component-breakdown)
3. [Technology Stack](#3-technology-stack)
4. [Multi-Tenancy Model](#4-multi-tenancy-model)
5. [Database Architecture](#5-database-architecture)
6. [API Architecture](#6-api-architecture)
7. [Authentication & Authorization](#7-authentication--authorization)
8. [Deployment Strategies](#8-deployment-strategies)
9. [Containerization Guide](#9-containerization-guide)
10. [Infrastructure Recommendations](#10-infrastructure-recommendations)
11. [Monitoring & Observability](#11-monitoring--observability)
12. [Security Considerations](#12-security-considerations)
13. [Backup & Disaster Recovery](#13-backup--disaster-recovery)

---

## 1. System Architecture

### 1.1 High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Load Balancer (NGINX)                    │
│                    (SSL Termination, Rate Limiting)              │
└────────────────────────┬────────────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        │                                 │
┌───────▼─────────┐              ┌───────▼─────────┐
│  Next.js App    │              │  Next.js App    │
│  (Container 1)  │              │  (Container 2)  │
│  - Port 3000    │              │  - Port 3000    │
└────────┬────────┘              └────────┬────────┘
         │                                │
         └────────────────┬───────────────┘
                          │
         ┌────────────────▼────────────────┐
         │                                 │
  ┌──────▼──────────┐           ┌─────────▼──────────┐
  │  PostgreSQL DB  │           │   Redis Cache      │
  │  (Primary)      │◄─────────►│   (Session Store)  │
  └────────┬────────┘           └────────────────────┘
           │
  ┌────────▼────────┐
  │  PostgreSQL DB  │
  │  (Read Replica) │
  └─────────────────┘
```

### 1.2 Architecture Layers

#### **Presentation Layer**
- **Next.js Server-Side Rendering (SSR)**: Dynamic tenant pages
- **Static Site Generation (SSG)**: Marketing pages, legal pages
- **Client-Side Rendering (CSR)**: Admin dashboards, forms

#### **Application Layer**
- **API Routes**: RESTful endpoints for CRUD operations
- **Middleware**: Tenant detection, authentication, CORS handling
- **Server Components**: React Server Components for data fetching

#### **Data Layer**
- **PostgreSQL**: Primary data store (tenants, users, products, orders)
- **Prisma ORM**: Type-safe database access
- **Redis** (optional): Session store, caching, rate limiting

#### **Integration Layer**
- **Dr. Green API**: External medical cannabis provider integration
- **Webhooks**: Event-driven integrations with external systems
- **Email Service**: Transactional emails (welcome, KYC reminders)

---

## 2. Component Breakdown

### 2.1 Frontend Components

#### **Core Pages**
| Component | Path | Purpose |
|-----------|------|---------|
| Homepage | `/` | Platform landing page |
| Tenant Storefront | `/store/[slug]` | White-label dispensary homepage |
| Product Catalog | `/store/[slug]/products` | Product listing with regional gating |
| About Us | `/store/[slug]/about` | Tenant story and facilities |
| Contact | `/store/[slug]/contact` | Contact form and information |
| Consultation | `/store/[slug]/consultation` | 5-step medical questionnaire |
| Consultation Success | `/store/[slug]/consultation/success` | KYC verification status |
| Conditions Library | `/store/[slug]/conditions` | Medical conditions directory |
| The Wire (News) | `/store/[slug]/the-wire` | Blog/news articles |
| Blockchain Traceability | `/store/[slug]/blockchain` | Product tracking timeline |

#### **Admin Dashboards**
| Component | Path | Role | Purpose |
|-----------|------|------|---------|
| Super Admin | `/super-admin` | SUPER_ADMIN | Platform management |
| Tenant Admin | `/tenant-admin` | TENANT_ADMIN | Dispensary management |
| Tenant Onboarding | `/onboarding` | PUBLIC | New tenant application |

#### **Authentication Pages**
- `/auth/login` - User login
- `/auth/signup` - User registration
- `/auth/forgot-password` - Password recovery
- `/auth/reset-password/[token]` - Password reset

### 2.2 Backend Components

#### **API Endpoints**

**Authentication & Authorization**
```
POST   /api/auth/[...nextauth]     - NextAuth handlers
POST   /api/signup                 - User registration
POST   /api/auth/reset-password    - Password reset request
POST   /api/auth/reset-password/confirm - Password reset confirmation
```

**Tenant Management**
```
GET    /api/tenant/current         - Get current tenant details
POST   /api/onboarding             - Create new tenant
GET    /api/super-admin/tenants    - List all tenants
PATCH  /api/super-admin/tenants/[id] - Update tenant
```

**Consultation & KYC**
```
POST   /api/consultation/submit    - Submit medical questionnaire
GET    /api/consultation/status    - Get verification status
```

**Product Management**
```
GET    /api/doctor-green/products  - Fetch products from Dr. Green API
GET    /api/store/[slug]/products  - Tenant-specific products
```

**Template Management**
```
POST   /api/super-admin/templates/upload - Upload Lovable template
GET    /api/super-admin/templates  - List all templates
DELETE /api/super-admin/templates/[id] - Delete template
POST   /api/tenant-admin/select-template - Assign template to tenant
```

**Branding & Customization**
```
POST   /api/tenant-admin/branding  - Update tenant branding
POST   /api/tenant-admin/branding/upload - Upload logo/hero assets
```

**Webhooks**
```
GET    /api/tenant-admin/webhooks  - List tenant webhooks
POST   /api/tenant-admin/webhooks  - Create webhook
PATCH  /api/tenant-admin/webhooks/[id] - Update webhook
DELETE /api/tenant-admin/webhooks/[id] - Delete webhook
GET    /api/tenant-admin/webhooks/[id]/deliveries - View delivery logs
```

**Audit Logs**
```
GET    /api/tenant-admin/audit-logs - Tenant-specific logs
GET    /api/super-admin/audit-logs  - Platform-wide logs
```

**Orders**
```
GET    /api/orders                 - List all orders (admin)
GET    /api/orders/customer        - Customer orders
POST   /api/orders                 - Create order
```

### 2.3 Utility Libraries

| Library | Path | Purpose |
|---------|------|---------|
| `lib/db.ts` | Database | Prisma client singleton |
| `lib/auth.ts` | Authentication | NextAuth configuration |
| `lib/tenant.ts` | Multi-tenancy | Tenant detection and URL generation |
| `lib/audit-log.ts` | Compliance | Activity tracking |
| `lib/webhook.ts` | Integration | Webhook triggers and verification |
| `lib/doctor-green-api.ts` | External API | Dr. Green integration |
| `lib/s3.ts` | File Storage | AWS S3 for uploads |
| `lib/aws-config.ts` | Cloud | AWS SDK configuration |
| `lib/email.ts` | Notifications | Email sending utility |
| `lib/lovable-converter.ts` | Templates | Convert Lovable templates to Next.js |

---

## 3. Technology Stack

### 3.1 Core Technologies

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Runtime** | Node.js | 20.x | JavaScript runtime (v20 recommended) |
| **Framework** | Next.js | 14.2.28 | React framework with SSR (standalone output) |
| **Language** | TypeScript | 5.2.2 | Type-safe JavaScript |
| **Database** | PostgreSQL | 15+ | Primary data store |
| **ORM** | Prisma | 6.7.0 | Type-safe database client |
| **Authentication** | NextAuth.js | 4.24.11 | OAuth & credentials auth |
| **Styling** | Tailwind CSS | 3.3.3 | Utility-first CSS |
| **UI Components** | shadcn/ui | Latest | Accessible component library |
| **State Management** | Zustand | 5.0.3 | Client-side state |
| **Forms** | React Hook Form | 7.53.0 | Form validation |
| **Validation** | Zod | 3.23.8 | Schema validation |
| **Animations** | Framer Motion | 10.18.0 | UI animations |
| **Date Handling** | date-fns | 3.6.0 | Date utilities |

### 3.2 External Integrations

| Service | Purpose | Required ENV Variables |
|---------|---------|------------------------|
| **Dr. Green API** | Product catalog, patient registration | `DRGREEN_API_URL`, `DRGREEN_API_KEY`, `DRGREEN_SECRET_KEY` |
| **AWS S3** | File uploads (logos, images) | `AWS_BUCKET_NAME`, `AWS_FOLDER_PREFIX`, `AWS_REGION` |
| **Email Service** | Transactional emails | `EMAIL_SERVER`, `EMAIL_FROM` |

---

## 4. Multi-Tenancy Model

### 4.1 Tenant Isolation Strategy

**BudStack uses a hybrid multi-tenancy model:**

1. **Shared Database, Row-Level Isolation**
   - Single PostgreSQL database
   - `tenantId` foreign key on all tenant-scoped tables
   - Prisma middleware enforces tenant isolation

2. **Routing Strategies** (in order of priority):
   ```
   Priority 1: Path-based     → /store/{slug}
   Priority 2: Subdomain      → {slug}.budstack.to
   Priority 3: Custom Domain  → customdomain.com
   ```

### 4.2 Tenant Detection Flow

```typescript
// middleware.ts - Tenant Detection Logic

1. Check URL path:
   /store/healingbuds → tenantSlug = "healingbuds"

2. If not path-based, check subdomain:
   healingbuds.budstack.to → tenantSlug = "healingbuds"

3. If not subdomain, check custom domain:
   healingbuds.com → Look up tenant by customDomain field

4. Set x-tenant-slug header for downstream use

5. Exclude admin routes from tenant detection:
   /super-admin, /tenant-admin, /onboarding
```

### 4.3 Tenant Data Structure

```prisma
model Tenant {
  id                String   @id @default(cuid())
  businessName      String
  subdomain         String   @unique
  customDomain      String?  @unique
  countryCode       String   @default("GB")
  
  // Branding
  logoUrl           String?
  heroImageUrl      String?
  heroVideoUrl      String?
  primaryColor      String   @default("#1C4F4D")
  
  // Template
  templateId        String?
  template          Template? @relation(fields: [templateId])
  
  // Relations
  users             User[]
  products          Product[]
  orders            Order[]
  webhooks          Webhook[]
  consultations     ConsultationQuestionnaire[]
  
  createdAt         DateTime @default(now())
  isActive          Boolean  @default(true)
}
```

---

## 5. Database Architecture

### 5.1 Core Tables

#### **User Management**
```
User (id, email, name, role, tenantId, createdAt)
  → ONE-TO-MANY → Order
  → ONE-TO-MANY → ConsultationQuestionnaire
  → MANY-TO-ONE → Tenant
```

#### **Tenant Management**
```
Tenant (id, subdomain, customDomain, templateId)
  → ONE-TO-MANY → User
  → ONE-TO-MANY → Product
  → ONE-TO-MANY → Order
  → MANY-TO-ONE → Template
```

#### **Product Catalog**
```
Product (id, name, sku, price, tenantId, isPublished)
  → MANY-TO-ONE → Tenant
  → ONE-TO-MANY → OrderItem
```

#### **Order Management**
```
Order (id, userId, tenantId, status, total, createdAt)
  → MANY-TO-ONE → User
  → MANY-TO-ONE → Tenant
  → ONE-TO-MANY → OrderItem
```

#### **Consultation & KYC**
```
ConsultationQuestionnaire (
  id,
  userId,
  tenantId,
  drGreenClientId,
  kycLink,
  isKycVerified,
  adminApproval,  // PENDING, VERIFIED, REJECTED
  medicalConditions,
  createdAt
)
  → MANY-TO-ONE → User
  → MANY-TO-ONE → Tenant
```

#### **Template System**
```
Template (id, name, slug, designSystem, isActive)
  → ONE-TO-MANY → Tenant
```

#### **Audit & Compliance**
```
AuditLog (
  id,
  action,
  entityType,
  entityId,
  userId,
  tenantId,
  ipAddress,
  metadata,
  createdAt
)
  → MANY-TO-ONE → User
  → MANY-TO-ONE → Tenant
```

#### **Webhooks**
```
Webhook (id, tenantId, url, events, secret, isActive)
  → MANY-TO-ONE → Tenant
  → ONE-TO-MANY → WebhookDelivery

WebhookDelivery (
  id,
  webhookId,
  event,
  payload,
  status,
  attemptCount,
  response,
  createdAt
)
  → MANY-TO-ONE → Webhook
```

### 5.2 Indexes & Performance

**Critical Indexes:**
```sql
-- User lookups
CREATE INDEX idx_user_email ON "User"(email);
CREATE INDEX idx_user_tenant ON "User"("tenantId");

-- Tenant routing
CREATE UNIQUE INDEX idx_tenant_subdomain ON "Tenant"(subdomain);
CREATE UNIQUE INDEX idx_tenant_domain ON "Tenant"("customDomain");

-- Product filtering
CREATE INDEX idx_product_tenant ON "Product"("tenantId", "isPublished");

-- Order tracking
CREATE INDEX idx_order_user ON "Order"("userId", "createdAt" DESC);
CREATE INDEX idx_order_tenant ON "Order"("tenantId", "createdAt" DESC);

-- Audit logs
CREATE INDEX idx_audit_tenant ON "AuditLog"("tenantId", "createdAt" DESC);
CREATE INDEX idx_audit_action ON "AuditLog"(action, "createdAt" DESC);
```

---

## 6. API Architecture

### 6.1 API Design Principles

1. **RESTful Design**: Standard HTTP methods (GET, POST, PATCH, DELETE)
2. **Tenant Context**: All tenant-scoped requests include tenant identification
3. **Authentication**: Bearer tokens via NextAuth sessions
4. **Rate Limiting**: Implement per-tenant/per-user rate limits
5. **Versioning**: Future-proof with `/api/v1/` prefix

### 6.2 Request/Response Flow

```
┌─────────────┐
│   Client    │
│  (Browser)  │
└──────┬──────┘
       │ 1. HTTP Request
       │ Headers: Cookie (session), x-tenant-slug
       ▼
┌─────────────────────┐
│   Next.js Server    │
│   (middleware.ts)   │
│  ┌──────────────┐   │
│  │ 1. Tenant    │   │
│  │    Detection │   │
│  ├──────────────┤   │
│  │ 2. Auth Check│   │
│  ├──────────────┤   │
│  │ 3. CORS      │   │
│  └──────────────┘   │
└──────┬──────────────┘
       │ 2. Route to API Handler
       ▼
┌────────────────────┐
│   API Route        │
│   /api/*/route.ts  │
│  ┌──────────────┐  │
│  │ 1. Validate  │  │
│  │    Input     │  │
│  ├──────────────┤  │
│  │ 2. Check     │  │
│  │    Permissions│ │
│  ├──────────────┤  │
│  │ 3. Database  │  │
│  │    Query     │  │
│  ├──────────────┤  │
│  │ 4. Audit Log │  │
│  ├──────────────┤  │
│  │ 5. Trigger   │  │
│  │    Webhooks  │  │
│  └──────────────┘  │
└──────┬─────────────┘
       │ 3. Response
       ▼
┌─────────────┐
│   Client    │
│  (Browser)  │
└─────────────┘
```

### 6.3 Error Handling

**Standard Error Response:**
```typescript
{
  error: string;          // Human-readable message
  code: string;           // Error code (e.g., "UNAUTHORIZED")
  details?: any;          // Additional context
  timestamp: string;      // ISO 8601 timestamp
}
```

**HTTP Status Codes:**
- `200 OK`: Successful GET/PATCH
- `201 Created`: Successful POST
- `400 Bad Request`: Validation errors
- `401 Unauthorized`: Missing/invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource doesn't exist
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Unexpected error

---

## 7. Authentication & Authorization

### 7.1 Authentication Flow

**NextAuth.js with Credentials Provider:**

```typescript
// lib/auth.ts
export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: { email, password },
      authorize: async (credentials) => {
        // 1. Validate credentials
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { tenant: true }
        });
        
        // 2. Check password hash
        const valid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );
        
        // 3. Return user object for session
        return valid ? user : null;
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.role = user.role;
        token.tenantId = user.tenantId;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.role = token.role;
      session.user.tenantId = token.tenantId;
      return session;
    }
  }
};
```

### 7.2 Role-Based Access Control (RBAC)

**User Roles:**
```typescript
enum UserRole {
  SUPER_ADMIN    // Platform administrator
  TENANT_ADMIN   // Dispensary owner/manager
  USER           // Patient/customer
}
```

**Permission Matrix:**

| Resource | SUPER_ADMIN | TENANT_ADMIN | USER |
|----------|-------------|--------------|------|
| Platform Settings | ✅ | ❌ | ❌ |
| All Tenants | ✅ | ❌ | ❌ |
| Own Tenant | ✅ | ✅ | ❌ |
| Products (own) | ✅ | ✅ | ❌ |
| Orders (own tenant) | ✅ | ✅ | ❌ |
| Orders (own) | ✅ | ✅ | ✅ |
| Profile | ✅ | ✅ | ✅ |
| Consultation | ✅ | ✅ | ✅ |

**Authorization Helper:**
```typescript
// lib/auth.ts
export async function requireRole(
  req: NextRequest,
  allowedRoles: UserRole[]
) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    throw new Error('Unauthorized');
  }
  
  if (!allowedRoles.includes(session.user.role)) {
    throw new Error('Forbidden');
  }
  
  return session;
}
```

### 7.3 Session Management

**Storage:**
- **Development**: In-memory (default NextAuth)
- **Production**: Redis for distributed sessions

**Configuration:**
```typescript
// next.config.js
{
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  }
}
```

---

## 8. Deployment Strategies

### 8.1 Deployment Options Comparison

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| **Monolithic Container** | Simple setup, unified logging | Single point of failure, hard to scale | MVP, small deployments |
| **Microservices** | Independent scaling, fault isolation | Complex orchestration, higher overhead | Enterprise, high traffic |
| **Serverless (Vercel)** | Auto-scaling, zero ops | Vendor lock-in, cold starts | Prototypes, rapid iteration |
| **Kubernetes** | Advanced orchestration, self-healing | Steep learning curve, operational complexity | Large-scale, multi-region |

### 8.2 Recommended: Containerized Monolith

**Why This Approach:**
- ✅ Balance between simplicity and scalability
- ✅ Horizontal scaling via load balancer
- ✅ Database connection pooling
- ✅ Easy CI/CD integration
- ✅ Cost-effective for 10-1000 tenants

**Architecture:**
```
┌─────────────────────────────────────────────────┐
│           NGINX Load Balancer (Port 443)        │
│  - SSL Termination (Let's Encrypt)              │
│  - Rate Limiting (10 req/sec per IP)            │
│  - Static Asset Caching                         │
└─────────────┬───────────────────────────────────┘
              │
    ┌─────────┴─────────┐
    │                   │
┌───▼──────────┐  ┌─────▼─────────┐
│ Next.js App  │  │ Next.js App   │
│ Container 1  │  │ Container 2   │
│ (Port 3000)  │  │ (Port 3000)   │
│              │  │               │
│ - Node.js 18 │  │ - Node.js 18  │
│ - Next.js 14 │  │ - Next.js 14  │
│ - Prisma     │  │ - Prisma      │
└───────┬──────┘  └───────┬───────┘
        │                 │
        └────────┬────────┘
                 │
        ┌────────▼─────────┐
        │  PostgreSQL 15   │
        │  (Port 5432)     │
        │  + PgBouncer     │
        │  (Connection     │
        │   Pooling)       │
        └──────────────────┘
```

### 8.3 Next.js Configuration (Critical)

For the Docker standalone build to work, you **must** configure `next.config.js` as follows:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Prevents issues with Prisma client initialization during build
    serverComponentsExternalPackages: ['@prisma/client', '@prisma/engines'],
  },
  // Ensure we don't include absolute paths in the build
  typescript: {
    ignoreBuildErrors: false,
  },
};
```

### 8.4 Client-Side Type Safety

**Warning**: Never import types directly from `@prisma/client` in client components (`'use client'`). This causes build failures in standalone mode. Instead, use the shared client types:

```typescript
// Use this instead of import { Tenant } from '@prisma/client'
import { Tenant } from '@/types/client';
```

---

## 9. Containerization Guide

### 9.1 Dockerfile (Optimized Multi-Stage Build)

```dockerfile
# /home/ubuntu/healingbuds_website/nextjs_space/Dockerfile

# ============================================
# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Copy package files
COPY package.json ./
COPY prisma ./prisma/

# Install dependencies (will generate yarn.lock if missing)
RUN yarn install --frozen-lockfile --network-timeout 600000 || yarn install --network-timeout 600000

# ============================================
# Stage 2: Builder
# ============================================
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js application
RUN yarn build

# ============================================
# Stage 3: Runner
# ============================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copy build output (standalone mode)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma schema and generated client
COPY --from=builder /app/prisma ./prisma

# Copy the generated Prisma client and the runtime client to the standalone node_modules
COPY --from=builder /app/node_modules/.prisma ./app/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./app/node_modules/@prisma

# Copy scripts for seeding and maintenance
COPY --from=builder /app/scripts ./scripts

# Also copy to the root node_modules for good measure
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "app/server.js"]
```

### 9.2 Docker Compose Configuration

```yaml
# /home/ubuntu/healingbuds_website/docker-compose.yml

version: '3.8'

services:
  # ============================================
  # PostgreSQL Database
  # ============================================
  postgres:
    image: postgres:15-alpine
    container_name: budstack_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-budstack}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB:-budstack_db}
      POSTGRES_INITDB_ARGS: "-E UTF8 --locale=en_US.UTF-8"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-budstack}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - budstack_network

  # ============================================
  # PgBouncer (Connection Pooling)
  # ============================================
  pgbouncer:
    image: edoburu/pgbouncer:latest
    container_name: budstack_pgbouncer
    restart: unless-stopped
    environment:
      DATABASE_URL: postgres://${POSTGRES_USER:-budstack}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB:-budstack_db}
      POOL_MODE: transaction
      AUTH_TYPE: scram-sha-256
      MAX_CLIENT_CONN: 1000
      DEFAULT_POOL_SIZE: 25
    depends_on:
      postgres:
        condition: service_healthy
    ports:
      - "6432:5432"
    networks:
      - budstack_network

  # ============================================
  # Redis (Caching & Session Store)
  # ============================================
  redis:
    image: redis:7-alpine
    container_name: budstack_redis
    restart: unless-stopped
    command: redis-server --appendonly yes --maxmemory 512mb --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - budstack_network

  # ============================================
  # Next.js Application (Scalable)
  # ============================================
  app:
    build:
      context: ./nextjs_space
      dockerfile: Dockerfile
      args:
        NODE_ENV: production
    container_name: budstack_app
    restart: unless-stopped
    environment:
      # Database
      DATABASE_URL: postgresql://${POSTGRES_USER:-budstack}:${POSTGRES_PASSWORD}@pgbouncer:5432/${POSTGRES_DB:-budstack_db}?pgbouncer=true
      
      # NextAuth
      NEXTAUTH_URL: ${NEXTAUTH_URL:-http://localhost:3000}
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
      
      # Dr. Green API
      DRGREEN_API_URL: ${DRGREEN_API_URL}
      DRGREEN_API_KEY: ${DRGREEN_API_KEY}
      DRGREEN_SECRET_KEY: ${DRGREEN_SECRET_KEY}
      
      # AWS S3
      AWS_BUCKET_NAME: ${AWS_BUCKET_NAME}
      AWS_FOLDER_PREFIX: ${AWS_FOLDER_PREFIX}
      AWS_REGION: ${AWS_REGION:-eu-west-1}
      AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}
      AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}
      
      # Email
      EMAIL_SERVER: ${EMAIL_SERVER}
      EMAIL_FROM: ${EMAIL_FROM}
      
      # Redis
      REDIS_URL: redis://redis:6379
      
      # Node
      NODE_ENV: production
      PORT: 3000
    volumes:
      - ./nextjs_space/uploads:/app/uploads  # Fallback for local dev
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      pgbouncer:
        condition: service_started
    networks:
      - budstack_network
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
      replicas: 2  # Scale to 2 instances

  # ============================================
  # NGINX Load Balancer
  # ============================================
  nginx:
    image: nginx:alpine
    container_name: budstack_nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - nginx_cache:/var/cache/nginx
    depends_on:
      - app
    networks:
      - budstack_network

  # ============================================
  # Database Backup (Optional)
  # ============================================
  backup:
    image: prodrigestivill/postgres-backup-local:15
    container_name: budstack_backup
    restart: unless-stopped
    environment:
      POSTGRES_HOST: postgres
      POSTGRES_DB: ${POSTGRES_DB:-budstack_db}
      POSTGRES_USER: ${POSTGRES_USER:-budstack}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      SCHEDULE: "@daily"
      BACKUP_KEEP_DAYS: 7
      BACKUP_KEEP_WEEKS: 4
      BACKUP_KEEP_MONTHS: 6
    volumes:
      - ./backups:/backups
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - budstack_network

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  nginx_cache:
    driver: local

networks:
  budstack_network:
    driver: bridge
```

### 9.3 NGINX Configuration

```nginx
# /home/ubuntu/healingbuds_website/nginx/nginx.conf

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 4096;
    use epoll;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for" '
                    'rt=$request_time uct="$upstream_connect_time" '
                    'uht="$upstream_header_time" urt="$upstream_response_time"';

    access_log /var/log/nginx/access.log main;

    # Performance
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 50M;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss 
               application/rss+xml font/truetype font/opentype 
               application/vnd.ms-fontobject image/svg+xml;

    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=api:10m rate=30r/s;
    limit_req_status 429;

    # Upstream (Next.js App)
    upstream nextjs_backend {
        least_conn;
        server app:3000 max_fails=3 fail_timeout=30s;
        # Add more app instances for horizontal scaling:
        # server app2:3000 max_fails=3 fail_timeout=30s;
        # server app3:3000 max_fails=3 fail_timeout=30s;
    }

    # HTTP to HTTPS Redirect
    server {
        listen 80;
        server_name _;
        
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
        
        location / {
            return 301 https://$host$request_uri;
        }
    }

    # HTTPS Server
    server {
        listen 443 ssl http2;
        server_name _;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # Security Headers
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;

        # Static Assets Caching
        location /_next/static {
            proxy_pass http://nextjs_backend;
            proxy_cache_valid 200 365d;
            add_header Cache-Control "public, max-age=31536000, immutable";
        }

        location /public {
            proxy_pass http://nextjs_backend;
            proxy_cache_valid 200 7d;
            add_header Cache-Control "public, max-age=604800";
        }

        # API Routes (with rate limiting)
        location /api/ {
            limit_req zone=api burst=50 nodelay;
            
            proxy_pass http://nextjs_backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            
            # Timeouts
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }

        # Default (all other routes)
        location / {
            limit_req zone=general burst=20 nodelay;
            
            proxy_pass http://nextjs_backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Health Check Endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

### 9.4 Environment Variables

```bash
# /home/ubuntu/healingbuds_website/.env.production

# ============================================
# Database
# ============================================
POSTGRES_USER=budstack
POSTGRES_PASSWORD=<GENERATE_STRONG_PASSWORD>
POSTGRES_DB=budstack_db
DATABASE_URL=postgresql://budstack:<PASSWORD>@pgbouncer:5432/budstack_db?pgbouncer=true

# ============================================
# NextAuth
# ============================================
NEXTAUTH_URL=https://budstack.to
NEXTAUTH_SECRET=<GENERATE_RANDOM_SECRET>

# ============================================
# Dr. Green API
# ============================================
DRGREEN_API_URL=https://api.drgreen.com
DRGREEN_API_KEY=<YOUR_API_KEY>
DRGREEN_SECRET_KEY=<YOUR_SECRET_KEY>

# ============================================
# AWS S3
# ============================================
AWS_BUCKET_NAME=budstack-uploads
AWS_FOLDER_PREFIX=production/
AWS_REGION=eu-west-1
AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY>
AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_KEY>

# ============================================
# Email
# ============================================
EMAIL_SERVER=smtp://user:pass@smtp.sendgrid.net:587
EMAIL_FROM=noreply@budstack.to

# ============================================
# Redis
# ============================================
REDIS_URL=redis://redis:6379
```

### 9.5 Deployment Commands

```bash
# 1. Clone repository
git clone <your-repo-url> /opt/budstack
cd /opt/budstack/healingbuds_website

# 2. Create .env file
cp .env.example .env.production
nano .env.production  # Fill in secrets

# 3. Build and start services
docker-compose -f docker-compose.yml up -d --build

# 4. Run database migrations
docker-compose exec app npx prisma migrate deploy

# 5. Seed initial data (optional)
docker-compose exec app npx prisma db seed

# 6. Check logs
docker-compose logs -f app

# 7. View running containers
docker-compose ps

# 8. Scale application
docker-compose up -d --scale app=4

# 9. Stop services
docker-compose down

# 10. Backup database
docker-compose exec postgres pg_dump -U budstack budstack_db > backup_$(date +%Y%m%d).sql
```

---

## 10. Infrastructure Recommendations

### 10.1 Minimum Production Requirements

**Small Deployment (1-50 tenants, <10k requests/day):**
```
Server: 4 vCPU, 8 GB RAM, 100 GB SSD
- Next.js App: 2 containers × 1 GB RAM
- PostgreSQL: 2 GB RAM
- Redis: 512 MB RAM
- NGINX: 256 MB RAM

Estimated Cost: $40-80/month (DigitalOcean, Linode)
```

**Medium Deployment (50-500 tenants, 10k-100k requests/day):**
```
Load Balancer: 2 vCPU, 4 GB RAM
App Servers: 2×(4 vCPU, 8 GB RAM) with 2 containers each
Database Server: 8 vCPU, 16 GB RAM (managed PostgreSQL)
Redis: 2 GB RAM (managed Redis)

Estimated Cost: $300-500/month (AWS, GCP)
```

**Large Deployment (500+ tenants, >100k requests/day):**
```
Kubernetes Cluster:
- 3× Control Plane (2 vCPU, 4 GB RAM)
- 5× Worker Nodes (8 vCPU, 16 GB RAM)
- Managed PostgreSQL (read replicas)
- Managed Redis (cluster mode)
- CDN (CloudFlare, Fastly)

Estimated Cost: $1500+/month
```

### 10.2 Cloud Provider Comparison

| Provider | Pros | Cons | Best For |
|----------|------|------|----------|
| **AWS** | Mature ecosystem, global regions | Complex pricing, steep learning curve | Enterprise, compliance-heavy |
| **Google Cloud** | Best Kubernetes (GKE), competitive pricing | Fewer regions | Tech-forward companies |
| **DigitalOcean** | Simple UI, predictable pricing | Limited managed services | Startups, SMBs |
| **Hetzner** | Cheapest, great performance | EU-only, fewer managed services | Budget-conscious, GDPR |
| **Linode (Akamai)** | Good balance, competitive pricing | Smaller ecosystem | Growing businesses |

### 10.3 Managed Services vs. Self-Hosted

**Database:**
- **Managed (Recommended)**: AWS RDS, GCP Cloud SQL, DigitalOcean Managed DB
  - ✅ Automated backups, failover, scaling
  - ✅ Security patches
  - ❌ Higher cost (~3x self-hosted)

**Redis:**
- **Managed**: AWS ElastiCache, Redis Cloud
  - ✅ High availability, automatic failover
  - ✅ Monitoring included

**File Storage:**
- **S3-Compatible**: AWS S3, Backblaze B2, Wasabi, MinIO (self-hosted)
  - ✅ Unlimited scalability
  - ✅ CDN integration

---

## 11. Monitoring & Observability

### 11.1 Essential Metrics

**Application Metrics:**
- Request rate (requests/second)
- Response time (p50, p95, p99)
- Error rate (4xx, 5xx)
- Active database connections
- Memory/CPU usage per container

**Business Metrics:**
- Active tenants
- New consultations/day
- Product views
- Order conversion rate
- Average KYC verification time

### 11.2 Recommended Tools

**APM (Application Performance Monitoring):**
```yaml
# Add to docker-compose.yml
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=<ADMIN_PASSWORD>
    volumes:
      - grafana_data:/var/lib/grafana
    ports:
      - "3001:3000"
    depends_on:
      - prometheus
```

**Logging:**
- **Loki** (Grafana Loki): Log aggregation
- **Seq**: Structured logging (self-hosted)
- **Datadog, New Relic**: Managed solutions

**Error Tracking:**
- **Sentry**: Real-time error tracking and performance monitoring
  ```bash
  npm install @sentry/nextjs
  ```

### 11.3 Health Check Endpoints

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    services: {} as Record<string, any>
  };

  try {
    // Database check
    await prisma.$queryRaw`SELECT 1`;
    checks.services.database = { status: 'healthy' };
  } catch (error) {
    checks.services.database = { status: 'unhealthy', error: error.message };
    checks.status = 'degraded';
  }

  try {
    // Redis check (if configured)
    // await redis.ping();
    checks.services.redis = { status: 'healthy' };
  } catch (error) {
    checks.services.redis = { status: 'unhealthy', error: error.message };
  }

  const statusCode = checks.status === 'healthy' ? 200 : 503;
  return NextResponse.json(checks, { status: statusCode });
}
```

---

## 12. Security Considerations

### 12.1 Security Checklist

- [ ] **SSL/TLS**: All traffic encrypted (Let's Encrypt certificates)
- [ ] **Environment Variables**: Never commit secrets to Git
- [ ] **SQL Injection**: Use Prisma ORM (parameterized queries)
- [ ] **XSS Protection**: React's built-in escaping + CSP headers
- [ ] **CSRF Protection**: NextAuth CSRF tokens
- [ ] **Rate Limiting**: NGINX + API-level rate limits
- [ ] **Password Hashing**: bcrypt with salt rounds ≥ 12
- [ ] **Session Security**: HTTP-only, secure, SameSite cookies
- [ ] **RBAC**: Role-based access control on all routes
- [ ] **Audit Logging**: All critical actions logged
- [ ] **Input Validation**: Zod schemas on all API inputs
- [ ] **File Upload Validation**: Check file types, sizes, scan for malware
- [ ] **Dependency Scanning**: `npm audit`, Dependabot
- [ ] **Container Security**: Non-root user, minimal base images

### 12.2 Secrets Management

**Option 1: Environment Variables (Simple)**
```bash
# Docker Compose
docker-compose --env-file .env.production up
```

**Option 2: Docker Secrets (Recommended for Swarm)**
```bash
echo "my_db_password" | docker secret create db_password -
```

**Option 3: Vault (Enterprise)**
```bash
# HashiCorp Vault for centralized secret management
vault kv put secret/budstack/db password=<PASSWORD>
```

### 12.3 Compliance (GDPR, HIPAA)

**GDPR Requirements:**
- ✅ Data encryption at rest and in transit
- ✅ Right to erasure (delete user data)
- ✅ Data portability (export user data)
- ✅ Audit logs for data access
- ✅ Cookie consent banners

**HIPAA Considerations:**
- ✅ PHI encryption (database + backups)
- ✅ Access controls (RBAC)
- ✅ Audit trails
- ✅ Business Associate Agreements (BAA) with cloud providers
- ✅ Regular security risk assessments

---

## 13. Backup & Disaster Recovery

### 13.1 Backup Strategy

**Database Backups:**
```bash
# Daily automated backups (via docker-compose service)
SCHEDULE: "@daily"
RETENTION: 7 days (daily), 4 weeks (weekly), 6 months (monthly)

# Manual backup
docker-compose exec postgres pg_dump -U budstack -Fc budstack_db > backup_$(date +%Y%m%d).dump

# Restore from backup
docker-compose exec -T postgres pg_restore -U budstack -d budstack_db < backup_20240101.dump
```

**File Uploads (S3):**
- **S3 Versioning**: Enable on bucket (automatic versioning)
- **S3 Cross-Region Replication**: Replicate to secondary region
- **Lifecycle Policies**: Archive to Glacier after 90 days

**Application State:**
- **Git Commits**: Tag releases (`git tag v1.2.3`)
- **Docker Images**: Push to registry (Docker Hub, AWS ECR)

### 13.2 Disaster Recovery Plan

**RTO (Recovery Time Objective): 1 hour**
**RPO (Recovery Point Objective): 15 minutes**

**Runbook:**
1. **Primary Region Failure**:
   - Switch DNS to secondary region (Route 53 failover)
   - Promote read replica to primary
   - Restart application containers

2. **Database Corruption**:
   - Restore from latest backup (max 24h old)
   - Replay WAL logs for point-in-time recovery
   - Verify data integrity

3. **Security Breach**:
   - Isolate affected containers
   - Rotate all secrets (DB passwords, API keys)
   - Audit logs for unauthorized access
   - Notify affected tenants

---

## Appendix A: Quick Start Commands

```bash
# Development
cd /home/ubuntu/healingbuds_website/nextjs_space
yarn install
yarn prisma generate
yarn dev

# Production (Docker)
docker-compose -f docker-compose.yml up -d --build
docker-compose logs -f app
docker-compose exec app npx prisma migrate deploy

# Database
docker-compose exec postgres psql -U budstack budstack_db
docker-compose exec postgres pg_dump -U budstack budstack_db > backup.sql

# Scaling
docker-compose up -d --scale app=4

# Monitoring
docker stats  # Resource usage
docker-compose logs --tail=100 -f app  # Live logs
```

---

## Appendix B: Cost Estimation

**Monthly Operating Costs (USD):**

| Component | Small | Medium | Large |
|-----------|-------|--------|-------|
| **Compute** | $40 | $200 | $800 |
| **Database (Managed)** | $15 | $100 | $500 |
| **Redis (Managed)** | $10 | $30 | $100 |
| **S3 Storage** | $5 | $20 | $100 |
| **CDN** | $0 | $10 | $50 |
| **Monitoring** | $0 | $20 | $100 |
| **Domain + SSL** | $15 | $15 | $15 |
| **Email Service** | $10 | $30 | $100 |
| **Total** | **$95** | **$425** | **$1,765** |

---

## Appendix C: Useful Resources

**Documentation:**
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Production Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [NGINX Configuration Guide](https://nginx.org/en/docs/)

**Tools:**
- [Let's Encrypt](https://letsencrypt.org/) - Free SSL certificates
- [Certbot](https://certbot.eff.org/) - Automated SSL management
- [PgBouncer](https://www.pgbouncer.org/) - PostgreSQL connection pooling
- [k6](https://k6.io/) - Load testing

---

**Document Version:** 1.0
**Last Updated:** January 2025
**Maintained By:** BudStack Engineering Team
