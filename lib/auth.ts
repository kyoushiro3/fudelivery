import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";

import connectMongoDB from "./mongodb";
import { User } from "@/models/user";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string;
      email?: string;
      role?:string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await connectMongoDB();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("No user found with this email.");
        }

        const isValid = await bcrypt.compare(
          credentials?.password || "",
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { id: user._id, name: user.name, email: user.email, role:user.role };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error:"/error",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = session.user || {};
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

export default NextAuth(authOptions);
