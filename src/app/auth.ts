import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "./auth.config"
import Credentials from "next-auth/providers/credentials";
import { LoginFormSchema } from "@/schemas/Auth/LoginSchema";
import bcrypt from "bcryptjs";

// callbacks means we can control what happens when an action is performed
// jmn login ba signup korar somoy kono specific action korte chaile callbacks use korte hoy
// session = await auth() [means user details]

export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        async jwt({ token }) {
            console.log(token);
            return token;
        }
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