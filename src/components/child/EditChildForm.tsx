"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import browserClient from "@/utils/supabase/client";
import { Child } from "@/types/childType";

interface EditFormProps {
  child: Child;
  onComplete: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "이름은 필수입니다." }),
  birth: z.string().min(1, { message: "생년월일은 필수입니다." }),
  notes: z.string().optional(),
  profileImage: z.instanceof(File).optional()
});

const EditChildForm = ({ child, onComplete }: EditFormProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: child.name,
      birth: child.birth,
      notes: child.notes || ""
    }
  });

 const onSubmit = async (data: z.infer<typeof formSchema>) => {
   const supabase = browserClient;

   const { error } = await supabase
     .from("child")
     .update({
       name: data.name,
       birth: data.birth,
       notes: data.notes
       // 프로필 이미지 업데이트 처리 추가
     })
     .eq("id", child.id);

   if (error) {
     console.error("수정 중 오류 발생:", error);
     return;
   }

   onComplete(); // 완료 후 부모 컴포넌트에 통보
 };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label>이름</label>
        <input {...form.register("name")} />
        {form.formState.errors.name && <span>{form.formState.errors.name.message}</span>}
      </div>
      <div>
        <label>생년월일</label>
        <input {...form.register("birth")} />
        {form.formState.errors.birth && <span>{form.formState.errors.birth.message}</span>}
      </div>
      <div>
        <label>특이사항</label>
        <textarea {...form.register("notes")} />
      </div>
      <button type="submit">수정 완료</button>
    </form>
  );
};

export default EditChildForm;
