"use client";
import { Child } from "@/types/childType";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterFirstStepForm from "@/components/child/RegisterFirstStepForm";
import browserClient from "@/utils/supabase/client";
import Image from "next/image";
import RegisterCheckListIcon from "../../../../../public/child/register-checklist-icon.svg";

interface RegisterFirstStepProps {
  onNext: (data: Partial<Child>) => void;
  userId: string;
  childInfo: Partial<Child>;
}

export const formSchema = z.object({
  name: z.string().min(1, { message: "이름은 필수입니다." }), // 이름 필수 조건
  birth: z.string().min(1, { message: "생년월일은 필수입니다." }), // 생년월일 필수 조건
  notes: z.string().optional(), // 메모는 선택적
  profileImage: z.instanceof(File).optional() // 프로필 이미지는 선택적
});

const RegisterFirstStep = ({ onNext, childInfo }: RegisterFirstStepProps) => {
  // react-hook-form을 사용하여 폼 데이터 관리
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // zod 유효성 검사 사용
    defaultValues: {
      name: childInfo.name ?? "",
      birth: childInfo.birth ?? "",
      notes: childInfo.notes ?? ""
    }
  });

  const [selectedImage, setSelectedImage] = useState<File>(); // 선택된 이미지 상태 관리

  const supabase = browserClient;

  // 이미지 업로드 함수
  const uploadImage = async (file: File): Promise<string | null> => {
    const fileName = `public/${Date.now()}_${file.name}`; // 고유한 파일 이름 생성
    const { error } = await supabase.storage.from("profiles").upload(fileName, file, {
      cacheControl: "3600", // 1시간 동안 캐시 유지
      upsert: true // 기존 파일이 있으면 덮어씌움
    });

    if (error) {
      console.error("이미지 업로드 오류:", error);
      return null; // 오류 발생 시 null 반환
    }

    const { data: publicUrlData } = supabase.storage.from("profiles").getPublicUrl(fileName);
    return publicUrlData?.publicUrl ?? null;
  };

  // supabase에 아이정보와 이미지 url 저장 함수
  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    const { name, birth, notes } = data;

    const {
      data: { user }
    } = await supabase.auth.getUser(); // 사용자 정보 가져오기
    if (!user) {
      console.error("사용자 정보가 없습니다. 로그인이 필요합니다.");
      return; // 사용자 정보 없으면 함수 종료
    }

    // 프로필 이미지 업로드 및 URL 생성
    const profileImageUrl = selectedImage ? await uploadImage(selectedImage) : "";

    // Supabase에 아이 정보 저장
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
      // 자녀 데이터 저장 성공 시 onNext 호출
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
    <div className="max-w-[588px] mx-auto m-20">
      <div>
        <Image src={RegisterCheckListIcon} alt="체크리스트 아이콘" className="mb-12" />

        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative mb-20">
          <p className="flex-grow-0 flex-shrink-0 text-4xl font-bold text-left text-gray-800 gap-20">1단계</p>
          <p className="flex-grow-0 flex-shrink-0 text-s font-semibold text-left text-gray-400">
            정보를 입력해 주세요.
          </p>
        </div>
      </div>

      {/* 자녀 등록 폼 */}
      <RegisterFirstStepForm form={form} onSubmit={handleFormSubmit} setSelectedImage={setSelectedImage} />
    </div>
  );
};

export default RegisterFirstStep;
