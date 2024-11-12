"use server";

import { createClient } from "@/utils/supabase/server";
import { AuthFormSignIn, AuthFormSignUp } from "@/types/user";
import { redirect } from "next/navigation";

export async function signin(formData: AuthFormSignIn) {
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Sign Up Error:", error);
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
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error("Sign Up Error :", error);
  }

  // revalidatePath("/", "layout");
  // redirect("/");
}

export async function signout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}
