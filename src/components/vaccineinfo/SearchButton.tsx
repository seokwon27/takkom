"use client";

import { useRef, useState } from "react";
import { SearchModal } from "./SearchModal";
import { Button } from "../ui/button";

export type ModalRef = React.RefObject<HTMLDivElement>;

const SearchButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalBg = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Button
        onClick={() => {
          setModalOpen(true);
          console.log(isModalOpen);
        }}
        variant={"vaccineinfo"}
        className="p-6 hover:bg-primary-300"
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
