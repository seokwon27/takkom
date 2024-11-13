import browserClient from "@/utils/supabase/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, name } = req.body;

    // email , name 입력 확인
    if (!email || !name) {
      return res.status(400).json({ message: "이메일,이름을 확인해주세요." });
    }

    try {
      // 유저 확인
      const { data: user, error: userError } = await browserClient
        .from("user")
        .select("*")
        .eq("email", email)
        .eq("name", name);

      if (userError || !user || user.length === 0) {
        return res.status(400).json({ message: "이메일 또는 이름이 일치하는 사용자가 없습니다." });
      }

      // 비밀번호 재설정 이메일 발송
      const { error } = await browserClient.auth.resetPasswordForEmail(email);

      // error 처리
      if (error) {
        return res.status(500).json({ message: "이메일 발송에 실패했습니다." });
      }

      return res.status(200).json({ message: "입력하신 메일로 전송되었습니다." });
    } catch (error) {
      return res.status(500).json({ message: `서버 오류 : ${error}` });
    }
  }
}
