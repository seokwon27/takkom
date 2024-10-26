import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import SelectBrtc from "./Select/SelectBrtc";
import SelectSGG from "./Select/SelectSGG";

export const SearchModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>접종 가능한 병원 찾기</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>지역 선택</DialogTitle>
          <DialogDescription>{`찾고 싶은 지역을 입력해주세요`}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <SelectBrtc />
          <SelectSGG />
        </div>

        <DialogFooter>
          <Button type="submit">확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
