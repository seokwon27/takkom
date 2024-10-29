"use client";
import { Child } from "../../page";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

interface RegisterStep1Props {
  child: Child; // child prop 추가
  onNext: (data: Partial<Child>) => void;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "이름은 필수입니다." }),
  birthday: z.string().min(1, { message: "생년월일은 필수입니다." }),
  notes: z.string().optional(),
  profileImage: z.instanceof(File).optional()
});

const RegisterStep1 = ({ onNext }: RegisterStep1Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      birthday: "",
      notes: ""
    }
  });

  const [selectedImage, setSelectedImage] = useState<File>();

  // Supabase 클라이언트 생성
  const supabase = createClient();

  // 테스트를 위한 유저 객체
  // const user = {id:"6a0746a4-d1fb-405e-bb64-336ed4ef0de6"};

  // 이미지 업로드 함수
  const uploadImage = async (file: File): Promise<string | null> => {
    const { data, error } = await supabase.storage.from("profiles").upload(`public/${file.name}`, file, {
      cacheControl: "3600",
      upsert: true
    });

    if (error) {
      console.error("이미지 업로드 오류:", error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage.from("profiles").getPublicUrl(data.path);

    return publicUrlData?.publicUrl ?? null;
  };

  // supabase에 아이정보와 이미지 url 저장 함수
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { name, birthday, notes } = data;

    // 테스트를 위한 유저 아이디
    const testUserId = "6a0746a4-d1fb-405e-bb64-336ed4ef0de6";

    // 현재 로그인한 사용자의 아이디 가져오기
    // const {
    //   data: { user }
    // } = await supabase.auth.getUser();

    // if (!user) {
    //   console.error("사용자 정보가 없습니다. 로그인이 필요합니다.");
    //   return;
    // }

    // 이미지 URL 가져오기
    const profileImageUrl = selectedImage ? await uploadImage(selectedImage) : null;

    // Supabase에 데이터 삽입
    const { error } = await supabase
      .from("child") // 'child' 테이블에 데이터 삽입
      .insert([
        {
          // user_id: user.id,
          user_id: testUserId, // 테스트용
          name: name,
          birth: birthday,
          profile: profileImageUrl,
          notes: notes || "" // notes가 없을 경우 빈 문자열로 설정
        }
      ]);

    if (error) {
      console.error("데이터 저장 오류", error);
      return;
    }

    console.log("데이터가 성공적으로 저장되었습니다.");

    onNext({
      name,
      birthday,
      notes,
      profileImage: profileImageUrl || undefined // profileImageUrl이 null인 경우 undefined로 설정
    });
  };

  return (
    <div>
      <h1>1단계</h1>
      <h2>정보를 입력해 주세요.</h2>
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
            다음
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterStep1;
