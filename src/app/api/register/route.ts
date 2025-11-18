import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/schemas/Auth/LoginSchema";
import { RegisterInput } from "@/Shared/Form/RegisterForm";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data: RegisterInput = await req.json();
    const validatedField = RegisterSchema.safeParse(data);
    console.log(validatedField);

    if (!validatedField.success) {
        return NextResponse.json({ success: false, errors: validatedField.error.format(), message: 'Something Went Wrong' }, { status: 400 });
    }
    const { data: validatedData } = validatedField;
    
    const { password, repeatPassword, ...rest } = validatedData;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email: rest.email
        },
    })
    if (existingUser) {
        return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 });
    }

    // Create new user
    const newUser = await prisma.user.create({
        data: {
            ...rest,
            password: hashedPassword,
        },
    });


    return NextResponse.json({ success: true, data, message: 'User Created Successfully' }, { status: 200 });
}
