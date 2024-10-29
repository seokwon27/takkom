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
      >
        병원찾기
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
