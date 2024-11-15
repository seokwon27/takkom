import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { formSchema } from "@/app/child/register/steps/RegisterChildInfo";
import { useRef, useState } from "react";
import cameraIcon from "../../../public/child/camera-icon.svg";
import Image from "next/image";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/utils/supabase/client";

interface RegisterChildInfoFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>; // form prop의 타입 지정
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>; // 데이터 제출 함수의 타입
  setSelectedImage: (file: File | undefined) => void; // 프로필 이미지 선택 함수
}

const RegisterChildInfoForm = ({ form, onSubmit, setSelectedImage }: RegisterChildInfoFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string>(DEFAULT_PROFILE_IMAGE_URL);

  // 이미지 변경을 위한 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };
  // 생년월일 입력 시 형식을 맞추기 위한 함수
  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof formSchema>, "birth">
  ) => {
    const dateValue = e.target.value;
    const [year, month, day] = dateValue.split("-");

    // 연도가 4자리를 초과하지 않도록 설정
    if (year.length > 4) {
      const formattedDate = `${year.slice(0, 4)}-${month ?? ""}-${day ?? ""}`;
      field.onChange(formattedDate);
    } else {
      field.onChange(dateValue);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {/* 프로필 이미지 입력 필드 */}
        <FormField
          control={form.control}
          name="profileImage"
          render={() => (
            <FormItem className="relative flex items-center justify-center w-44 h-44 mx-auto">
              <Image
                src={profileImageUrl}
                alt="아이 프로필 이미지"
                width={176}
                height={176}
                className="flex-grow-0 flex-shrink-0 w-44 h-44 object-cover rounded-[13px]"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-2 right-2 w-10 h-10  bg-gray-200 hover:bg-gray-300 rounded-full shadow-md"
              >
                <Image src={cameraIcon} alt="카메라 아이콘" />
              </button>
              <FormControl>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  // onChange={(e) => setSelectedImage(e.target.files?.[0] ?? undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 이름 입력 필드 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름(필수)</FormLabel>
              <FormControl>
                <Input placeholder="ex. 김따꼼" {...field} className="w-full placeholder:text-gray-200" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 생년월일 입력 필드 */}
        <FormField
          control={form.control}
          name="birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>생년월일(필수)</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  className="placeholder:text-gray-200"
                  onChange={(e) => handleDateChange(e, field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 특이사항 입력 필드 */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>특이사항(선택)</FormLabel>
              <FormControl>
                <Input placeholder="최대 200자" {...field} maxLength={200} className="placeholder:text-gray-200" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 다음 버튼 */}
        <Button
          type="submit"
          className="w-full h-14 text-lg font-semibold text-white rounded-xl p-6 bg-primary-400 hover:bg-primary-500"
        >
          다음
        </Button>
      </form>
    </Form>
  );
};

export default RegisterChildInfoForm;
