// Shared type definitions for client components
// These types mirror Prisma types but are safe to use in client components

export type Tenant = {
    id: string;
    businessName: string;
    slug: string;
    domain: string | null;
    isActive: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
    [key: string]: any;
};

export type Product = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    tenantId: string;
    [key: string]: any;
};

export type User = {
    id: string;
    email: string;
    name: string | null;
    role: string;
    tenantId: string | null;
    [key: string]: any;
};
