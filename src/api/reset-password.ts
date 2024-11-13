"use server";

import { ResetPasswordRequest } from "@/types/user";
import { createClient } from "@/utils/supabase/server";

export default async function resetPass(req: ResetPasswordRequest) {
  const supabase = createClient();

  const data = {
    email: req.email,
    newPassword: req.newPassword,
    name: req.name
  };

  // email, name, newPassword 입력 확인
  if (!data.email || !data.name) {
    return alert("비밀번호 또는 이름을 확인해주세요.");
  }

  try {
    // 유저 확인
    const { data: user, error: userError } = await supabase
      .from("user")
      .select("*")
      .eq("email", data.email)
      .eq("name", data.name);

    if (userError || !user || user.length === 0) {
      return alert("이메일 또는 이름이 일치하는 사용자가 없습니다.");
    }

    // 비밀번호 변경 요청
    if (data.newPassword) {
      // 비밀번호 재설정
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });

      if (error) {
        return console.log("비밀번호 변경에 실패했습니다. 사유 : ", error);
      }

      return alert("비밀번호가 성공적으로 변경되었습니다.");
    }
  } catch (error) {
    return console.log("비밀번호 변경에 실패했습니다. 사유 : ", error);
  }
}
