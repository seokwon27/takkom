"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { usePathname } from "next/navigation";
import { getStringQueryParams } from "./setQueryParams";
import { cn } from "@/lib/utils";

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
      <PaginationContent className="gap-4">
        <PaginationItem aria-disabled={currentPage === 1}>
          <PaginationPrevious
            href={
              currentPage > 1 ? getStringQueryParams({ ...params, pageNo: String(currentPage - 1) }, pathname) : "#"
            }
            aria-disabled={currentPage === 1}
            className="w-10 h-10 p-0 text-gray-300 mr-4"
          />
        </PaginationItem>
        {maxPage >= 5 ? (
          <>
          {1 < startNum && (
            <>
              <PaginationItem>
                <PaginationLink
                  href={getStringQueryParams({ ...params, pageNo: String(1) }, pathname)}
                  isActive={false}
                  className="p-0 text-xl text-gray-300"
                >
                  {1}
                </PaginationLink>
              </PaginationItem>
              <PaginationEllipsis className="w-10 h-10 p-[5px] border-0 text-xl text-gray-300 items-end" />
            </>
          )}
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <PaginationItem key={`pagination_${idx}`}>
                  <PaginationLink
                    href={getStringQueryParams({ ...params, pageNo: String(startNum + idx) }, pathname)}
                    isActive={currentPage === startNum + idx}
                    className={cn(
                      "w-10 h-10 p-0 border-0 text-xl text-gray-300",
                      currentPage === startNum + idx ? "bg-primary-200 text-white" : null
                    )}
                  >
                    {startNum + idx}
                  </PaginationLink>
                </PaginationItem>
              ))}
            {startNum + 4 < maxPage && (
              <>
                <PaginationEllipsis className="w-10 h-10 p-[5px] border-0 text-xl text-gray-300 items-end" />
                <PaginationItem>
                  <PaginationLink
                    href={getStringQueryParams({ ...params, pageNo: String(maxPage) }, pathname)}
                    isActive={false}
                    className="p-0 text-xl text-gray-300"
                  >
                    {maxPage}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            {/* <PaginationItem>
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
            </PaginationItem> */}
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
                    className={cn(
                      "w-10 h-10 p-0 border-0 text-xl text-gray-300",
                      currentPage === startNum + idx ? "bg-primary-200 text-white" : null
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
              currentPage < maxPage
                ? getStringQueryParams({ ...params, pageNo: String(currentPage + 1) }, pathname)
                : "#"
            }
            className="w-10 h-10 p-0 text-gray-300 ml-4"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default HospitalPagination;
