// @ts-nocheck

import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/app/firebase'

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        return await signInWithEmailAndPassword(
          auth,
          (credentials as any).email || '',
          (credentials as any).password || '',
        )
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user
            }
            // console.log(userCredential)
            return null
          })
          .catch((error) => {
            console.log(error)
          })
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.uid
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.uid = token.uid
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
