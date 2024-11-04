"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import browserClient, { DEFAULT_PROFILE_IMAGE_URL } from "@/utils/supabase/client";
import { Child } from "@/types/childType";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

interface EditFormProps {
  child: Child;
  onComplete: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "이름은 필수입니다." }),
  birth: z.string().min(1, { message: "생년월일은 필수입니다." }),
  notes: z.string().optional(),
  profile: z.union([z.instanceof(File), z.string()]).optional()
});

const EditChildForm = ({ child, onComplete }: EditFormProps) => {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: child.name,
      birth: child.birth,
      notes: child.notes || "",
      profile: child.profile || DEFAULT_PROFILE_IMAGE_URL
    }
  });

  // 이미지 업로드 함수
  const uploadImage = async (file: File): Promise<string | null> => {
    const fileName = `public/${Date.now()}_${file.name}`;
    const { error } = await browserClient.storage.from("profiles").upload(fileName, file, {
      cacheControl: "3600",
      upsert: true
    });

    if (error) {
      console.error("이미지 업로드 오류:", error);
      return null;
    }

    const { data: publicUrlData } = browserClient.storage.from("profiles").getPublicUrl(fileName);
    return publicUrlData?.publicUrl ?? null;
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const supabase = browserClient;
    const profileImageUrl = selectedImage ? await uploadImage(selectedImage) : child.profile;
    const profileUrl = profileImageUrl ?? undefined;

    // 데이터 업데이트
    const { error } = await supabase
      .from("child")
      .update({
        name: data.name,
        birth: data.birth,
        notes: data.notes,
        profile: profileUrl
      })
      .eq("id", child.id);

    if (error) {
      console.error("수정 중 오류 발생:", error);
      return;
    }

    onComplete(); // 완료 후 부모 컴포넌트에 통보
  };

  const handleDeleteImage = async () => {
    // 프로필 이미지를 삭제하고 기본 이미지로 변경
    const { error } = await browserClient.storage.from("profiles").remove([child.profile]); // 기존 이미지를 삭제합니다.

    if (error) {
      console.error("이미지 삭제 오류:", error);
      return;
    }

    // 기본 이미지로 업데이트
    const supabase = browserClient;
    await supabase
      .from("child")
      .update({
        profile: DEFAULT_PROFILE_IMAGE_URL
      })
      .eq("id", child.id);

    // 기본 이미지가 설정되었으므로 상태 업데이트 및 완료 처리
    onComplete();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profile"
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
              {child.profile && (
                <Image src={child.profile} alt="Current Profile" width={100} height={100} unoptimized />
              )}
              <Button type="button" onClick={handleDeleteImage} className="mt-2">
                이미지 삭제
              </Button>
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
  );
};

export default EditChildForm;
