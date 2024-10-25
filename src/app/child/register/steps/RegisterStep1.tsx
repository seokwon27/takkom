"use client";

import { useForm } from "react-hook-form";
import { Child } from "../../page";
import RegisterFormField from "@/components/child/RegisterFormField";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Form, FormItem, FormLabel, Input, Button } from "shadcn-react-ui";

interface RegisterStep1Props {
  child: Child; // child prop 추가
  onNext: (data: Partial<Child>) => void;
}

const RegisterStep1 = ({ child, onNext }: RegisterStep1Props) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: child.name,
      birthday: child.birthday,
      notes: child.notes
    }
  });

  const onSubmit = (data: Partial<Child>) => {
    console.log(data);
    onNext(data); // 2단계로 이동
  };

  return (
    <div>
      <h1>1단계</h1>
      <h2>정보를 입력해 주세요.</h2>
      {/* <Form onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <FormLabel>아이 이름</FormLabel>
          <Input type="text" {...register("name", { required: true })} />
        </FormItem>

        <FormItem>
          <FormLabel>생년월일</FormLabel>
          <Input type="date" {...register("birthday", { required: true })} />
        </FormItem>

        <FormItem>
          <FormLabel>특이사항</FormLabel>
          <Input type="text" {...register("notes")} />
        </FormItem>

        <Button type="submit" className="mt-4">
          다음
        </Button>
      </Form> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>이름</label>
          <input {...register("name", { required: true })} placeholder="아이 이름" />
        </div>
        <div>
          <label>생년월일</label>
          <input {...register("birthday", { required: true })} type="date" />
        </div>
        <div>
          <label>특이사항</label>
          <textarea {...register("notes")} placeholder="자유롭게 입력해주세요. (선택)" />
        </div>
        <button type="submit">다음</button>
      </form>
      {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <RegisterFormField control={form.control} name="name" placeholder="아이의 이름" label="이름" />
        <RegisterFormField control={form.control} name="birthday" placeholder="생년월일" label="생년월일" />
        <RegisterFormField control={form.control} name="notes" placeholder="특이사항" label="특이사항" />
        <button type="submit" className="btn btn-primary">
          등록하기
        </button>
      </form> */}
    </div>
  );
};

export default RegisterStep1;
