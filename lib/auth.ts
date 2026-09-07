import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'student@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { profile: true },
        })

        if (!user || !user.password) {
          throw new Error('No user found with this email')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error('Invalid password')
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    signOut: '/signout',
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.sub as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = token.sub || user.id
      }
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error(code, metadata) {
      // Suppress noisy unauthenticated session 401 client fetch errors in console
      if (code === 'CLIENT_FETCH_ERROR') return
      console.error(code, metadata)
    },
    warn(code) {
      if (code === 'DEBUG_ENABLED') return
      console.warn(code)
    },
  },
  debug: false,
}
