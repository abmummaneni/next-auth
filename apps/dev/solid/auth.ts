import { SolidAuth, type SolidAuthConfig } from "@auth/solid-start"
import GitHub from "@auth/solid-start/providers/github"
import Discord from "@auth/solid-start/providers/discord"
import Credentials from "@auth/solid-start/providers/credentials"

export const authOptions = {
  debug: true,
  providers: [
    GitHub,
    Discord,
    Credentials({
      credentials: { password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        if (credentials.password !== "password") return null
        return {
          name: "Fill Murray",
          email: "bill@fillmurray.com",
          image: "https://www.fillmurray.com/64/64",
          id: "1",
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      console.log("callbacks.jwt", { token, user })
      // if (user.id) {
      //   token.userId = user.id
      // }
      return token
    },
    async session({ session, user }) {
      console.log("callbacks.session", { session, user })
      return session
    },
  },
} satisfies SolidAuthConfig

export const { signIn, signOut, handlers, auth } = SolidAuth(authOptions)
