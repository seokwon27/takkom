"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SelectBrtc from "./SelectBrtc";
// import { useState } from "react";

export const SearchModal = () => {
  // const [brtc, setBrtc] = useState();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>접종 가능한 병원 찾기</Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-[48px] w-[252px] h-[192px] py-[28px] px-[40px] rounded-[12px]">
        <DialogHeader>
          <DialogTitle>지역을 선택해 주세요.</DialogTitle>
        </DialogHeader>

        <div className="flex">
          <SelectBrtc mode={"brtc"} />
          <SelectBrtc mode={"sgg"} />
        </div>

        <DialogFooter>
          <Button type="submit">확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
