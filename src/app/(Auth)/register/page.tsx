"use client";
import RegisterForm from "@/Shared/Form/RegisterForm";

const Page = () => {
  
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-[450px] w-full mx-auto bg-white p-6 rounded-lg">
        <h1 className="text-center font-bold">Sign up your account</h1>
        <RegisterForm />
      </div>
    </section>
  );
};

export default Page;
