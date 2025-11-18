"use client";
import { Eye, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import z from "zod";
import { RegisterSchema } from "@/schemas/Auth/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import FormError from "./FormError";
import FormNotification from "./FormNotification";

export type RegisterInput = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [sucessMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    console.log(data);
    setError("");
    setSuccessMessage("");
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.message || "Something went wrong");
      setSuccessMessage("");
    } else {
      setSuccessMessage(result.message || "Login successful");
      setError("");
    }
    console.log(result, "result");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log("form validation errors:", errors);
      })}
      action=""
      className="space-y-4 mt-4"
    >
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="first-name">First Name</label>
          <Input
            id="first-name"
            type="text"
            placeholder="Enter your first name"
            className="py-5! mt-2"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <Input
            id="last-name"
            type="text"
            placeholder="Enter your last name"
            className="py-5! mt-2"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="py-5! mt-2"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="Password">Password</label>
          <div className="relative mt-2">
            <Input
              id="Password"
              type={isShowPassword ? "text" : "password"}
              placeholder="****"
              className="py-5!"
              {...register("password")}
            />
            {isShowPassword ? (
              <Eye
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-600 w-4 h-4"
              />
            ) : (
              <EyeOffIcon
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-600 w-4 h-4"
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="repeatPassword">Repeat Password</label>
          <div className="relative mt-2">
            <Input
              id="repeatPassword"
              type={isShowPassword ? "text" : "password"}
              placeholder="****"
              className="py-5!"
              {...register("repeatPassword")}
            />
            {isShowPassword ? (
              <Eye
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-600 w-4 h-4"
              />
            ) : (
              <EyeOffIcon
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-600 w-4 h-4"
              />
            )}
          </div>
          {errors.repeatPassword && (
            <p className="text-red-600 text-sm">
              {errors.repeatPassword.message}
            </p>
          )}
        </div>
      </div>
      <FormError message={error} />
      <FormNotification message={sucessMessage} />
      <div className="">
        <Button
          className="w-full cursor-pointer"
          type="submit"
          aria-label="Submit"
        >
          Sign Up
        </Button>
        <p className="text-xs text-gray-600 mt-6">
          Already have an account? {""}
          <span className="text-primary cursor-pointer">
            <Link href={"/login"}>Sign in</Link>
          </span>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
