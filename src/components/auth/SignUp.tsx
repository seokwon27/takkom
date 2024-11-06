"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import browserClient from "@/utils/supabase/client";
import { AuthFormSignUp } from "@/types/user";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import kkom from "../../../public/logo.svg";

const SignUp = () => {
  // 비밀번호 표시 상태 관리
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const [issignIn, setIsSignIn] = useState(false);

  const router = useRouter();

  const defaultValues = {
    email: "",
    password: "",
    passwordCheck: "",
    name: ""
  };

  const schema = z
    .object({
      email: z
        .string()
        .min(5, { message: "5글자 이상 입력해주세요." })
        .max(30, { message: "30글자 이하로 입력해주세요." }),
      password: z
        .string()
        .min(8, { message: "8글자 이상 입력해주세요." })
        .max(16, { message: "16글자 이하로 입력해주세요." }),
      passwordCheck: z
        .string()
        .min(8, { message: "8글자 이상 입력해주세요." })
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
      } else {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "비밀번호가 일치합니다.",
          path: ["passwordCheck"]
        });
      }
    });

  const form = useForm({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema)
  });

  const signUp = async (data: AuthFormSignUp) => {
    try {
      const { error } = await browserClient.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name
          }
        }
      });

      if (error) throw error;

      alert("회원가입 성공!");
      console.log("회원가입 데이터:", data);
      router.push("/");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("이미 가입 된 정보입니다"); //error case 좀 알아보고 에러별 alert 작성해야할듯
    }
  };

  const getUser = async () => {
    const { data, error } = await browserClient.auth.getSession();
    if (error) {
      console.log("유져 정보 가져오기 실패! : ", error);
      return null;
    }
    return data?.session?.user?.id || null;
  };

  useEffect(() => {
    const checkSignInStatus = async () => {
      const userId = await getUser();
      if (userId) {
        setIsSignIn(true);
      } else {
        setIsSignIn(false);
      }
    };
    checkSignInStatus();
  }, []);

  const passCheck = () => {
    if (form.formState.errors.passwordCheck?.message === "비밀번호가 일치합니다.") {
      return "text-informative";
    } else {
      return "text-negative";
    }
  };

  console.log(issignIn);

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Form {...form}>
        <Image src={kkom} alt="따꼼 로고" className="mb-[80px]" />
        <form onSubmit={form.handleSubmit(signUp)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">이메일</FormLabel>
                <FormControl>
                  <div className="relative w-96">
                    <Input
                      className={`w-full h-14 px-6 py-4 ${
                        form.formState.errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="이메일을 입력해주세요."
                      {...field}
                    />
                  </div>
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
                  <div className="relative w-96">
                    <Input
                      className={`w-full h-14 px-6 py-4 ${
                        form.formState.errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력해주세요."
                      {...field}
                    />
                    <label>
                      <Button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent text-gray-600 hover:bg-transparent hover:text-black"
                      >
                        {showPassword ? <Eye /> : <EyeOff />}
                      </Button>
                    </label>
                  </div>
                </FormControl>
                <FormDescription className={form.formState.errors.password ? "text-negative" : "text-gray-600"}>
                  {form.formState.errors.password?.message}
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordCheck"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">비밀번호 확인</FormLabel>
                <FormControl>
                  <div className="relative w-96">
                    <Input
                      className={`w-full h-14 px-6 py-4 ${
                        form.formState.errors.passwordCheck ? "border-red-500" : "border-gray-300"
                      }`}
                      type={showPasswordCheck ? "text" : "password"}
                      placeholder="비밀번호를 재입력 해주세요."
                      {...field}
                    />
                    <label>
                      <Button
                        type="button"
                        onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent text-gray-600 hover:bg-transparent hover:text-black"
                      >
                        {showPasswordCheck ? <Eye /> : <EyeOff />}
                      </Button>
                    </label>
                  </div>
                </FormControl>
                <FormDescription className={form.formState.errors.passwordCheck ? passCheck() : "text-gray-600"}>
                  {form.formState.errors.passwordCheck?.message}
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">이름</FormLabel>
                <FormControl>
                  <div className="relative w-96">
                    <Input
                      className={`w-full h-14 px-6 py-4 ${
                        form.formState.errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="이름을 입력해주세요."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription className={form.formState.errors.name ? "text-red-500" : "text-gray-600"}>
                  {form.formState.errors.name?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-96 h-14 px-6 py-4 mt-[40px] mb-[141px] bg-[#c1d8ff] rounded-xl flex-col justify-center items-center gap-2.5 inline-flex hover:bg-primary-400 text-lg"
          >
            회원가입
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
