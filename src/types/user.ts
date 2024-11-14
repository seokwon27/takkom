import { AuthResponse } from "@supabase/supabase-js";
import { Tables } from "../../database.types";

export type AuthFormSignUp = {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
};

export type AuthFormSignIn = {
  email: string;
  password: string;
};

export type AuthResponseWithUser = AuthResponse & {
  user: {
    id: string;
    email: string;
    created_at: string;
  };
};

export type Like = Tables<"like">;
