import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "../ui/pagination";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const VaccineListPage = ({
  startNum,
  page,
  totalPages,
  handlePage,
  setPage
}: {
  startNum: number;
  page: number;
  totalPages: number;
  handlePage: (number: number) => void;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <Pagination className="bg-white max-sm:mx-0 max-sm:pb-[132px] max-sm:mb-0">
      <PaginationContent>
        <PaginationItem aria-disabled={page === 1}>
          <PaginationLink
            href="#"
            isActive={false}
            onClick={() => handlePage(1)}
            aria-disabled={page === 1}
            className="w-6 h-6 p-0 text-gray-300 hover:bg-transparent hover:text-gray-300 max-sm:w-[18px]"
          >
            <ChevronsLeft size={24} strokeWidth={3} className="scale-150 max-sm:scale-100" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePage(page - 1)}
            isActive={page > 1}
            className="w-6 h-6 p-0 mr-4 ml-1 text-gray-300 hover:bg-transparent hover:text-gray-300 max-sm:mr-2 border-none"
          />
        </PaginationItem>
        {totalPages >= 5
          ? Array(5)
              .fill(null)
              .map((_, index) => (
                <PaginationItem key={`page_${index}`}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePage(startNum + index)}
                    isActive={page === index + 1}
                    className={cn(
                      "w-10 h-10 p-0 ml-4 border-0 text-lg text-gray-300 hover:text-gray-300 max-sm:w-8 max-sm:h-8 max-sm:ml-2 max-sm:text-sm",
                      page === startNum + index
                        ? "bg-primary-200 text-white hover:bg-primary-200 hover:text-white"
                        : null
                    )}
                  >
                    {startNum + index}
                  </PaginationLink>
                </PaginationItem>
              ))
          : [...Array(totalPages)].map((_, index) => (
              <PaginationItem key={`page_${index}`}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePage(index + 1)}
                  isActive={page === index + 1}
                  className={cn(
                    "w-10 h-10 p-0 ml-4 border-0 text-lg text-gray-300 hover:text-gray-300 max-sm:w-8 max-sm:h-8 max-sm:ml-2 max-sm:text-sm",
                    page === index + 1 ? "bg-primary-200 text-white hover:bg-primary-200 hover:text-white" : null
                  )}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePage(page + 1)}
            isActive={page < totalPages}
            className="w-6 h-6 p-0 ml-8 mr-1 text-gray-300 hover:bg-transparent hover:text-gray-300 max-sm:ml-4 border-none"
          />
        </PaginationItem>
        <PaginationItem aria-disabled={page === totalPages}>
          <PaginationLink
            href="#"
            onClick={() => {
              setPage(totalPages);
            }}
            isActive={false}
            aria-disabled={page === totalPages}
            className="w-6 h-6 p-0 text-lg text-gray-300 hover:bg-transparent hover:text-gray-300"
          >
            <ChevronsRight size={24} strokeWidth={3} className="scale-150 max-sm:scale-100" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default VaccineListPage;
