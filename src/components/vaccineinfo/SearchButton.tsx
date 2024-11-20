"use client";

import { useRef, useState } from "react";
import { SearchModal } from "./SearchModal";
import { Button } from "../ui/button";
import { useAgeGroupStore } from "@/store/ageGroupStore";
import DesktopLayout from "../layout/DesktopLayout";
import MobileLayout from "../layout/MobileLayout";
import MobileSelect from "./MobileSelect";
import useDevice from "@/utils/useDevice";

export type ModalRef = React.RefObject<HTMLDivElement>;

const SearchButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalBg = useRef<HTMLDivElement>(null);
  const { vaccineId } = useAgeGroupStore();
  const isMobile = useDevice();

  return (
    <div
      className={`bg-white w-full sticky bottom-0 text-white z-50
         ${vaccineId ? "" : "max-sm:hidden"} max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:z-20 text-center`}
    >
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
        variant={"vaccineinfo"}
        className={`p-6 hover:bg-primary-300 my-10 h-[72px] text-heading-m font-bold max-sm:max-w-[327px] max-sm:my-5 max-sm:h-[56px] max-sm:text-heading-s`}
      >
        <DesktopLayout>
          <p>접종 가능한 병원 찾기</p>
        </DesktopLayout>
        <MobileLayout>
          <p>찾기</p>
        </MobileLayout>
      </Button>
      {isMobile === "mobile"
        ? isModalOpen && (
            <>
              <MobileSelect
                onClose={() => {
                  setModalOpen(false);
                }}
              />
            </>
          )
        : isModalOpen && (
            <SearchModal
              ModalRef={modalBg}
              isOpen={isModalOpen}
              onClose={() => {
                setModalOpen(false);
              }}
            />
          )}
    </div>
  );
};

export default SearchButton;
