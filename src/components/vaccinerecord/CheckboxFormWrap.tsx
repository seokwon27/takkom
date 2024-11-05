"use client";

import React from "react";
import CheckboxForm from "./CheckboxForm";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface CheckboxFormWrapProps {
  childId: string;
}

const CheckboxFormWrap = ({ childId }: CheckboxFormWrapProps) => {
  const router = useRouter();

  const onSuccess = () => {
    router.push(`/child/${childId}`);
  };

  return (
    <CheckboxForm childId={childId} onSuccess={onSuccess}>
      <div className="flex flex-col items-start gap-6 relative self-stretch w-full mt-20">
        <Button className="flex h-[72px] p-[16px 24px] justify-center items-center gap-[10px] self-stretch rounded-xl bg-[#2979FF]">
          등록 완료
        </Button>
      </div>
    </CheckboxForm>
  );
};

export default CheckboxFormWrap;
