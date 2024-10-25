"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

// 주소값의 path에 따라 조건부 스키마
const signUpPath = "/signup";

// 임시로 타입 지정 추후에 타입 파일에 추가 예정
type AuthFormInputs = {
  id: string;
  password: string;
  passwordCheck?: string; // 회원가입일 때만 필요하므로 선택적임
  name?: string; // 회원가입일 때만 필요하므로 선택적임
};

export default function AuthForm() {
  // 현재 주소값을 받아와 signUp과 비교
  const path = usePathname();

  // 주소값이 signup일 때를 현재 주소값과 비교하여 state 정의
  const defaultValues =
    path === signUpPath
      ? {
          id: "",
          password: "",
          passwordCheck: "",
          name: ""
        }
      : {
          id: "",
          password: ""
        };

  // 주소값이 signup일 때를 현재 주소값과 비교하여 스케마를 다르게 적용
  const schema =
    path === signUpPath // 회원가입페이지 스케마
      ? z
          .object({
            id: z
              .string()
              .min(5, { message: "5글자 이상 입력해주세요." })
              .max(20, { message: "20글자 이하로 입력해주세요." }),
            password: z
              .string()
              .min(8, { message: "8글자 이상 입력해주세요," })
              .max(16, { message: "16글자 이하로 입력해주세요." }),
            passwordCheck: z
              .string()
              .min(8, { message: "8글자 이상 입력해주세요," })
              .max(16, { message: "16글자 이하로 입력해주세요." }),
            name: z.string().min(1, { message: "이름을 입력해주세요." })
          })
          .superRefine(({ password, passwordCheck }, ctx) => {
            // 비밀번호 재확인 체크
            if (password !== passwordCheck) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "비밀번호가 일치하지 않습니다.",
                path: ["passwordCheck"]
              });
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "비밀번호가 일치하지 않습니다.",
                path: ["password"]
              });
            }
          })
      : z.object({
          // 로그인 페이지 스케마
          id: z.string().min(1, { message: "아이디를 입력해주세요." }),
          password: z.string().min(1, { message: "비밀번호를 입력해주세요." })
        });

  const form = useForm({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema)
  });

  const signUp = async (data: AuthFormInputs) => {
    try {
      // 회원가입 로직: 예를 들어 API 호출
      console.log("회원가입 데이터:", data);
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const signIn = async (data: AuthFormInputs) => {
    try {
      console.log("로그인 데이터:", data);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  // 소셜로그인
  // 구글
  // 카카오
  // 페이스북
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(path === signUpPath ? signUp : signIn)}>
        <FormItem>
          <FormLabel>아이디</FormLabel>
          <FormControl>
            <Input {...form.register("id")} />
          </FormControl>
          <FormMessage>{form.formState.errors.id?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel>비밀번호</FormLabel>
          <FormControl>
            <Input type="password" {...form.register("password")} />
          </FormControl>
          <FormMessage>{form.formState.errors.password?.message}</FormMessage>
        </FormItem>

        {path === signUpPath && (
          <>
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input type="password" {...form.register("passwordCheck")} />
              </FormControl>
              <FormMessage>{form.formState.errors.passwordCheck?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input {...form.register("name")} />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          </>
        )}

        <Button type="submit">{path === signUpPath ? "회원가입" : "로그인"}</Button>
      </form>
    </Form>
  );
}
