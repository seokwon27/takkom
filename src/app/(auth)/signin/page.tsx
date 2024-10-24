import AuthForm from "@/_components/auth/AuthForm";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <AuthForm />

      <div>
        <Link
          className="text-center text-black text-4xl font-normal font-['Pretendard'] leading-[54px]"
          href={"/signup"}
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}
