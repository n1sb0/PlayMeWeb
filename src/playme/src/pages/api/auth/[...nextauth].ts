import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  // callbacks: {
  //   session({ session, user }) {
  //     if (session.user) {
  //       session.user.email = user.email;
  //     }
  //     return session;
  //   },
  // },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    })
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET as string,
  jwt:{
    maxAge: 60 * 60 * 24 * 30,
  }
};

export default NextAuth(authOptions);
