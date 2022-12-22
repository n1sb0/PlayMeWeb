import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    })
    // ...add more providers here
  ],
  callbacks: {
  },
  secret: process.env.JWT_SECRET as string,
  jwt:{
    maxAge: 60 * 60 * 24 * 30,
  }
  // A database is optional, but required to persist accounts in a database
});