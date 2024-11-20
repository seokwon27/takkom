import SignIn from "@/components/auth/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "따꼼 - 로그인 & 회원가입",
  description: "이메일이나 다양한 플랫폼의 소셜 계정으로 쉽고 간편하게 시작해요.",
  keywords: ["따꼼", "따꼬미", "로그인", "회원가입", "예방접종"],
  openGraph: {
    title: "따꼼 - 로그인 & 회원가입",
    description: "이메일이나 다양한 플랫폼의 소셜 계정으로 쉽고 간편하게 시작해요.",
    url: "https://www.takkom.site/signin",
    images: [
      {
        url: "/opengraph/signup-og.png",
        width: 1280,
        height: 680,
        alt: "따꼼 - 로그인 & 회원가입"
      }
    ]
  }
};

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
