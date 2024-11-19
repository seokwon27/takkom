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
// import { signin } from "@/api/auth-actions";
import ErrorModal from "./SignInErrorModal";

const SignIn = () => {
  // 비밀번호 표시 상태 관리
  const [showPassword, setShowPassword] = useState(false);

  // 로그인 오류 메시지 상태 관리
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const defaultValues = {
    email: "",
    password: ""
  };

  // 로그인 페이지 스키마
  const schema = z.object({
    email: z.string().min(8, { message: "이메일을 8자리 이상 입력해주세요." }),
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

      router.push("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      setErrorMessage("이메일 또는 비밀번호가 틀렸습니다. \n 다시 시도해주세요.");
      setShowErrorModal(true);
    }
  };
  // const signIn = async (data: AuthFormSignIn) => {
  //   console.log("로그인 시도");
  //   try {
  //     await signin({
  //       email: data.email,
  //       password: data.password
  //     });

  //     // router.push("/");
  //   } catch (error) {
  //     // 로그인 실패 시 모달 열기
  //     console.error("로그인 실패:", error);
  //     setErrorMessage("이메일 또는 비밀번호가 틀렸습니다. 다시 시도해주세요.");
  //     setShowErrorModal(true);
  //   }
  // };

  const googleSignIn = async () => {
    const { error } = await browserClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent"
        },
        redirectTo: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL // 환경
      }
    });

    if (error) console.log("로그인 실패 : ", error);
  };

  const kakaoSignIn = async () => {
    const { error } = await browserClient.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent"
        },
        redirectTo: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL
      }
    });

    if (error) console.log("로그인 실패 : ", error);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-[100px] max-sm:mt-[40px]">
      <Form {...form}>
        <div className="flex flex-col justify-center items-center">
          <Image src={kkom} alt="따꼼 로고" className="mb-[64px]" />
          <div>
            <form onSubmit={form.handleSubmit(signIn)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-[16px]">
                    <FormLabel className="text-gray-600">이메일</FormLabel>
                    <FormControl>
                      <div className="relative w-96 max-sm:col-span-2 max-sm:relative">
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
                      <div className="relative">
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
              <div className="self-stretch justify-between items-start inline-flex mt-[24px]">
                <Button
                  type="submit"
                  className="w-96 h-14 px-6 py-4 bg-[#c1d8ff] rounded-xl inline-flex items-center justify-center gap-2 text-base font-semibold hover:bg-primary-400 disabled:bg-primary-400"
                >
                  로그인
                </Button>
              </div>
            </form>
            <div className="flex justify-center items-center gap-[15px] p-[15px]">
              <Link href={"/"} className="text-[#636363] text-base font-normal leading-normal p-[12px]">
                비밀번호 찾기
              </Link>
              <Link href={"/signup"} className="text-[#636363] text-base font-normal leading-normal p-[12px]">
                회원가입
              </Link>
            </div>
            <div>
              <div className="self-stretch text-center text-[#4a4a4a] text-base font-normal leading-normal mb-[24px] mt-[32px]">
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
        </div>
      </Form>

      <ErrorModal showModal={showErrorModal} onClose={() => setShowErrorModal(false)} message={errorMessage} />
    </div>
  );
};

export default SignIn;
