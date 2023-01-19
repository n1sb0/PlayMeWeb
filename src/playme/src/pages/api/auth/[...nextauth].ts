import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser, createUserFromProvider } from "../../../components/Auth/AuthHelper";

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
  callbacks: {
    async signIn({ account, profile }) {

      if (account?.provider === "google") {
        createUserFromProvider(profile);
      }
      
      return true // do other things for other providers
    },
    session: async (session: any, token: any, user) => {
      console.log("sess, tol", session, token);
      user && (token.user = user)
      console.log('usss',user)
      return Promise.resolve({
        ...session,
        ...session.user,
        ...token
      });
    },
    jwt: async (token: any, user) => {
      console.log('user s', user);
      if (user) token.user = user;
      let newSession = {
        ...token.user
      };

      return Promise.resolve(newSession);
    }
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
