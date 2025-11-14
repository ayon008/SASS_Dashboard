import { RegisterSchema } from "@/schemas/Auth/LoginSchema";
import { RegisterInput } from "@/Shared/Form/RegisterForm";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data: RegisterInput = await req.json();
    const validatedField = RegisterSchema.safeParse(data);
    if (!validatedField.success) {
        return NextResponse.json({ success: false, errors: validatedField.error.format(), message: 'Something Went Wrong' }, { status: 400 });
    }
    return NextResponse.json({ success: true, data, message: 'Login Successful' }, { status: 200 });
}
