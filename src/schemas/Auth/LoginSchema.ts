import z from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password must be at least 8 characters long"),
    remember: z.boolean().optional(),
});

export const RegisterSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    userName: z.string().min(3, "Username must be at least 3 characters long").optional(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    repeatPassword: z.string().min(8, "Repeat Password must be at least 8 characters long")
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],  //It sets the error on repeatPassword field
});