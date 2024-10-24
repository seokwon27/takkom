import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <AuthForm />

      <div>
        <Link href={"/signup"}>회원가입</Link>
      </div>
    </div>
  );
}
