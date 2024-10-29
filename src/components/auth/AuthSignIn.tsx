"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// 임시로 타입 지정 추후에 타입 파일에 추가 예정
type AuthFormInputs = {
  email: string;
  password: string;
};

const AuthForm = () => {
  const defaultValues = {
    email: "",
    password: ""
  };

  // 로그인 페이지 스키마
  const schema = z.object({
    email: z.string().min(1, { message: "아이디를 입력해주세요." }),
    password: z.string().min(1, { message: "비밀번호를 입력해주세요." })
  });

  const form = useForm({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema)
  });

  const signIn = async (data: AuthFormInputs) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) throw error;

      console.log("로그인 데이터:", data);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(signIn)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">이메일</FormLabel>
              <FormControl>
                <Input
                  className={form.formState.errors.email ? "border-red-500" : "border-gray-300"}
                  placeholder="email@email.com"
                  {...field}
                />
              </FormControl>
              <FormDescription className={form.formState.errors.email ? "text-red-500" : "text-gray-600"}>
                {form.formState.errors.email?.message}
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">비밀번호</FormLabel>
              <FormControl>
                <Input
                  className={form.formState.errors.password ? "border-red-500" : "border-gray-300"}
                  placeholder="PASSWORD"
                  {...field}
                />
              </FormControl>
              <FormDescription className={form.formState.errors.password ? "text-red-500" : "text-gray-600"}>
                {form.formState.errors.password?.message}
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit">로그인</Button>
      </form>
    </Form>
  );
};

export default AuthForm;
