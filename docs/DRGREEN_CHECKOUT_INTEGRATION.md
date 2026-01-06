# Dr. Green Checkout & Payment Integration

**Version:** 1.0  
**Last Updated:** 2026-01-06  
**Status:** Production Ready

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [User Flow](#user-flow)
4. [Technical Implementation](#technical-implementation)
5. [API Reference](#api-reference)
6. [Database Schema](#database-schema)
7. [Frontend Components](#frontend-components)
8. [Configuration](#configuration)
9. [Testing](#testing)
10. [Troubleshooting](#troubleshooting)

---

## Overview

The Dr. Green checkout integration enables BudStack tenants to offer a complete e-commerce experience for medical cannabis products. The system handles cart management, order submission, and payment processing through the Dr. Green API, supporting both cryptocurrency and fiat payments.

### Key Features

- 🛒 **Shopping Cart** - Real-time synchronization with Dr. Green API
- 📦 **Order Management** - Seamless order submission and tracking
- 💳 **Multi-Payment Options** - 5 payment methods (USDT, ETH, BTC, TCN, Fiat)
- 🔐 **Tenant Isolation** - Complete data separation per tenant
- 🔔 **Webhook Integration** - Automatic payment status updates
- 📧 **Email Notifications** - Payment instructions via email

### Payment Flow Summary

```
Customer → Add to Cart → Checkout → Order Created → 
Admin Approves → Payment Links Emailed → Customer Pays → 
Webhook Updates Order → Tenant Notified
```

---

## Architecture

### System Components

```mermaid
graph TB
    A[Customer Browser] -->|Add to Cart| B[BudStack API]
    B -->|Cart Operations| C[Dr. Green API]
    A -->|Submit Order| B
    B -->|Create Order| C
    C -->|Admin Approval| D[Dr. Green Backend]
    D -->|Generate Invoices| E[Payment Gateways]
    E -->|CoinRemitter| F[Crypto Payments]
    E -->|Pay-Inn| G[Fiat Payments]
    F -->|Webhook| H[BudStack Webhook API]
    G -->|Webhook| H
    H -->|Update Order| I[PostgreSQL]
    H -->|Notify Tenant| J[Tenant Webhook]
```

### Data Flow

1. **Cart Management**
   - Frontend calls BudStack API
   - BudStack proxies to Dr. Green API with tenant credentials
   - Cart state stored locally and in Dr. Green

2. **Order Submission**
   - Customer submits shipping info
   - BudStack creates order in Dr. Green
   - Local order record created
   - Cart cleared

3. **Payment Processing**
   - Dr. Green admin approves order
   - Payment invoices generated (5 options)
   - Customer receives email with payment links
   - Customer completes payment externally

4. **Status Updates**
   - Payment gateway sends webhook to BudStack
   - BudStack updates order status
   - Tenant webhook triggered for notifications

---

## User Flow

### Step-by-Step Customer Journey

#### 1. Browse & Add to Cart

```typescript
// Customer clicks "Add to Cart" on product page
POST /api/store/{slug}/cart/add
{
  "strainId": "abc-123",
  "quantity": 2,      // Multiplier
  "size": 5           // Grams (2, 5, or 10)
}

// Result: 10g added to cart (2 × 5g)
```

#### 2. Review Cart

```typescript
GET /api/store/{slug}/cart

Response:
{
  "cart": {
    "items": [
      {
        "strainId": "abc-123",
        "quantity": 10,
        "strain": {
          "name": "Blue Dream",
          "retailPrice": 12.50
        }
      }
    ],
    "totalQuantity": 10,
    "totalAmount": 125.00
  }
}
```

#### 3. Checkout

Customer navigates to `/store/{slug}/checkout` and enters:
- Address Line 1
- Address Line 2 (optional)
- City
- State/Province
- Postal Code
- Country

#### 4. Submit Order

```typescript
POST /api/store/{slug}/orders/submit
{
  "shippingInfo": {
    "address1": "123 Main St",
    "city": "Lisbon",
    "state": "Lisboa",
    "postalCode": "1000-001",
    "country": "Portugal"
  }
}

Response:
{
  "order": {
    "orderId": "ord_xyz789",
    "orderNumber": "cm12345",
    "drGreenOrderId": "dg_abc123",
    "total": 130.00,
    "message": "Order submitted. Payment instructions will be emailed."
  }
}
```

#### 5. Payment Instructions

Customer receives email containing 5 payment links:
1. **USDT** (Tether) - CoinRemitter
2. **ETH** (Ethereum) - CoinRemitter
3. **BTC** (Bitcoin) - CoinRemitter
4. **TCN** (Testnet Coin) - CoinRemitter
5. **Credit Card** - Pay-Inn.com

#### 6. Complete Payment

Customer clicks preferred payment method and completes transaction on external gateway.

#### 7. Order Confirmation

Payment gateway sends webhook to BudStack:
- Order status updated to `CONFIRMED`
- Payment status updated to `PAID`
- Tenant notified via webhook
- Customer can view order at `/store/{slug}/orders/{orderId}`

---

## Technical Implementation

### Backend Architecture

#### Cart Management (`lib/drgreen-cart.ts`)

**Key Functions:**

```typescript
// Add item to cart
export async function addToCart(params: {
  userId: string;
  tenantId: string;
  strainId: string;
  quantity: number;
  size: number;
  apiKey: string;
  secretKey: string;
}): Promise<DrGreenCartResponse>

// Get current cart
export async function getCart(params: {
  userId: string;
  tenantId: string;
  apiKey: string;
  secretKey: string;
}): Promise<DrGreenCartResponse>

// Remove item from cart
export async function removeFromCart(params: {
  userId: string;
  tenantId: string;
  strainId: string;
  apiKey: string;
  secretKey: string;
}): Promise<DrGreenCartResponse>

// Clear entire cart
export async function clearCart(params: {
  userId: string;
  tenantId: string;
  apiKey: string;
  secretKey: string;
}): Promise<void>
```

**Authentication:**

All Dr. Green API calls use RSA-SHA256 signatures:

```typescript
function generateDrGreenSignature(payload: string, secretKey: string): string {
  const privateKeyPEM = Buffer.from(secretKey, 'base64').toString('utf-8');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(payload);
  return sign.sign(privateKeyPEM, 'base64');
}
```

#### Order Management (`lib/drgreen-orders.ts`)

**Submit Order:**

```typescript
export async function submitOrder(params: {
  userId: string;
  tenantId: string;
  shippingInfo: ShippingInfo;
  apiKey: string;
  secretKey: string;
}): Promise<DrGreenOrderResponse> {
  // 1. Validate user has Dr. Green client ID
  // 2. Verify cart has items
  // 3. Submit to Dr. Green API
  // 4. Create local order record
  // 5. Clear cart
  // 6. Trigger webhook
}
```

#### Webhook Handlers

**Crypto Webhook** (`/api/webhooks/drgreen/crypto`):

```typescript
// Handles CoinRemitter webhooks
// Status codes: 
// 0 = Pending, 1 = Paid, 2 = Overpaid, 
// 3 = Underpaid, 4 = Expired, 5 = Cancelled

POST /api/webhooks/drgreen/crypto
{
  "invoice_id": "inv-123",
  "status_code": 1,
  "coin": "USDT",
  "usd_amount": "125.00",
  "custom_data2": "dg_abc123"  // Dr. Green Order ID
}
```

**Fiat Webhook** (`/api/webhooks/drgreen/fiat`):

```typescript
// Handles Pay-Inn webhooks

POST /api/webhooks/drgreen/fiat
{
  "payment_id": "pay-456",
  "status": "OK",
  "code": 200,
  "amount": "125.00",
  "custom": "nonce-xyz789"  // Order nonce
}
```

---

## API Reference

### Cart Endpoints

#### GET `/api/store/[slug]/cart`

**Description:** Retrieve user's current cart

**Authentication:** Required (session)

**Response:**
```json
{
  "cart": {
    "items": CartItem[],
    "totalQuantity": number,
    "totalAmount": number,
    "drGreenCartId": string
  }
}
```

#### POST `/api/store/[slug]/cart/add`

**Description:** Add item to cart

**Authentication:** Required

**Request Body:**
```json
{
  "strainId": "string",
  "quantity": number,
  "size": 2 | 5 | 10
}
```

**Validation:**
- `strainId` - Required, must be valid Dr. Green product
- `quantity` - Required, minimum 1
- `size` - Required, must be 2, 5, or 10 grams

**Errors:**
- `401` - Not authenticated
- `400` - Invalid input or user has no consultation
- `404` - Store not found
- `500` - Server error

#### DELETE `/api/store/[slug]/cart/remove`

**Description:** Remove item from cart

**Query Parameters:**
- `strainId` (required) - ID of strain to remove

#### DELETE `/api/store/[slug]/cart/clear`

**Description:** Clear entire cart

### Order Endpoints

#### POST `/api/store/[slug]/orders/submit`

**Description:** Submit order for processing

**Request Body:**
```json
{
  "shippingInfo": {
    "address1": "string",
    "address2": "string (optional)",
    "city": "string",
    "state": "string",
    "postalCode": "string",
    "country": "string"
  }
}
```

**Response:**
```json
{
  "order": {
    "orderId": "string",
    "orderNumber": "string",
    "drGreenOrderId": "string",
    "total": number,
    "message": "string"
  }
}
```

#### GET `/api/store/[slug]/orders/[orderId]`

**Description:** Get order details with latest status from Dr. Green

**Response:**
```json
{
  "order": {
    "id": "string",
    "orderNumber": "string",
    "status": "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED",
    "paymentStatus": "PENDING" | "PAID" | "FAILED",
    "total": number,
    "items": OrderItem[],
    "shippingInfo": object
  }
}
```

---

## Database Schema

### DrGreenCart

```prisma
model DrGreenCart {
  id            String   @id @default(cuid())
  userId        String   @unique
  tenantId      String
  drGreenCartId String?  // Cart ID from Dr. Green API
  items         Json     // [{strainId, quantity, size, strain}]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  tenant        Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  
  @@unique([userId, tenantId])
  @@index([tenantId])
}
```

### Order (Updated)

```prisma
model Order {
  // ... existing fields ...
  
  // Dr. Green Integration Fields
  drGreenOrderId    String?       // Order ID from Dr. Green API
  drGreenInvoiceNum String?       // Invoice number
  paymentStatus     PaymentStatus @default(PENDING)
  paymentInvoices   Json?         // {tcn, usdt, eth, btc, fiat}
  nonce             String?       // For fiat webhook lookup
  
  @@index([drGreenOrderId])
  @@index([nonce])
}
```

### DrGreenWebhookLog

```prisma
model DrGreenWebhookLog {
  id            String   @id @default(cuid())
  tenantId      String
  webhookType   String   // 'crypto' | 'fiat'
  orderId       String?  // Local order ID
  drGreenOrderId String? // Dr. Green order ID
  payload       Json     // Full webhook payload
  processed     Boolean  @default(false)
  processedAt   DateTime?
  error         String?
  createdAt     DateTime @default(now())
  
  tenant        Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  
  @@index([tenantId, processed])
  @@index([drGreenOrderId])
}
```

---

## Frontend Components

### CartContext

**Location:** `app/store/[slug]/_contexts/CartContext.tsx`

**Provider Setup:**

```tsx
import { CartProvider } from './_contexts/CartContext';

// In layout.tsx
<CartProvider storeSlug={params.slug}>
  {children}
</CartProvider>
```

**Usage in Components:**

```tsx
import { useCart } from '../_contexts/CartContext';

function MyComponent() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  
  const handleAdd = async () => {
    await addToCart('strain-id', 2, 5); // 2 × 5g
  };
}
```

### AddToCartButton

**Location:** `app/store/[slug]/_components/AddToCartButton.tsx`

**Usage:**

```tsx
import { AddToCartButton } from '../_components/AddToCartButton';

<AddToCartButton 
  strainId="abc-123" 
  strainName="Blue Dream"
/>
```

### Key Pages

1. **Cart Page** - `/store/[slug]/cart`
   - Display cart items
   - Update quantities
   - Remove items
   - Proceed to checkout

2. **Checkout Page** - `/store/[slug]/checkout`
   - Shipping address form
   - Order summary
   - Submit order

3. **Order Confirmation** - `/store/[slug]/orders/[orderId]`
   - Payment status
   - Order details
   - Next steps instructions

---

## Configuration

### Environment Variables

```env
# Dr. Green API
DRGREEN_API_URL=https://api.drgreennft.com/api/v1

# Encryption (for storing credentials)
ENCRYPTION_KEY=your-32-character-encryption-key
NEXT_PUBLIC_ENCRYPTION_KEY=your-32-character-encryption-key
```

### Tenant Configuration

Each tenant must have the following configured in their settings:

```typescript
{
  drGreenApiKey: string;      // API key from Dr. Green
  drGreenSecretKey: string;   // Encrypted secret key
  countryCode: string;        // e.g., "PT" for product filtering
}
```

**Setting Up Tenant Credentials:**

1. Navigate to Super Admin → Tenant Management
2. Click "Manage" on tenant
3. Go to Settings tab
4. Enter Dr. Green API Key and Secret Key
5. Save (automatically encrypted)

### Webhook Configuration

**Required on Dr. Green Backend:**

Configure these webhook URLs in the Dr. Green admin panel:

```
Crypto Webhook: https://yourdomain.com/api/webhooks/drgreen/crypto
Fiat Webhook:   https://yourdomain.com/api/webhooks/drgreen/fiat
```

**BudStack Webhook Events:**

Tenants can subscribe to these events in their webhook settings:

- `order.created` - When order is submitted
- `order.confirmed` - When payment is received
- `order.cancelled` - If payment fails
- `drgreen.payment_received` - Crypto/fiat payment success
- `drgreen.payment_failed` - Payment failure

---

## Testing

### Local Testing

#### 1. Test Cart Operations

```bash
# Add to cart
curl -X POST http://localhost:3000/api/store/healingbuds/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "strainId": "test-strain-id",
    "quantity": 2,
    "size": 5
  }'

# Get cart
curl http://localhost:3000/api/store/healingbuds/cart

# Remove item
curl -X DELETE "http://localhost:3000/api/store/healingbuds/cart/remove?strainId=test-strain-id"
```

#### 2. Test Order Submission

```bash
curl -X POST http://localhost:3000/api/store/healingbuds/orders/submit \
  -H "Content-Type: application/json" \
  -d '{
    "shippingInfo": {
      "address1": "123 Test St",
      "city": "Lisbon",
      "state": "Lisboa",
      "postalCode": "1000-001",
      "country": "Portugal"
    }
  }'
```

#### 3. Simulate Webhook

**Crypto Webhook:**

```bash
curl -X POST http://localhost:3000/api/webhooks/drgreen/crypto \
  -H "Content-Type: application/json" \
  -d '{
    "invoice_id": "test-invoice",
    "status": "Paid",
    "status_code": 1,
    "coin": "USDT",
    "usd_amount": "125.00",
    "custom_data2": "drgreen-order-id"
  }'
```

**Fiat Webhook:**

```bash
curl -X POST http://localhost:3000/api/webhooks/drgreen/fiat \
  -H "Content-Type: application/json" \
  -d '{
    "payment_id": "test-payment",
    "status": "OK",
    "code": 200,
    "amount": "125.00",
    "custom": "order-nonce"
  }'
```

### Multi-Tenant Testing

1. Create 2+ test tenants with different Dr. Green credentials
2. Add items to cart for each tenant
3. Verify carts are completely isolated
4. Submit orders for each tenant
5. Confirm webhook updates only affect correct tenant

### End-to-End Testing Checklist

- [ ] Customer can browse products
- [ ] Customer can add items to cart
- [ ] Cart persists across page refreshes
- [ ] Customer can update cart quantities
- [ ] Customer can remove items from cart
- [ ] Cart shows correct totals
- [ ] Checkout form validates shipping info
- [ ] Order submission creates Dr. Green order
- [ ] Local order record created correctly
- [ ] Cart cleared after order submission
- [ ] Order confirmation page displays correct info
- [ ] Crypto webhook updates order status to PAID
- [ ] Fiat webhook updates order status to PAID
- [ ] Failed payment webhooks handled correctly
- [ ] Tenant webhooks triggered on payment events
- [ ] Email notifications sent (if configured)

---

## Troubleshooting

### Common Issues

#### Cart Not Loading

**Symptoms:** Empty cart or loading error

**Possible Causes:**
1. User not authenticated
2. Missing Dr. Green credentials for tenant
3. Dr. Green API down

**Solution:**
```typescript
// Check browser console for errors
// Verify tenant has credentials:
SELECT drGreenApiKey, drGreenSecretKey FROM tenants WHERE subdomain = 'your-tenant';

// Test Dr. Green API manually:
curl -X GET https://api.drgreennft.com/api/v1/dapp/carts?clientId=test
```

#### Order Submission Fails

**Error:** "User must complete consultation"

**Solution:** Customer needs to complete consultation questionnaire first. This creates their `drGreenClientId`.

**Error:** "Cart is empty"

**Solution:** Ensure cart has items before checkout.

#### Webhook Not Updating Order

**Symptoms:** Order stuck in PENDING status after payment

**Diagnostic Steps:**

1. Check webhook logs:
```sql
SELECT * FROM drgreen_webhook_logs 
WHERE processed = false 
ORDER BY createdAt DESC 
LIMIT 10;
```

2. Verify webhook payload includes correct order ID:
   - Crypto: `custom_data2` field
   - Fiat: `custom` field (nonce)

3. Check order lookup:
```sql
SELECT id, drGreenOrderId, nonce, paymentStatus 
FROM orders 
WHERE drGreenOrderId = 'your-order-id';
```

4. Manually process webhook:
```bash
# Check webhook log entry
SELECT payload FROM drgreen_webhook_logs WHERE id = 'log-id';

# Re-send via curl (see Testing section)
```

#### Signature Authentication Failures

**Error:** "Invalid signature" from Dr. Green API

**Causes:**
- Incorrect secret key
- Secret key not base64 encoded
- Payload mismatch

**Solution:**
```typescript
// Verify secret key is base64:
const decoded = Buffer.from(secretKey, 'base64').toString('utf-8');
console.log('Decoded starts with:', decoded.substring(0, 30));
// Should start with: "-----BEGIN PRIVATE KEY-----"

// Test signature generation:
import { generateDrGreenSignature } from '@/lib/drgreen-cart';
const testPayload = JSON.stringify({ test: true });
const sig = generateDrGreenSignature(testPayload, secretKey);
console.log('Generated signature:', sig);
```

### Debug Mode

Enable verbose logging:

```typescript
// In lib/drgreen-cart.ts and lib/drgreen-orders.ts
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('[DrGreen] Request:', method, endpoint, body);
  console.log('[DrGreen] Response:', data);
}
```

### Database Queries

**Check cart status:**
```sql
SELECT dc.*, u.email, t.subdomain
FROM drgreen_carts dc
JOIN users u ON dc."userId" = u.id
JOIN tenants t ON dc."tenantId" = t.id
WHERE u.email = 'customer@email.com';
```

**Check orders:**
```sql
SELECT o.*, u.email
FROM orders o
JOIN users u ON o."userId" = u.id
WHERE o."drGreenOrderId" IS NOT NULL
ORDER BY o."createdAt" DESC
LIMIT 10;
```

**Check webhook logs:**
```sql
SELECT 
  id,
  "webhookType",
  "orderId",
  "drGreenOrderId",
  processed,
  error,
  "createdAt"
FROM drgreen_webhook_logs
WHERE processed = false
ORDER BY "createdAt" DESC;
```

---

## Performance Considerations

### Caching Strategy

- Cart state cached in React Context (client-side)
- Dr. Green API responses not cached (always fresh)
- Order status refreshed on page load

### Rate Limiting

- Dr. Green API has rate limits
- Implement exponential backoff for failed requests
- Cache product data where possible

### Database Indexing

Ensure these indexes exist:
```sql
CREATE INDEX idx_orders_drgreen_order_id ON orders("drGreenOrderId");
CREATE INDEX idx_orders_nonce ON orders(nonce);
CREATE INDEX idx_webhook_logs_processed ON drgreen_webhook_logs("tenantId", processed);
```

---

## Security Best Practices

### ✅ DO

- Store Dr. Green credentials encrypted
- Validate all user input
- Use HTTPS for all API calls
- Log all webhook payloads for audit trail
- Verify tenant ownership of orders/carts
- Sanitize shipping addresses

### ❌ DON'T

- Expose API keys to frontend
- Store payment card data
- Allow cross-tenant data access
- Trust webhook data without validation
- Skip authentication on cart endpoints

---

## Support & Maintenance

### Monitoring

**Key Metrics:**
- Cart abandonment rate
- Order submission success rate
- Payment completion rate
- Webhook delivery success rate
- Average time: order → payment

**Alerts:**
- Webhook failures (> 5% failure rate)
- Dr. Green API errors (> 10 in 1 hour)
- Orders stuck in PENDING (> 24 hours)

### Regular Maintenance

**Weekly:**
- Review webhook logs for errors
- Check orders stuck in PENDING status
- Monitor payment conversion rates

**Monthly:**
- Archive old webhook logs
- Review cart abandonment patterns
- Update Dr. Green API integration if needed

---

## Changelog

### v1.0.0 (2026-01-06)
- Initial release
- Cart management (add, remove, clear)
- Order submission
- Crypto & fiat webhook handlers
- Frontend components (cart, checkout, confirmation)
- Complete tenant isolation
- Comprehensive logging

---

## Additional Resources

- [Dr. Green API Documentation](https://api.drgreennft.com/docs)
- [BudStack Multi-Tenant Architecture](./MULTI_TENANT_ARCHITECTURE.md)
- [BudStack Deployment Guide](./BUDSTACK_ARCHITECTURE_AND_DEPLOYMENT.md)
- [Webhook System Documentation](./WEBHOOKS.md)

---

**For questions or issues, contact:** engineering@budstack.to
