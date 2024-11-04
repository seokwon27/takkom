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
      <Button>등록하기</Button>
    </CheckboxForm>
  );
};

export default CheckboxFormWrap;
