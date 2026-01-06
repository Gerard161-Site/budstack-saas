-- Complete schema migration including Dr. Green integration
-- Created: 2026-01-06
-- Description: Captures all database schema changes including Dr. Green cart and payment integration

-- Create enums
CREATE TYPE "Role" AS ENUM ('PATIENT', 'TENANT_ADMIN', 'SUPER_ADMIN');
CREATE TYPE "StrainType" AS ENUM ('SATIVA', 'INDICA', 'HYBRID');
CREATE TYPE "ConsultationStatus" AS ENUM ('PENDING', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'EXPIRED', 'CANCELLED', 'OVERPAID', 'UNDERPAID');

-- Dr. Green Cart Model - Syncs with Dr. Green API cart
CREATE TABLE "drgreen_carts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "drGreenCartId" TEXT,
    "items" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    
    CONSTRAINT "drgreen_carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "drgreen_carts_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "drgreen_carts_userId_tenantId_key" UNIQUE ("userId", "tenantId")
);

CREATE UNIQUE INDEX "drgreen_carts_userId_key" ON "drgreen_carts"("userId");
CREATE INDEX "drgreen_carts_tenantId_idx" ON "drgreen_carts"("tenantId");

-- Dr. Green Webhook Log - Audit trail for payment webhooks
CREATE TABLE "drgreen_webhook_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "webhookType" TEXT NOT NULL,
    "orderId" TEXT,
    "drGreenOrderId" TEXT,
    "payload" JSONB NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "processedAt" TIMESTAMP(3),
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT "drgreen_webhook_logs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "drgreen_webhook_logs_tenantId_processed_idx" ON "drgreen_webhook_logs"("tenantId", "processed");
CREATE INDEX "drgreen_webhook_logs_drGreenOrderId_idx" ON "drgreen_webhook_logs"("drGreenOrderId");

-- Add Dr. Green fields to existing tables

-- Users: Add Dr. Green client ID
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "drGreenClientId" TEXT;

-- Orders: Add Dr. Green integration fields
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "drGreenOrderId" TEXT;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "drGreenInvoiceNum" TEXT;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING';
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "paymentInvoices" JSONB;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "nonce" TEXT;

CREATE INDEX IF NOT EXISTS "orders_drGreenOrderId_idx" ON "orders"("drGreenOrderId");
CREATE INDEX IF NOT EXISTS "orders_nonce_idx" ON "orders"("nonce");

-- Add relation columns to Tenants for Dr. Green integration
-- (drGreenCarts and drGreenWebhookLogs are already linked via foreign keys above)

COMMENT ON TABLE "drgreen_carts" IS 'Shopping carts synchronized with Dr. Green API';
COMMENT ON TABLE "drgreen_webhook_logs" IS 'Audit log for Dr. Green payment webhooks (crypto and fiat)';
COMMENT ON COLUMN "users"."drGreenClientId" IS 'Client ID from Dr. Green API for cart and order operations';
COMMENT ON COLUMN "orders"."drGreenOrderId" IS 'Order ID from Dr. Green backend';
COMMENT ON COLUMN "orders"."drGreenInvoiceNum" IS 'Invoice number from Dr. Green';
COMMENT ON COLUMN "orders"."paymentStatus" IS 'Payment status tracked via webhooks';
COMMENT ON COLUMN "orders"."paymentInvoices" IS 'Payment URLs for crypto (TCN, USDT, ETH, BTC) and fiat gateways';
COMMENT ON COLUMN "orders"."nonce" IS 'Unique nonce for fiat payment webhook lookup';
