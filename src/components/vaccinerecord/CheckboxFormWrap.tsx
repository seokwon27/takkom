"use client";

import React from "react";
import CheckboxForm from "./CheckboxForm";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface CheckboxFormWrapProps {
  child_id: string;
}

const CheckboxFormWrap = ({ child_id }: CheckboxFormWrapProps) => {
  const router = useRouter();

  const onSuccess = () => {
    router.push(`/child/${child_id}`);
  };

  return (
    <CheckboxForm child_id={child_id} onSuccess={onSuccess}>
      <Button>등록하기</Button>
    </CheckboxForm>
  );
};

export default CheckboxFormWrap;
