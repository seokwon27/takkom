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
import Image from "next/image";
import { useUpdateChildMutation } from "@/query/useUpdateChildMutation";
import { useDeleteProfileImageMutation } from "@/query/useChildQuery";

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
    const fileName = `public/${Date.now()}_${file.name}`; // 파일 이름 생성: 파일 이름 중복을 방지하기 위해 '등록현재날짜_파일이름' 형식으로 지정
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

  // 폼 제출 함수 -- 수정 전
  // const onSubmit = async (data: z.infer<typeof formSchema>) => {
  //   const supabase = browserClient;
  //   const profileImageUrl = selectedImage ? await uploadImage(selectedImage) : child.profile;
  //   const profileUrl = profileImageUrl ?? undefined;

  //   // 데이터 업데이트
  //   const { error } = await supabase
  //     .from("child")
  //     .update({
  //       name: data.name, // 이름 업데이트
  //       birth: data.birth, // 생년월일 업데이트
  //       notes: data.notes, // 특이사항 업데이트
  //       profile: profileUrl // 프로필 이미지 업데이트
  //     })
  //     .eq("id", child.id); // 해당 자식 ID에 대한 업데이트

  //   if (error) {
  //     console.error("수정 중 오류 발생:", error); // 오류 처리
  //     return;
  //   }

  //   onComplete(); // 완료 후 부모 컴포넌트에 통보
  // };

  // 폼 제출 함수 -- 수정 후
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const profileImageUrl = selectedImage ? await uploadImage(selectedImage) : child.profile;
    const profileUrl = profileImageUrl ?? undefined;

    // 데이터 업데이트
    updateChildInfo({
      childId: child.id,
      name: data.name,
      birth: data.birth,
      notes: data.notes,
      profile: profileUrl
    });

    onComplete();
  };

  // 프로필 이미지 삭제 함수 -- 수정 전
  // const handleDeleteImage = async () => {
  //   // 프로필 이미지를 삭제하고 기본 이미지로 변경
  //   const { error } = await browserClient.storage.from("profiles").remove([child.profile]); // 기존 이미지를 삭제합니다.

  //   if (error) {
  //     console.error("이미지 삭제 오류:", error); // 삭제 오류 처리
  //     return;
  //   }

  //   // 기본 이미지로 업데이트
  //   const supabase = browserClient;
  //   await supabase
  //     .from("child")
  //     .update({
  //       profile: DEFAULT_PROFILE_IMAGE_URL // 기본 이미지로 변경
  //     })
  //     .eq("id", child.id);

  //   // 기본 이미지가 설정되었으므로 상태 업데이트 및 완료 처리
  //   onComplete();
  // };
  
  const handleDeleteImage = async () => {
    try {
      await deleteProfileImage(); // 이미지 삭제 및 기본 이미지로 설정
      onComplete(); // 완료 처리
    } catch (error) {
      console.log("프로필 이미지 삭제 오류: ", error);
    }
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
                {child.profile && (
                  <Image
                    src={
                      selectedImage // 새로 업로드된 이미지가 있다면 이를 표시
                        ? URL.createObjectURL(selectedImage)
                        : child.profile && child.profile !== DEFAULT_PROFILE_IMAGE_URL // 기존 프로필 이미지가 있다면 그것을 표시
                        ? child.profile
                        : DEFAULT_PROFILE_IMAGE_URL // 새 이미지도 없고 기존 이미지도 없다면 기본 이미지 표시
                    }
                    alt="Current Profile"
                    width={176}
                    height={176}
                    className="flex-grow-0 flex-shrink-0 w-44 h-44 object-cover rounded-[13px]"
                    unoptimized
                  />
                )}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 w-10 h-10  bg-gray-200 hover:bg-gray-300 rounded-full shadow-md"
                >
                  <Image src={CameraIcon} alt="카메라 아이콘" />
                </button>
                {child.profile !== DEFAULT_PROFILE_IMAGE_URL && (
                  <Button type="button" onClick={handleDeleteImage} className="absolute ml-2 ">
                    이미지 삭제
                  </Button>
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
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder="이름을 입력하세요" {...field} />
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
              <FormLabel>생년월일</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
              <FormLabel>특이사항(선택)</FormLabel>
              <FormControl>
                <Input placeholder="특이사항을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 완료 버튼 */}
        <Button
          type="submit"
          className="w-full h-14 text-lg font-semibold text-white rounded-xl p-6 bg-primary-400 hover:bg-primary-500"
        >
          완료
        </Button>
      </form>
    </Form>
  );
};

export default EditChildForm;
