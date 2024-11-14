"use server";

import { createClient } from "@/utils/supabase/server";
import { AuthFormSignIn, AuthFormSignUp, AuthResponseWithUser } from "@/types/user";
import { redirect } from "next/navigation";

export async function signin(formData: AuthFormSignIn) {
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password
  };

  console.log(data);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Sign Up Error:", error);
  }

  // revalidatePath("/", "layout");
  // redirect("/");
}

export async function signup(formData: AuthFormSignUp): Promise<AuthResponseWithUser> {
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        name: formData.name
      }
    }
  };

  try {
    const response = await supabase.auth.signUp(data);

    /// 오류 처리
    if (response.error) {
      if (response.error.message.includes("already registered")) {
        throw new Error("이미 가입된 이메일입니다.");
      }
      throw new Error(response.error.message || "회원가입 중 오류가 발생했습니다.");
    }

    // 응답에서 user 정보를 반환
    const user = response.data?.user;

    if (user) {
      const userResponse: AuthResponseWithUser = {
        ...response,
        user: {
          id: user.id,
          email: user.email || "", // 이메일 정보가 없을 때 빈 문자열로 처리
          created_at: user.created_at
        }
      };
      return userResponse; // 유저 정보 return
    } else {
      throw new Error("회원가입 후 사용자 정보가 없습니다.");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("회원가입 오류:", error.message);
      throw error; // 오류를 다시 던짐
    } else {
      console.error("알 수 없는 오류:", error);
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
}

export async function signout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}
