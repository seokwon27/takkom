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

export type Like = Tables<'like'>