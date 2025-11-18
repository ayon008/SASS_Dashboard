import { signIn } from "@/app/auth";
import { LoginFormSchema } from "@/schemas/Auth/LoginSchema";
import { LoginFormInputs } from "@/Shared/Form/login-form";
import { AuthError } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data: LoginFormInputs = await req.json();
    console.log(data);

    const validatedField = LoginFormSchema.safeParse(data);
    if (!validatedField.success) {
        return NextResponse.json({ success: false, errors: validatedField.error.format(), message: 'Something Went Wrong' }, { status: 400 });
    }
    const { email, password } = validatedField.data;
    console.log(email, password);

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false  // ✅ Don't auto-redirect, return result instead
        });

        return NextResponse.json(
            { success: true, message: 'Login successful' },
            { status: 200 }
        );
    }
    catch (error) {
        console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
                default:
                    return NextResponse.json({ success: false, message: 'Authentication error' }, { status: 401 });
            }
        }
        throw error;
    }
}
