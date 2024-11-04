import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { formSchema } from "@/app/child/register/steps/RegisterStep1";

interface RegisterStep1FormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>; // form prop의 타입 수정
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>; // 수정된 데이터 타입 사용
  setSelectedImage: (file: File | undefined) => void;
}

const RegisterStep1Form = ({ form, onSubmit, setSelectedImage }: RegisterStep1FormProps) => {

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof formSchema>, "birth">
  ) => {
    const dateValue = e.target.value;
    const [year, month, day] = dateValue.split("-");

    // 연도가 4자리를 초과하지 않도록 설정
    if (year.length > 4) {
      const formattedDate = `${year.slice(0, 4)}-${month || ""}-${day || ""}`;
      field.onChange(formattedDate);
    } else {
      field.onChange(dateValue);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profileImage"
          render={() => (
            <FormItem>
              <FormLabel>프로필 이미지</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files?.[0] ?? undefined)}
                />
              </FormControl>
              <FormDescription>아이의 프로필 이미지를 업로드해 주세요.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>생년월일</FormLabel>
              <FormControl>
                <Input type="date" {...field} onChange={(e) => handleDateChange(e, field)} />
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
          다음
        </Button>
      </form>
    </Form>
  );
};

export default RegisterStep1Form;
