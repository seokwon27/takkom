"use server";

import { SendEmailForm } from "@/types/user";
import { createClient } from "@/utils/supabase/server";

export default async function sendEmail(req: SendEmailForm) {
  const supabase = createClient();

  const data = {
    email: req.email,
    name: req.name
  };
  // email , name 입력 확인
  if (!data.email || !data.name) {
    return alert("비밀번호 또는 이름을 확인해주세요.");
  }

  try {
    console.log("유져확인");
    // 유저 확인
    const { data: user, error: userError } = await supabase
      .from("user")
      .select("*")
      .eq("email", data.email)
      .eq("name", data.name);

    console.log(user);
    console.log(userError);

    // if (userError || user.length === 0) {
    //   return console.log("이메일 또는 이름이 일치하는 사용자가 없습니다.");
    // }

    // 비밀번호 재설정 이메일 발송
    console.log(`${process.env.NEXT_PUBLIC_PASSWORD_REDIRECT_URL}`);

    const { error: resetError, data: password } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_PASSWORD_REDIRECT_URL}` // 비밀번호 재설정 링크 URL 환경변수로 관리 및 vercel 설정
    });
    console.log(password);

    console.log("123");

    if (resetError) {
      return alert(`이메일 발송 실패 : ${resetError}`);
    }

    return { message: "비밀번호 재설정 이메일이 발송되었습니다." };
  } catch (error) {
    return { error: `서버 오류 : ${error}` };
  }
}
