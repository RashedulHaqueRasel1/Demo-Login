// src/types/next-auth.d.ts
import  { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role?: string;
    companyName?: string;
    phone?: string;
    image?: string;
    country?: string;
    cityOrState?: string;
    roadOrArea?: string;
    postalCode?: string;
    isVerified?: boolean;
    token?: string; // backend access token
  }

  interface Session {
    user: {
      id: string;
      role?: string;
      companyName?: string;
      phone?: string;
      image?: string;
      country?: string;
      cityOrState?: string;
      roadOrArea?: string;
      postalCode?: string;
      isVerified?: boolean;
    } & DefaultSession["user"];
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
    companyName?: string;
    phone?: string;
    image?: string;
    country?: string;
    cityOrState?: string;
    roadOrArea?: string;
    postalCode?: string;
    isVerified?: boolean;
    accessToken?: string;
  }
}
