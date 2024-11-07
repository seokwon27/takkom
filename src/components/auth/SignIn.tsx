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
import { AuthFormSignIn } from "@/types/user";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import google from "../../../public/Auth/signin/google.png";
import kakao from "../../../public/Auth/signin/kakaotalk.svg";
import kkom from "../../../public/logo.svg";
import Image from "next/image";

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
    email: z.string().min(8, { message: "아이디를 8자리 이상 입력해주세요." }),
    password: z.string().min(8, { message: "비밀번호를 8자리 이상 입력해주세요." })
  });

  const form = useForm({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema)
  });

  const signIn = async (data: AuthFormSignIn) => {
    try {
      const { error } = await browserClient.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) throw error;

      alert("로그인 성공!");
      // console.log("로그인 데이터:", data);
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
        },
        redirectTo: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL // 환경
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
        },
        redirectTo: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL
      }
    });

    if (data) console.log("로그인 데이터 : ", data);

    if (error) console.log("로그인 실패 : ", error);
  };

  const getUser = async () => {
    const { data, error } = await browserClient.auth.getUser();
    if (error) {
      console.log("유져 정보 가져오기 실패! : ", error);
      return null;
    }
    return data?.user?.id || null;
  };

  console.log(getUser);

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Form {...form}>
        <div className="flex flex-col justify-center items-center">
          <Image src={kkom} alt="따꼼 로고" className="mb-[80px]" />
          <div>
            <form onSubmit={form.handleSubmit(signIn)}>
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
                    <FormDescription className={form.formState.errors.password ? "text-red-500" : "text-gray-600"}>
                      {form.formState.errors.password?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="self-stretch justify-between items-start inline-flex">
                <Button
                  type="submit"
                  className="w-96 h-14 px-6 py-4 mt-[40px] bg-[#c1d8ff] rounded-xl flex-col justify-center items-center gap-2.5 inline-flex hover:bg-primary-400 text-lg"
                >
                  로그인
                </Button>
              </div>
            </form>
            <div className="flex justify-center items-center gap-2.5 p-3 md-[12px]">
              <Link href={"/"} className="text-[#636363] text-base font-normal leading-normal m-[12px]">
                비밀번호 찾기
              </Link>
              <Link href={"/signup"} className="text-[#636363] text-base font-normal leading-normal m-[12px]">
                회원가입
              </Link>
            </div>
            <div className="self-stretch text-center text-[#4a4a4a] text-base font-normal leading-normal mb-[24px] mt-[80px]">
              간편 로그인
            </div>
            <div className="flex flex-row justify-center items-center gap-[24px] mb-[100px]">
              <Button onClick={googleSignIn} className="bg-transparent hover:bg-transparent">
                <Image src={google} alt="구글 소셜 로그인" />
              </Button>
              <Button onClick={kakaoSignIn} className="bg-transparent hover:bg-transparent">
                <Image src={kakao} alt="카카오 소셜 로그인" />
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
