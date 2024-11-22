"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import browserClient, { DEFAULT_PROFILE_IMAGE_URL } from "@/utils/supabase/client";
import { Child } from "@/types/childType";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import CameraIcon from "../../../public/child/camera-icon.svg";
import DeleteIcon from "../../../public/child/delete-icon.svg";
import Image from "next/image";
import { useUpdateChildMutation } from "@/query/useUpdateChildMutation";
import { useDeleteProfileImageMutation } from "@/query/useChildQuery";
import { useQueryClient } from "@tanstack/react-query";

interface EditFormProps {
  child: Child; // 수정할 자식 데이터
  onComplete: () => void; // 수정 완료 후 호출될 함수
}

// 입력값 검증을 위한 Zod 스키마 정의
const formSchema = z.object({
  name: z.string().min(1, { message: "이름은 필수입니다." }), // 이름 필드 검증
  birth: z.string().min(1, { message: "생년월일은 필수입니다." }), // 생년월일 필드 검증
  notes: z.string().optional(), // 특이사항은 선택 항목
  profile: z.union([z.instanceof(File), z.string()]).optional() // 프로필 이미지 (파일 또는 URL)
});

const EditChildForm = ({ child, onComplete }: EditFormProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateChildInfo } = useUpdateChildMutation();
  const { mutateAsync: deleteProfileImage } = useDeleteProfileImageMutation(child.id);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 이미지 파일 상태 관리
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);

  // react-hook-form 초기화
  const form = useForm({
    resolver: zodResolver(formSchema), // Zod 스키마를 사용한 폼 유효성 검사
    defaultValues: {
      name: child.name, // 기본 값: 기존 자식의 이름
      birth: child.birth, // 기본 값: 기존 자식의 생년월일
      notes: child.notes ?? "", // 기본 값: 기존 자식의 특이사항 (없을 경우 빈 문자열)
      profile: child.profile ?? DEFAULT_PROFILE_IMAGE_URL // 기본 값: 기존 자식의 프로필 이미지, 없으면 기본 이미지
    }
  });

  // 이미지 업로드 함수
  const uploadImage = async (file: File): Promise<string | null> => {
    const fileName = `public/${Date.now()}_${file.name
      .replace(/\s+/g, "_") // 공백을 밑줄(_)로 대체
      .replace(/[^\x00-\x7F]/g, "_") // 한글 및 특수문자를 밑줄(_)로 대체
      .replace(/[^\w.-]/g, "")}`; // 알파벳, 숫자, 밑줄(_), 점(.), 하이픈(-) 외의 문자는 제거
    const { error } = await browserClient.storage.from("profiles").upload(fileName, file, {
      cacheControl: "3600", // 1시간 동안 캐시 유지
      upsert: true // 기존 파일이 있으면 덮어씌움
    });

    if (error) {
      console.error("이미지 업로드 오류:", error); // 업로드 오류 처리
      return null;
    }

    const { data: publicUrlData } = browserClient.storage.from("profiles").getPublicUrl(fileName);
    return publicUrlData?.publicUrl ?? null; // 이미지 URL 반환
  };

  // 폼 제출 함수 -- 수정 후
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const profileImageUrl = selectedImage ? await uploadImage(selectedImage) : child.profile;
    const profileUrl = profileImageUrl ?? undefined;

    // 데이터 업데이트
    await updateChildInfo({
      userId: child.user_id,
      childId: child.id,
      name: data.name,
      birth: data.birth,
      notes: data.notes,
      profile: profileUrl
    });
    onComplete();
  };

  const handleDeleteImage = async () => {
    try {
      await deleteProfileImage();
      queryClient.setQueryData(["child_info", child.user_id, child.id], {
        ...child,
        profile: DEFAULT_PROFILE_IMAGE_URL
      });
      onComplete();
    } catch (error) {
      console.error("프로필 이미지 삭제 오류: ", error);
    }
  };

  const getImageSrc = () => {
    // 새로 업로드된 이미지가 있으면 이를 반환
    if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    }

    // 기존 프로필 이미지가 있으면 그것을 반환
    if (child.profile && child.profile !== DEFAULT_PROFILE_IMAGE_URL) {
      return child.profile;
    }

    // 새 이미지도 없고 기존 이미지도 없다면 기본 이미지 반환
    return DEFAULT_PROFILE_IMAGE_URL;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {/* 프로필 이미지 업로드 필드 */}
        <FormField
          control={form.control}
          name="profile"
          render={() => (
            <FormItem className="relative flex items-center justify-center w-44 h-44 mx-auto mb-20">
              <div>
                <Image
                  src={getImageSrc()}
                  alt="Current Profile"
                  width={176}
                  height={176}
                  className="flex-grow-0 flex-shrink-0 w-44 h-44 object-cover rounded-[13px]"
                  unoptimized
                />
                {/* 기본 이미지가 아닐 때는 삭제 아이콘을, 기본 이미지일 때는 카메라 아이콘을 표시 */}
                {child.profile && child.profile !== DEFAULT_PROFILE_IMAGE_URL ? (
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="absolute top-2 right-2 w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md"
                  >
                    <Image src={DeleteIcon} alt="이미지 삭제 아이콘" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute top-2 right-2 w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md"
                  >
                    <Image src={CameraIcon} alt="카메라 아이콘" />
                  </button>
                )}
              </div>

              <FormControl>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*" // 이미지 파일만 업로드 가능
                  className="hidden"
                  onChange={(e) => setSelectedImage(e.target.files?.[0] ?? undefined)}
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
              <FormLabel className="text-gray-800">이름</FormLabel>
              <FormControl className="text-gary-700 px-6 py-4 rounded-xl">
                <Input className="h-full text-text-xl" placeholder="이름을 입력하세요" {...field} />
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
              <FormLabel className="text-gray-800">생년월일</FormLabel>
              <FormControl className="text-gary-700 px-6 py-4 rounded-xl">
                <Input className="h-full text-text-xl" type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 특이사항 입력 필드 (선택 항목) */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800">특이사항(선택)</FormLabel>
              <FormControl className="text-gary-700">
                <Input className="h-full text-text-xl" placeholder="특이사항을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 완료 버튼 */}
        <Button
          type="submit"
          className="w-full h-14 text-lg font-semibold text-white rounded-xl p-6 bg-primary-400 hover:bg-primary-500 max-sm:mb-24"
        >
          완료
        </Button>
      </form>
    </Form>
  );
};

export default EditChildForm;
