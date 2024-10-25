"use client";

import { useForm } from "react-hook-form";
import { Child } from "../../page";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


interface RegisterStep2Props {
  child: Child; // child prop 추가
  onPrev: () => void;
  onComplete: () => void;
}


const formSchema = z.object({
  name: z.string().min(1, { message: "이름은 필수입니다." }),
  birthday: z.string().min(1, { message: "생년월일은 필수입니다." }),
  notes: z.string().optional()
});


const RegisterStep2 = ({ onPrev, onComplete }: RegisterStep2Props) => {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      birthday: "",
      notes: ""
    }
  });

  const onSubmit = (data: Partial<Child>) => {
    console.log("접종 내역:", data);
    onComplete(); // 완료 처리
  };
  
  return (
    <div>
      <h1>2단계</h1>
      <h2>접종 완료한 내역을 선택해주세요.</h2>
      {/* 여기에 접종 리스트 체크리스트 들어 올 예정 */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input placeholder="이름을 입력하세요" {...field} />
                </FormControl>
                <FormDescription>아이의 이름을 입력해 주세요.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>생년월일</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>아이의 생년월일을 입력해 주세요.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>특이사항</FormLabel>
                <FormControl>
                  <Input placeholder="특이사항을 입력하세요" {...field} />
                </FormControl>
                <FormDescription>아이에 대한 특이사항을 입력해 주세요.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4">
            완료
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterStep2;
