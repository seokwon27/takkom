"use client";
import { Child } from "@/types/childType";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useRegisterChildMutation } from "@/query/useRegisterChildMutation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import RegisterChildInfoForm from "@/components/child/RegisterChildInfoForm";
import RegisterChildInfoIcon from "../../../../../public/child/register-child-info-icon.svg";
import RegisterChildInfoBlurredIcon from "../../../../../public/child/register-child-info-blurred-icon.svg";
import PreIcon from "../../../../../public/icon/preIcon.svg";

interface RegisterChildInfoProps {
  onNext: (data: Partial<Child>) => void;
  userId: string;
  childInfo: Partial<Child>;
}

export const formSchema = z.object({
  name: z.string().min(1, { message: "이름은 필수입니다." }),
  birth: z.preprocess(
    (val) => {
      if (typeof val === "string" || val instanceof String) {
        // 문자열을 Date 객체로 변환
        const parsedDate = new Date(val as string);
        return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
      }
      return val; // 이미 Date 타입일 경우 그대로 반환
    },
    z.date({ message: "생년월일은 필수입니다." }) // 변환된 값 검증
  ),
  notes: z.string().optional(),
  profileImage: z.instanceof(File).optional()
});

const RegisterChildInfo = ({ onNext, childInfo }: RegisterChildInfoProps) => {
  const router = useRouter();
  // 자녀 ID를 상태로 관리하여 새로 삽입 방지
  const [childId, setChildId] = useState<string | null>(childInfo.id ?? null);

  // react-hook-form을 사용하여 폼 데이터 관리
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // zod 유효성 검사 사용
    defaultValues: {
      name: childInfo.name ?? "",
      birth: childInfo.birth ? new Date(childInfo.birth) : undefined, // 기존에 string인 birth 값을 Date로 변환
      notes: childInfo.notes ?? ""
    }
  });

  const [selectedImage, setSelectedImage] = useState<File>(); // 선택된 이미지 상태 관리

  const { mutate: registerChild } = useRegisterChildMutation((data) => {
    setChildId(data.id ?? null); // 성공 시 자녀 ID 저장
    onNext(data); // 다음 단계로 이동
  });

  const handleFormSubmit = async (data: z.infer<typeof formSchema>): Promise<void> => {
    const formData = {
      ...data,
      birth: data.birth instanceof Date ? data.birth.toISOString() : data.birth, // Date일 경우 string으로 변환
      selectedImage
    };

    // childId가 없는 경우에만 새로 등록 (이미 등록된 경우 등록하지 않음)
    if (!childId) {
      registerChild(formData);
    } else {
      // 이미 등록된 자녀의 정보를 그대로 다음 단계로 전달
      onNext({ ...formData, id: childId });
    }
  };

  return (
    <div className="container flex flex-col mx-auto justify-center max-w-[588px] mt-16 max-sm:mt-3 max-sm:px-6 max-sm:pb-[132px] max-sm:mb-0">
      {/* 모바일에서 보이는 레이아웃 */}
      <div className="w-full px-6 py-2 flex items-center gap-6 mb-4 sm:hidden">
        <div className="relative">
          {/* 이전 버튼 */}
          <button onClick={() => router.back()}>
            <Image src={PreIcon} alt="이전" />
          </button>
        </div>
        <div className="flex-1 text-center" style={{ transform: "translateX(-24px)" }}>
          <p className="text-base font-bold text-[#303030]">아이 등록하기</p>
        </div>
      </div>

      <div className="relative mb-20 max-sm:mb-5">
        <Image
          src={RegisterChildInfoIcon}
          alt="체크리스트 아이콘"
          className="w-20 h-20 object-cover max-sm:w-14 max-sm:h-14"
        />
        <Image
          src={RegisterChildInfoBlurredIcon}
          alt="체크리스트 아이콘의 그림자"
          className="absolute top-2 left-2 w-20 h-20 object-cover max-sm:w-14 max-sm:h-14"
        />
      </div>

      <div className="flex flex-col justify-start items-start self-stretch mb-6 max-sm:mb-2">
        <p className="text-title-xl font-bold text-left text-gray-800">1단계</p>
      </div>

      <div className="flex flex-col justify-start items-start self-stretch mb-6">
        <p className="text-l font-semibold text-left text-gray-400">정보를 입력해 주세요.</p>
      </div>

      <RegisterChildInfoForm form={form} onSubmit={handleFormSubmit} setSelectedImage={setSelectedImage} />
    </div>
  );
};

export default RegisterChildInfo;
