import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn(user) {
      console.log(user);

      const UserDb = await prisma.user.findUnique({
        where: {
          email: user.profile?.email || ""
        },
      });

      if (!UserDb) {
        await prisma.user.create({
          data: {
            email: user.profile?.email || " ",
            name: user.profile?.name ||  "",
            image: user.profile?.picture || "",  
          },
        });
      }

      return true;
    },
    async redirect ({url,baseUrl}) {
        return `${baseUrl}/playground`
    }

  },


});
