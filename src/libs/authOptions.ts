import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../libs/prisma";
import bcrypt from "bcrypt";
import { User as NextAuthUser, Account, Profile } from "next-auth";

type CustomProfile = Profile & {
  id?: string;
};

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "randomsecretkey",
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid profile email https://www.googleapis.com/auth/calendar",
        },
      },
      httpOptions: {
        timeout: 10000,
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user) {
          throw new Error("No user found");
        }
        const passwordMatch = await bcrypt.compare(
          credentials?.password,
          user?.password
        );
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }
        return {
          id: user?.id,
          email: user?.email,
          username: user?.username,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: NextAuthUser;
      account: Account | null;
      profile?: CustomProfile;
    }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile?.email },
        });

        if (profile && existingUser) {
          profile.id = existingUser?.id;
        } else {
          try {
            const newUser = await prisma.user.create({
              data: {
                fullname: profile?.name || "",
                email: profile?.email || "",
                username: profile?.email?.split("@")[0] || "",
                password: "",
              },
            });
            if (profile && newUser) {
              profile.id = newUser?.id;
            }
          } catch (error) {
            return false;
          }
        }
      }

      if (profile?.id) {
        user.id = profile.id;
      }
      return true;
    },

    async jwt({ token, account, user }) {
      if (user) {
        token.id = user?.id?.toString();
        token.username = user?.username;
      }
      if (account?.provider === "google") {
        token.accessToken = account?.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token?.accessToken;
        session.user.id = token?.id;
        session.user.username = token?.username;
      }

      return session;
    },
  },
};
