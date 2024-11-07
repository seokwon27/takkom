"use server";

import { createClient } from "@/utils/supabase/server";
import { AuthFormSignIn, AuthFormSignUp } from "@/types/user";


export async function signin(formData: AuthFormSignIn) {
  const supabase = createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Sign Up Error:", error);

    throw new Error("로그인 중 오류가 발생했습니다.");
  }

  // revalidatePath("/", "layout");
  // redirect("/");
}

export async function signup(formData: AuthFormSignUp) {
  const supabase = createClient();
  
  const data = {
    email: formData.email,
    password: formData.password,
      options: {
        data: {
          name: formData.name
        }
      }
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error("Sign Up Error :", error);

    throw new Error("회원가입 중 오류가 발생했습니다.");
  }

  // revalidatePath("/", "layout");
  // redirect("/");
}

export async function signout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  // redirect("/");
}