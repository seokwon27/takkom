import SignUp from "@/components/auth/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "따꼼 - 로그인 & 회원가입",
  description: "이메일이나 다양한 플랫폼의 소셜 계정으로 쉽고 간편하게 시작해요.",
  keywords: ["따꼼", "따꼬미", "로그인", "회원가입", "예방접종"],
  openGraph: {
    title: "따꼼 - 로그인 & 회원가입",
    description: "이메일이나 다양한 플랫폼의 소셜 계정으로 쉽고 간편하게 시작해요.",
    url: "https://www.takkom.site/signup",
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

const SignUpPage = () => {
  return (
    <section className="grid place-items-center gap-6 mt-[77px] max-w-[384px] m-auto max-sm:max-w-full">
      <SignUp />
    </section>
  );
};

export default SignUpPage;
