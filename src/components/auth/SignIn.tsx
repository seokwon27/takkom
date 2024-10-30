"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import browserClient from "@/utils/supabase/client";

// 임시로 타입 지정 추후에 타입 파일에 추가 예정
type AuthFormInputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  // 비밀번호 표시 상태 관리
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

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
      const { error } = await browserClient.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) throw error;

      alert("로그인 성공!");
      console.log("로그인 데이터:", data);
      router.push("/");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const googleSignIn = async () => {
    const { data, error } = await browserClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent"
        }
      }
    });

    if (data) console.log("로그인 데이터 : ", data);

    if (error) console.log("로그인 실패 : ", error);
  };

  const kakaoSignIn = async () => {
    const { data, error } = await browserClient.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent"
        }
      }
    });

    if (data) console.log("로그인 데이터 : ", data);

    if (error) console.log("로그인 실패 : ", error);
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
                <>
                  <Input
                    className={form.formState.errors.password ? "border-red-500" : "border-gray-300"}
                    type={showPassword ? "text" : "password"}
                    placeholder="PASSWORD"
                    {...field}
                  />
                  <label>
                    <Button type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <p>숨기기</p> : <p>보이기</p>}
                    </Button>
                  </label>
                </>
              </FormControl>
              <FormDescription className={form.formState.errors.password ? "text-red-500" : "text-gray-600"}>
                {form.formState.errors.password?.message}
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit">로그인</Button>
        <Button>회원가입</Button>
      </form>
      <Button onClick={googleSignIn}>구글로그인</Button>
      <Button onClick={kakaoSignIn}>카카오로그인</Button>
    </Form>
  );
};

export default SignIn;
