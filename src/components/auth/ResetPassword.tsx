"use client";

import resetPass from "@/api/reset-password";
import { ResetPasswordRequest } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const router = useRouter();

  const resetpass = async (data: ResetPasswordRequest) => {
    try {
      await resetPass({
        email: data.email,
        newPassword: data.newPassword,
        name: data.name
      });

      return { message: "비밀번호가 성공적으로 변경되었습니다." };
    } catch (error) {
      console.log("비밀번호 변경 실패 : ", error);

      throw new Error("비밀번호 변경에 실패했습니다.");
    }
  };

  const mutation = useMutation<{ message: string }, Error, ResetPasswordRequest>({
    mutationFn: resetpass,
    onSuccess: (data) => {
      alert("비밀번호가 성공적으로 변경되었습니다.");
      console.log("성공:", data);
      router.push("/mypage"); // 성공 후 마이페이지 이동
    },
    onError: (error: Error) => {
      console.error("오류:", error.message);
      alert("비밀번호 변경에 실패했습니다. 오류: " + error.message);
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const newPassword = (form.elements.namedItem("newPassword") as HTMLInputElement).value;

    if (!email || !name || !newPassword) {
      alert("이메일, 이름, 새 비밀번호를 모두 입력해 주세요.");
      return;
    }

    mutation.mutate({ email, name, newPassword }); // 비밀번호 변경 요청
  };

  return (
    <div>
      <h1>비밀번호 변경</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">이름:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div>
          <label htmlFor="email">이메일 주소:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div>
          <label htmlFor="newPassword">새 비밀번호:</label>
          <input type="password" id="newPassword" name="newPassword" required />
        </div>

        <button type="submit" disabled={mutation.status === "pending"}>
          {mutation.status === "pending" ? "로딩 중..." : "비밀번호 변경"}
        </button>
      </form>

      {/* 로딩 상태, 오류 상태, 성공 메시지 처리 */}
      {mutation.status === "pending" && <p>로딩 중...</p>}
      {mutation.status === "error" && <p style={{ color: "red" }}>오류: {mutation.error?.message}</p>}
      {mutation.status === "success" && <p>{mutation.data?.message}</p>}
    </div>
  );
};

export default ResetPassword;
