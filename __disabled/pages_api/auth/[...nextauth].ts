import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // authorization: {
      //   params: {
      //     scope: "openid email profile https://www.googleapis.com/auth/calendar.events",
      //   },
      // },
      authorization: {
  params: {
    scope: "openid email profile https://www.googleapis.com/auth/calendar.events",
    access_type: "offline",
    prompt: "consent",
  },
},

    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.access_token;
      return session;
    },
    async jwt({ token, account }) {
      if (account) token.access_token = account.access_token;
      return token;
    },
  },
};

export default NextAuth(authOptions);
