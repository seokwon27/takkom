import { useMutation } from "@tanstack/react-query";

async function resetPasswordRequest({ email, name }: { email: string; name: string }) {
  const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, name })
  });

  if (!response.ok) {
    throw new Error("이메일 발송에 실패앴습니다.");
  }

  return response.json();
}

const TemporaryPassword = () => {
  const mutation = useMutation({
    mutationFn: resetPasswordRequest,
    onSuccess: (data) => {
      console.log("성공:", data);
    },
    onError: (error: Error) => {
      console.error("error:", error.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;

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

export default TemporaryPassword;
