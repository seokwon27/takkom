"use client";

import { useRef, useState } from "react";
import { SearchModal } from "./SearchModal";
import { Button } from "../ui/button";
import { useAgeGroupStore } from "@/store/ageGroupStore";

export type ModalRef = React.RefObject<HTMLDivElement>;

const SearchButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalBg = useRef<HTMLDivElement>(null);
  const { vaccineId } = useAgeGroupStore();

  return (
    <div
      className={`bg-white w-full ${
        vaccineId ? "" : "max-sm:hidden"
      } max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:z-20 text-center`}
    >
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
        variant={"vaccineinfo"}
        className={`p-6 hover:bg-primary-300 my-10 max-sm:max-w-[327px] max-sm:my-5`}
      >
        <p>접종 가능한 병원 찾기</p>
      </Button>
      {isModalOpen && (
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
