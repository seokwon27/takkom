"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { AuthFormSignUp } from "@/types/user";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import kkom from "../../../public/logo.svg";
import { signup } from "@/api/auth-actions";
import SignUpModal from "./SignUpModal";

const SignUp = () => {
  // 비밀번호 표시 상태 관리
  //TODO : 다 탄스택쿼리로 수정해야함
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false); // 상태 모달 열기/닫기
  const [status, setStatus] = useState<"success" | "failure">("success"); // 성공/실패 상태
  const [message, setMessage] = useState(""); // 모달 메시지

  const router = useRouter();

  // 비밀번호 정규식 영어, 숫자 포함 8글자
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

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
        .min(8, { message: "8자리 이상 입력해주세요." })
        .refine((value) => passwordRegex.test(value), { message: "영문, 숫자를 포함하여 8자리 이상 입력해주세요." }),
      passwordCheck: z
        .string()
        .min(8, { message: "영문, 숫자를 포함하여 8자리 이상 입력해주세요" })
        .refine((value) => passwordRegex.test(value), { message: "영문, 숫자를 포함하여 8자리 이상 입력해주세요." }),
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
      }
      // 회원가입 시 비밀번호 일치해도 작동해서 주석처리
      // else {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "비밀번호가 일치합니다.",
      //     path: ["passwordCheck"]
      //   });
      // }
    });

  const form = useForm({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema)
  });

  const signUp = async (data: AuthFormSignUp) => {
    try {
      await signup({
        email: data.email,
        password: data.password,
        passwordCheck: data.passwordCheck,
        name: data.name
      });

      setStatus("success");
      setMessage("회원가입이 성공적으로 완료되었습니다!");
      setShowStatusModal(true);
      setTimeout(() => {
        router.push("/"); // 2초 후 홈으로 리다이렉트
      }, 2000);
    } catch (error: unknown) {
      console.error("회원가입 실패:", error);

      // error를 Error 타입으로 단언
      const e = error as Error;

      // 이미 가입된 이메일 처리
      if (e.message === "이미 가입된 이메일입니다.") {
        setStatus("failure");
        setMessage("이미 가입된 이메일입니다.");
      } else {
        setStatus("failure");
        setMessage("회원가입 중 오류가 발생했습니다. \n 다시 시도해주세요.");
      }
      setShowStatusModal(true);
    }
  };

  // const passCheck = () => {
  //   if (form.formState.errors.passwordCheck?.message === "비밀번호가 일치합니다.") {
  //     return "text-informative";
  //   } else {
  //     return "text-negative";
  //   }
  // };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[384px]">
      <Form {...form}>
        <Image src={kkom} alt="따꼼 로고" className="mb-[80px]" />
        <form className="w-full" onSubmit={form.handleSubmit(signUp, console.log)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-[24px]">
                <FormLabel className="text-gray-600">
                  이메일 <span className="text-primary-400">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full max-sm:w-80">
                    <Input
                      className={`w-full h-14 px-6 py-4 ${
                        form.formState.errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="이메일을 입력해주세요."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription className={form.formState.errors.email ? "text-negative" : "text-gray-600"}>
                  {form.formState.errors.email?.message}
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-[24px]">
                <FormLabel className="text-gray-600">
                  비밀번호 <span className="text-primary-400">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full ">
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
              <FormItem className="mb-[24px]">
                <FormLabel className="text-gray-600">
                  비밀번호 확인 <span className="text-primary-400">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      className={`w-full h-14 px-6 py-4 mb-[24px] ${
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
                <FormDescription className={form.formState.errors.passwordCheck ? "text-negative" : "text-gray-600"}>
                  {form.formState.errors.passwordCheck?.message}
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-[24px]">
                <FormLabel className="text-gray-600">
                  이름 <span className="text-primary-400">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      className={`w-full h-14 px-6 py-4 mb-[24px] ${
                        form.formState.errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="이름을 입력해주세요."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription className={form.formState.errors.name ? "text-negative" : "text-gray-600"}>
                  {form.formState.errors.name?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!form.formState.isValid} // 폼이 유효하지 않으면 버튼 비활성화
            className={`w-96 max-sm:w-80 h-14 px-6 py-4 mt-[40px] mb-[141px] bg-[#c1d8ff] rounded-xl flex-col justify-center items-center gap-2.5 inline-flex ${
              form.formState.isValid ? "bg-primary-400" : "bg-[#c1d8ff] cursor-not-allowed"
            }`}
          >
            회원가입
          </Button>
        </form>
      </Form>
      {/* 회원가입 완료 모달 */}
      <SignUpModal
        showModal={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        status={status}
        message={message}
      />
    </div>
  );
};

export default SignUp;
