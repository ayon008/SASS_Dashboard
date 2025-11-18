import { prisma } from "@/lib/prisma";

export const getUserByEmail = async (email: string | undefined | null) => {
    try {
        if (!email) return null;
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    }
    catch (error) {
        console.error("Error fetching user by email:", error);
        return null;
    }
}