"use client";

import { useRef, useState } from "react";
import { SearchModal } from "./SearchModal";

export type ModalRef = React.RefObject<HTMLDivElement>;

const SearchButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalBg = useRef<HTMLDivElement>(null);

  return (
    <div>
      <button
        onClick={() => {
          setModalOpen(true);
          console.log(isModalOpen);
        }}
      >
        병원찾기
      </button>
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
