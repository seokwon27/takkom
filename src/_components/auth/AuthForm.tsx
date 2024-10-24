"use client";

import { FieldValues, useForm } from "react-hook-form";

export default function AuthForm() {
  // useForm을 써보ㅈF....
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = (value: FieldValues) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">아이디</label>
        <input {...register("id")} type="id" placeholder="id" />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input {...register(`password`)} type="password" placeholder="password" />
      </div>
      <button className="bg-purple-950 text-white px-4 py-2 rounded-none" type="submit">
        로그인
      </button>
    </form>
  );
}
