import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/db';
import { compare } from 'bcrypt';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // console.log('credentials', { credentials });
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await db.user.findFirst({
          where: { email: credentials.email },
        });
        if (user) {
          const isValid = await compare(credentials.password, user.password);
          if (isValid) {
            return {
              id: user.id.toString(),
              email: user.email,
            };
          }
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
