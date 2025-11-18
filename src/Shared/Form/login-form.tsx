"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "./FormError";
import FormNotification from "./FormNotification";
import { LoginFormSchema } from "@/schemas/Auth/LoginSchema";
import { useRouter } from "next/navigation";

export type LoginFormInputs = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [sucessMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setError("");
    setSuccessMessage("");
    const response = await fetch("/api/login", {
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
      router.push("/settings");
      router.refresh();
    }
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 mt-6"
    >
      <div>
        <label htmlFor="email">Username</label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email or Username"
          className="py-5! mt-2"
          {...register("email", { required: "Email or Username is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <div className="relative mt-2">
          <Input
            id="Password"
            type={isShowPassword ? "text" : "password"}
            placeholder="****"
            className="py-5!"
            {...register("password", { required: "Password is required" })}
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
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            type="checkbox"
            className="w-3 h-3 mt-0.5"
            {...register("remember")}
          />
          <span className="text-gray-600 text-sm">Remember my preference</span>
        </div>
        <p className="text-gray-600 text-sm hover:text-primary cursor-pointer duration-100 transition-all">
          Forgot Password?
        </p>
      </div>
      <FormError message={error} />
      <FormNotification message={sucessMessage} />
      <div className="">
        <Button
          className="w-full cursor-pointer"
          type="submit"
          aria-label="Submit"
        >
          Sign In
        </Button>
        <p className="text-xs text-gray-600 mt-6">
          Don't have an account?{" "}
          <span className="text-primary cursor-pointer">
            <Link href={"/register"}>Sign up</Link>
          </span>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
