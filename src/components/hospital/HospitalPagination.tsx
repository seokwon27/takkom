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
import { usePathname } from "next/navigation";
import { getStringQueryParams } from "./setQueryParams";

const HospitalPagination = ({
  maxPage,
  currentPage,
  params
}: {
  maxPage: number;
  currentPage: number;
  params: { brtcCd: string; sggCd: string; addr: string; org: string; disease?: string };
}) => {
  const pathname = usePathname();

  let startNum = 1;
  if (maxPage >= 5) {
    if (currentPage - 2 >= 1 && currentPage + 2 < maxPage) {
      startNum = currentPage - 2;
    } else if (currentPage + 2 >= maxPage) {
      startNum = maxPage - 4;
    }
  }
  if (currentPage - 2 < 1) {
    startNum = 1;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem aria-disabled={currentPage === 1}>
          <PaginationPrevious
            href={
              currentPage > 1
                ? getStringQueryParams({ ...params, pageNo: String(currentPage - 1) }, pathname)
                : "#"
            }
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        {maxPage >= 5 ? (
          <>
            <PaginationItem>
              <PaginationLink
                href={getStringQueryParams({ ...params, pageNo: String(startNum) }, pathname)}
                isActive={currentPage === startNum}
              >
                {startNum}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={getStringQueryParams({ ...params, pageNo: String(startNum + 1) }, pathname)}
                isActive={currentPage === startNum + 1}
              >
                {startNum + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={getStringQueryParams({ ...params, pageNo: String(startNum + 2) }, pathname)}
                isActive={currentPage === startNum + 2}
              >
                {startNum + 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={getStringQueryParams({ ...params, pageNo: String(startNum + 3) }, pathname)}
                isActive={currentPage === startNum + 3}
              >
                {startNum + 3}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={getStringQueryParams({ ...params, pageNo: String(startNum + 4) }, pathname)}
                isActive={currentPage === startNum + 4}
              >
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
                  <PaginationLink
                    href={getStringQueryParams({ ...params, pageNo: String(startNum + idx) }, pathname)}
                    isActive={currentPage === startNum + idx}
                  >
                    {startNum + idx}
                  </PaginationLink>
                </PaginationItem>
              ))}
          </>
        )}
        <PaginationItem aria-disabled={currentPage === maxPage}>
          <PaginationNext
            href={
              currentPage < maxPage
                ? getStringQueryParams({ ...params, pageNo: String(currentPage + 1) }, pathname)
                : "#"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default HospitalPagination;
