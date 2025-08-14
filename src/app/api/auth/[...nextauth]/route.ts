// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const res = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();
          console.log("API Login Response:", data);

          if (!res.ok) {
            throw new Error(data.message || "Login failed");
          }

          const user = data.data?.user;
          const token = data.data?.accessToken;

          return {
            id: user?._id || "unknown",
            name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
            email: user?.email || credentials.email,
            role: user?.role || "",
            companyName: user?.companyName || "",
            phone: user?.phone || "",
            image: user?.imageLink || "",
            country: user?.country || "",
            cityOrState: user?.cityOrState || "",
            roadOrArea: user?.roadOrArea || "",
            postalCode: user?.postalCode || "",
            isVerified: user?.isVerified || false,
            token, // accessToken from backend
          };
        } catch (error) {
          console.error("Authorize error:", error);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user?.role;
        token.companyName = user?.companyName;
        token.phone = user?.phone;
        token.image = user?.image;
        token.country = user?.country;
        token.cityOrState = user?.cityOrState;
        token.roadOrArea = user?.roadOrArea;
        token.postalCode = user?.postalCode;
        token.isVerified = user?.isVerified;
        token.accessToken = user?.token; // accessToken from backend
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          companyName: token.companyName,
          phone: token.phone,
          image: token.image,
          country: token.country,
          cityOrState: token.cityOrState,
          roadOrArea: token.roadOrArea,
          postalCode: token.postalCode,
          isVerified: token.isVerified,
        };
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
