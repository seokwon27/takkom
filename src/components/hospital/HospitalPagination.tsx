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
  console.log(pathname)

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
    <Pagination className="mt-20">
      <PaginationContent className="gap-0">
        {/* {maxPage >= 5 && ( */}
        <PaginationItem aria-disabled={currentPage === 1}>
          <PaginationLink
            href={createQueryParams({ ...params, pageNo: String(1) }, pathname)}
            isActive={false}
            aria-disabled={currentPage === 1}
            className="w-6 h-6 p-0 text-gray-300 hover:bg-transparent hover:text-gray-300"
          >
            <ChevronsLeft size={24} strokeWidth={3} className="scale-150" />
          </PaginationLink>
        </PaginationItem>
        {/* )} */}
        <PaginationItem aria-disabled={currentPage === 1}>
          <PaginationPrevious
            href={currentPage > 1 ? createQueryParams({ ...params, pageNo: String(currentPage - 1) }, pathname) : "#"}
            aria-disabled={currentPage === 1}
            className="w-6 h-6 p-0 mr-4 ml-1 text-gray-300 hover:bg-transparent hover:text-gray-300"
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
                      "w-10 h-10 p-0 ml-4 border-0 text-lg text-gray-300 hover:text-gray-300",
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
                      "w-10 h-10 p-0 ml-4 border-0 text-lg text-gray-300 hover:text-gray-300",
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
            className="w-6 h-6 p-0 ml-8 mr-1 text-gray-300 hover:bg-transparent hover:text-gray-300"
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
            <ChevronsRight size={24} strokeWidth={3} className="scale-150" />
          </PaginationLink>
        </PaginationItem>
        {/* )} */}
      </PaginationContent>
    </Pagination>
  );
};

export default HospitalPagination;
