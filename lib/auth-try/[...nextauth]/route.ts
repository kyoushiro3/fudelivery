import connectMongoDB from "@/lib/mongodb";
import { User } from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Add the accessToken property
    user: {
      id: string;
      name?: string;
      email?: string;
    };
  }
}
const authHandler = NextAuth({
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

          const user = await User.findOne({email: credentials?.email})
          if(!user){
            throw new Error('No user found with this email.')
          }

          const isValid = await bcrypt.compare(credentials?.password || '', user.password)

          if(!isValid){
            throw new Error('Invalid password');
          }

          return{id: user._id, name:user.name, email:user.email};
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks:{
    async jwt({token, user}){
        if(user){
          token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        }
        return token
    },
    async session({ session, token }) {
    session.user = session.user || {}; 
    session.user.id = token.id as string;
    session.user.name = token.name as string;
    session.user.email = token.email as string;
    session.accessToken = token.accessToken as string; 
    return session;
    },
  }
});

export { authHandler as GET, authHandler as POST };
