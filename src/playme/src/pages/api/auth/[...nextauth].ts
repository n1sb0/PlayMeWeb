import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../../../components/Auth/AuthHelper";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
      },
      
      async authorize(credentials, req) {
        try {  
          const { email, password } = credentials as {email : string, password : string};
          const { user, error } = await loginUser(email, password);
               console.log(user)
               console.log(error)
          if (error) throw new Error(error);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages:{
    signIn: "/login"
  },
  secret: process.env.JWT_SECRET as string,
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
};

export default NextAuth(authOptions);
