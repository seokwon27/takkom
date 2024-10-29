"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

const HospitalPagination = ({
  maxPage,
  currentPage,
  setCurrentPage,
  startNum,
  setStartNum,
}: {
  maxPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  startNum: number;
  setStartNum: React.Dispatch<React.SetStateAction<number>>;
}) => {
  if (maxPage >=5 ) {
    if (currentPage - 2 >= 1 && currentPage + 2 < maxPage) {
      setStartNum(currentPage - 2)
    } else if (currentPage + 2 >= maxPage) {
      setStartNum(maxPage - 4);
    }
  }
  if (currentPage - 2 < 1) {
    setStartNum(1);
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage((prev) => prev - 1);
            }
          }}
        >
          <PaginationPrevious href="#" />
        </PaginationItem>
        {maxPage >= 5 ? (
          <>
            <PaginationItem
              onClick={() => {
                setCurrentPage(startNum);
              }}
            >
              <PaginationLink href="#" isActive={currentPage === startNum}>
                {startNum}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem
              onClick={() => {
                setCurrentPage(startNum + 1);
              }}
            >
              <PaginationLink href="#" isActive={currentPage === startNum + 1}>
                {startNum + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem
              onClick={() => {
                setCurrentPage(startNum + 2);
              }}
            >
              <PaginationLink href="#" isActive={currentPage === startNum + 2}>
                {startNum + 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem
              onClick={() => {
                setCurrentPage(startNum + 3);
              }}
            >
              <PaginationLink href="#" isActive={currentPage === startNum + 3}>
                {startNum + 3}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem
              onClick={() => {
                setCurrentPage(startNum + 4);
              }}
            >
              <PaginationLink href="#" isActive={currentPage === startNum + 4}>
                {startNum + 4}
              </PaginationLink>
            </PaginationItem>
          </>
        ) : (
          <>
            {Array(maxPage)
              .fill(null)
              .map((_, idx) => (
                <PaginationItem key={`pagination_${idx}`}>
                  <PaginationLink href="#" isActive={currentPage === startNum + idx}>
                    {startNum + idx}
                  </PaginationLink>
                </PaginationItem>
              ))}
          </>
        )}
        <PaginationItem
          aria-disabled={currentPage === maxPage}
          onClick={() => {
            if (currentPage < maxPage) {
              setCurrentPage((prev) => prev + 1);
            }
          }}>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default HospitalPagination;
