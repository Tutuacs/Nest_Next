import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt";
import { Backend_URL } from "@/lib/Constants";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(Backend_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.tokens.refresh}`,
    },
  });

  const response = await res.json();

  token.tokens = { ...response };
  token.profile = response.profile;

  const session = {
    ...token,
    tokens: { ...response },
  };


  return {
    ...token,
    tokens: { ...response },
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials: any) {
        const res = await fetch(Backend_URL + "/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        if (res.status === 401) {
          return null;
        }

        const user = await res.json();
        if (user && res.ok) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      if (new Date().getTime() < token.tokens.expiresIn) {
        return token;
      }

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.profile = token.profile;
      session.tokens = token.tokens;

      return session;
    },
  },
};