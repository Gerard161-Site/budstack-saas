
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    isVerified?: boolean;
    role?: string;
    tenantId?: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      isVerified?: boolean;
      role?: string;
      tenantId?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    isVerified?: boolean;
    role?: string;
    tenantId?: string | null;
  }
}
