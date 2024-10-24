"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Child } from "../../page";
import { useState } from "react";

interface RegisterStep1Props {
  child: Child; // child prop 추가
  onNext: (data: Partial<Child>) => void;
}
const formSchema = z.object({
  name: z.string().min(1, {
    message: "이름은 필수입니다."
  }),
  birthday: z.string().nonempty("생년월일은 필수입니다."),
  notes: z.string().optional()
});

const RegisterStep1 = ({ child, onNext }: RegisterStep1Props) => {
  const [name, setName] = useState(child.name);
  const [birthdate, setBirthdate] = useState(child.birthday);
  const [note, setNote] = useState(child.notes || "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      birthday: "",
      notes: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div>
      <h1>1단계</h1>
      <h2>정보를 입력해 주세요.</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* FormField 컴포넌트 여기에 추가 */}
        </form>
      </Form>
    </div>
  );
};

export default RegisterStep1;
