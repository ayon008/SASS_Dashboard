import { LoginFormSchema } from "@/schemas/Auth/LoginSchema";
import { LoginFormInputs } from "@/Shared/Form/login-form";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data: LoginFormInputs = await req.json();
    console.log(data);

    const validatedField = LoginFormSchema.safeParse(data);
    if (!validatedField.success) {
        return NextResponse.json({ success: false, errors: validatedField.error.format(), message: 'Something Went Wrong' }, { status: 400 });
    }
    return NextResponse.json({ success: true, data, message: 'Login Successful' }, { status: 200 });
}
