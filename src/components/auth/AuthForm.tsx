"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function AuthForm() {
  // useForm을 써보ㅈF....
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  const formSchema = z.object({
    userid: z
      .string()
      .min(2, { message: "아이디는 2글자 이상입니다." })
      .max(20, { message: "아이디는 20글자 이하입니다" })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userid: ""
    }
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(value);
  };

  // 로그인에 대한 유효성 검사
  const signIn = () => {};
  // 아이디
  // 패스워드

  // 회원가입에 대한 유효성 검사
  const signUp = () => {};
  // 아이디 - 중복, 형식, 특수문자
  // 패스워드 - 특수문자, 글자수, 보안강도
  // 특수문자 필수? 숫자는? 영어대문자는? << 범위 설정 회의 필요
  // 패스워드 재확인
  // 이름

  // 소셜로그인
  // 구글
  // 카카오
  // 페이스북
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input placeholder="아이디 쓰셈ㅋ" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PASSWORD</FormLabel>
              <FormControl>
                <Input placeholder="비번은 안씀?ㅋ" {...field} />
              </FormControl>
              <FormDescription>This is your public display password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">로그인</Button>
      </form>
    </Form>
  );
}
