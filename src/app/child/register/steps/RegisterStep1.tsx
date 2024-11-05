"use client";
import { Child } from "@/types/childType";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterStep1Form from "@/components/child/RegisterStep1Form";
import browserClient from "@/utils/supabase/client";

interface RegisterStep1Props {
  onNext: (data: Partial<Child>) => void;
  userId: string;
  childInfo: Partial<Child>;
}

export const formSchema = z.object({
  name: z.string().min(1, { message: "이름은 필수입니다." }),
  birth: z.string().min(1, { message: "생년월일은 필수입니다." }),
  notes: z.string().optional(),
  profileImage: z.instanceof(File).optional()
});

const RegisterStep1 = ({ onNext, childInfo }: RegisterStep1Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: childInfo.name ?? "",
      birth: childInfo.birth ?? "",
      notes: childInfo.notes ?? ""
    }
  });

  const [selectedImage, setSelectedImage] = useState<File>();

  const supabase = browserClient;

  // 이미지 업로드 함수
  const uploadImage = async (file: File): Promise<string | null> => {
    const fileName = `public/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("profiles").upload(fileName, file, {
      cacheControl: "3600",
      upsert: true
    });

    if (error) {
      console.error("이미지 업로드 오류:", error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage.from("profiles").getPublicUrl(fileName);
    return publicUrlData?.publicUrl ?? null;
  };

  // supabase에 아이정보와 이미지 url 저장 함수
  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    const { name, birth, notes } = data;

    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      console.error("사용자 정보가 없습니다. 로그인이 필요합니다.");
      return;
    }

    const profileImageUrl = selectedImage ? await uploadImage(selectedImage) : "";

    const { data: childData, error } = await supabase
      .from("child")
      .insert({
        user_id: user.id,
        name: name,
        birth: birth,
        profile: profileImageUrl ?? "",
        notes: notes ?? ""
      })
      .select()
      .single();

    if (error) {
      console.error("데이터 저장 오류: ", error);
      return;
    }

    if (childData) {
      console.log("데이터가 성공적으로 저장되었습니다. 아이 아이디: ", childData.id);
      onNext({
        id: childData.id,
        name,
        birth,
        notes,
        profile: profileImageUrl || undefined
      });
    } else {
      console.error("childData가 null입니다.");
    }
  };

  return (
    <div>
      <h1>1단계</h1>
      <h2>정보를 입력해 주세요.</h2>
      <RegisterStep1Form form={form} onSubmit={handleFormSubmit} setSelectedImage={setSelectedImage} />
    </div>
  );
};

export default RegisterStep1;
