import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../libs/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "randomsecretkey",
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
        try {
          if (credentials?.email && credentials?.password) {
            const user = await prisma.user.findUnique({
              where: {
                email: credentials.email,
              },
            });

            if (!user || !user.password) {
              throw new Error("Invalid credentials");
            }
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (!isPasswordCorrect) {
              throw new Error("Incorrect password");
            }
            return user;
          } else {
            return null;
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });
        if (existingUser) {
          console.log("User already exists:", existingUser);
          profile.id = existingUser.id;
        } else {
          try {
            const newUser = await prisma.user.create({
              data: {
                fullname: profile.name,
                email: profile.email,
                username: profile.email.split("@")[0],
                password: "",
              },
            });
            console.log("User created:", newUser);
            profile.id = newUser.id;
          } catch (error) {
            console.error("Error creating user:", error);
            return false;
          }
        }
      }

      if (profile?.id) {
        user.id = profile.id;
      }
      return true;
    },

    async session({ session, token }) {
      if (token) {
        (session.user.id = token.id), (session.user.email = token.email);
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        (token.id = user.id?.toString()), (token.email = user.email);
      }
      return token;
    },
  },
};
