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
import { createQueryParams } from "../../utils/hospital/setHospitalQueryParams";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

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
    <Pagination className="bg-white max-sm:mx-0 max-sm:px-6 max-sm:pb-[132px] max-sm:mb-0 max-sm:z-10">
      <PaginationContent className="gap-0">
        <PaginationItem aria-disabled={currentPage === 1}>
          <PaginationLink
            href={createQueryParams({ ...params, pageNo: String(1) }, pathname)}
            isActive={false}
            aria-disabled={currentPage === 1}
            className="w-6 h-6 p-0 text-gray-300 hover:bg-transparent hover:text-gray-300 max-sm:w-[18px]"
          >
            <ChevronsLeft strokeWidth={3} className="size-24 scale-150 max-sm:scale-100" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem aria-disabled={currentPage === 1}>
          <PaginationPrevious
            href={currentPage > 1 ? createQueryParams({ ...params, pageNo: String(currentPage - 1) }, pathname) : "#"}
            aria-disabled={currentPage === 1}
            className="w-6 h-6 p-0 mr-4 ml-2 text-gray-300 hover:bg-transparent hover:text-gray-300 max-sm:ml-1 max-sm:mr-2"
          />
        </PaginationItem>
        {maxPage >= 5 ? (
          <>
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <PaginationItem key={`pagination_${idx}`}>
                  <PaginationLink
                    href={createQueryParams({ ...params, pageNo: String(startNum + idx) }, pathname)}
                    isActive={currentPage === startNum + idx}
                    className={cn(
                      "w-10 h-10 p-0 ml-4 border-0 text-lg text-gray-300 hover:text-gray-300 max-sm:w-8 max-sm:h-8 max-sm:ml-2 max-sm:text-sm",
                      currentPage === startNum + idx
                        ? "bg-primary-200 text-white hover:bg-primary-200 hover:text-white"
                        : null
                    )}
                  >
                    {startNum + idx}
                  </PaginationLink>
                </PaginationItem>
              ))}
          </>
        ) : (
          <>
            {Array(maxPage)
              .fill(null)
              .map((_, idx) => (
                <PaginationItem key={`pagination_${idx}`}>
                  <PaginationLink
                    href={createQueryParams({ ...params, pageNo: String(startNum + idx) }, pathname)}
                    isActive={currentPage === startNum + idx}
                    className={cn(
                      "w-10 h-10 p-0 ml-4 border-0 text-lg text-gray-300 hover:text-gray-300 max-sm:w-8 max-sm:h-8 max-sm:ml-2 max-sm:text-sm",
                      currentPage === startNum + idx
                        ? "bg-primary-200 text-white hover:bg-primary-200 hover:text-white"
                        : null
                    )}
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
              currentPage < maxPage ? createQueryParams({ ...params, pageNo: String(currentPage + 1) }, pathname) : "#"
            }
            className="w-6 h-6 p-0 ml-8 mr-2 text-gray-300 hover:bg-transparent hover:text-gray-300 max-sm:ml-4 max-sm:mr-1"
          />
        </PaginationItem>
        {/* {maxPage >= 5 && ( */}
        <PaginationItem aria-disabled={currentPage === maxPage}>
          <PaginationLink
            href={createQueryParams({ ...params, pageNo: String(maxPage) }, pathname)}
            isActive={false}
            aria-disabled={currentPage === maxPage}
            className="w-6 h-6 p-0 text-lg text-gray-300 hover:bg-transparent hover:text-gray-300"
          >
            <ChevronsRight strokeWidth={3} className="size-24 scale-150 max-sm:scale-100" />
          </PaginationLink>
        </PaginationItem>
        {/* )} */}
      </PaginationContent>
    </Pagination>
  );
};

export default HospitalPagination;
