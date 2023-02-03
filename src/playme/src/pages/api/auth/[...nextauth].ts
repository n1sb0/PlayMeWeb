import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {loginUser, createUserFromProvider} from "../../../components/Auth/AuthHelper";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
          //check user credentials
          const { user, error } = await loginUser(email, password);

          if (error) throw new Error(error);

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
    GoogleProvider({
      name: "google",
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        //create new user account if not exist
        await createUserFromProvider(profile);
      }

      // do other things for other providers
      return Promise.resolve(true); 
    },
    jwt({ token}) {
      //just return already created token
      return token;
    },
    session({ session}) {
      //just return already created session
      return session;
    },
  },
  pages:{
    signIn: "/login"
  },
  secret: process.env.JWT_SECRET as string,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
};

export default NextAuth(authOptions);
