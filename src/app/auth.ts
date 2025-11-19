import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "./auth.config"
import Credentials from "next-auth/providers/credentials";
import { LoginFormSchema } from "@/schemas/Auth/LoginSchema";
import bcrypt from "bcryptjs";

// callbacks means we can control what happens when an action is performed
// jmn login ba signup korar somoy kono specific action korte chaile callbacks use korte hoy
// session = await auth() [means user details]

// Here token from session and the jwt token is same , and session is just the user



// Session type
import NextAuth, { type DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

export type ExtendedUSer = DefaultSession["user"] & {
    role: Role
    uid: string
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUSer
    }
}


export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        async signIn({ user }) {
            const getUser = await prisma.user.findUnique({
                where: { id: user.id }
            })
            if (!getUser || !getUser?.emailVerified) return false
            return true
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.uid = token.sub;
                const getUser = await prisma.user.findUnique({
                    where: { id: token.sub }
                })
                if (getUser) {
                    token.role = getUser?.role;
                    session.user.role = getUser?.role;
                }
            }
            return session;
        },
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const validateFields = LoginFormSchema.safeParse(credentials);
                if (!validateFields.success) {
                    throw new Error("Invalid form data");
                }
                const { email, password } = validateFields.data;
                const user = await prisma.user.findUnique({
                    where: { email }
                });
                if (!user || !user.password) return null;
                const matchedPassword = await bcrypt.compare(password, user.password);
                if (matchedPassword) return user;
                return null;
            }
        }),
    ],
})