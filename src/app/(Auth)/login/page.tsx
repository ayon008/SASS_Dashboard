import LoginForm from "@/Shared/Form/login-form";
const Page = () => {

  return (
    <section className="min-h-screen w-full p-10 flex items-center justify-center">
      <div className="max-w-[450px] w-full mx-auto bg-white p-6 rounded-lg">
        {/* Sign In Text */}
        <h1 className="text-center font-bold">Sign in your account</h1>
        <LoginForm />
      </div>
    </section>
  );
};

export default Page;
