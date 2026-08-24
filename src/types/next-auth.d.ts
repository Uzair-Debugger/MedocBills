import type { DefaultSession } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    adminId?: number;
    adminName?: string;
    adminEmail?: string;
  }

  interface Session {
    user: {
      adminId?: number;
      adminName?: string;
      adminEmail?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    adminId?: number;
    adminName?: string;
    adminEmail?: string;
  }
}