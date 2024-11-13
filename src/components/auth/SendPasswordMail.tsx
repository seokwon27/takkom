"use client";

import sendEmail from "@/api/send-email";
import { SendEmailForm } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

const SendPasswordMail = () => {
  const sendmail = async (data: SendEmailForm) => {
    try {
      await sendEmail({
        email: data.email,
        name: data.name
      });
    } catch (error) {
      console.log("메일 발송 실패 : ", error);

      throw new Error("메일 발송 실패.");
    }
  };

  const mutation = useMutation({
    mutationFn: sendmail,
    onSuccess: (data) => {
      alert("이메일이 발송되었습니다.");
      console.log("성공:", data);
    },
    onError: (error: Error) => {
      console.error("error:", error.message);
      alert("비밀번호 변경에 실패했습니다. 오류: " + error.message);
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;

    if (!email || !name) {
      alert("이메일, 이름을 모두 입력해 주세요.");
      return;
    }

    mutation.mutate({ email, name });
  };
  return (
    <div>
      <h1>비밀번호 재설정</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">이름:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div>
          <label htmlFor="email">이메일 주소:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <button type="submit" disabled={mutation.status === "pending"}>
          {mutation.status === "pending" ? "로딩 중..." : "비밀번호 재설정 이메일 보내기"}
        </button>
      </form>

      {/* 로딩 상태, 오류 상태, 성공 메시지 처리 */}
      {mutation.status === "pending" && <p>로딩 중...</p>}
      {mutation.status === "error" && <p style={{ color: "red" }}>오류: {mutation.error?.message}</p>}
      {mutation.status === "success" && <p>{mutation.data?.message}</p>}
    </div>
  );
};

export default SendPasswordMail;
