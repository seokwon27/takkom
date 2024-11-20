import SignIn from "@/components/auth/SignIn";

const SignInPage = () => {
  return (
    <div className="w-full max-w-[1200px] grow flex flex-col items-center mx-auto max-sm:max-w-full">
      <section className="w-full  max-w-[1200px] flex flex-col bg-white max-sm:sticky max-sm:top-0 max-sm:z-[41] ">
        <SignIn />
      </section>
    </div>
  );
};

export default SignInPage;
