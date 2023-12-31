import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import { PrismaClient } from "@prisma/client";

export default NuxtAuthHandler({
  secret: "z8M8/O12fqA3K+I7Ia+vygtx+c7X5i4pxmOnn/bnLUE=",
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user ? user.id || "" : "";
        token.role = user ? (user as any).role || "" : "";
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      (session as any).user.role = token.role;
      (session as any).user.id = token.id;
      return Promise.resolve(session);
    },
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      async authorize(credentials: any) {
        const prisma = new PrismaClient();
        const loggInUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                email: credentials?.username,
                role: credentials?.role,
              },
              {
                username: credentials?.username,
                role: credentials?.role,
              },
            ],
          },
        });

        // const hashPassword = await bcrypt.hashSync(credentials?.password, 10)
        const checkedPassword = await bcrypt.compare(
          credentials?.password,
          loggInUser?.password
        );

        if (checkedPassword && loggInUser) {
          const user = {
            id: loggInUser.id,
            role: loggInUser.role,
            name: loggInUser.fullname,
            email: loggInUser.email,
          };
          return user;
        } else {
          throw createError({
            statusCode: 401,
            statusMessage: "Invalid credentials",
          });
        }
      },
    }),
  ],
});
