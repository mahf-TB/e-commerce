import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationCompsProps {
  currentPage: number;
  totalPages: number;
  isList:boolean;
  onPageChange: (page: number) => void;
}

const generatePages = (currentPage: number, totalPages: number) => {
  const pages: (number | string)[] = [];

  // Always show first page
  pages.push(1);

  // "..." at start
  if (currentPage > 3) {
    pages.push("...");
  }

  // Pages around current page
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }

  // "..." at end
  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

export default function PaginationPage({
  currentPage,
  totalPages,
  isList,
  onPageChange,
}: PaginationCompsProps) {
  const [pages, setPages] = useState<(number | string)[]>([]);

  useEffect(() => {
    setPages(generatePages(currentPage, totalPages));
  }, [currentPage, totalPages]);

  return (
    <div className={cn(isList ? "p-4 border-x border-b bg-gray-50 dark:bg-[#171717] border-gray-200 dark:border-gray-600" : "mt-10")}>
      <Pagination>
        <PaginationContent>
          
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              className={cn(
                currentPage === 1
                  ? "text-gray-400 hover:text-gray-400 cursor-default"
                  : "cursor-pointer hover:bg-gray-900 hover:text-white"
              )}
            />
          </PaginationItem>

          {/* Pages */}
          {pages.map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2 text-gray-500 select-none">
                ...
              </span>
            ) : (
              <PaginationItem key={index} className="cursor-pointer">
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => onPageChange(Number(page))}
                  className={cn(
                    " ",
                    page === currentPage ?
                      "border  bg-gray-700 text-white hover:text-white hover:bg-gray-700" : "hover:bg-gray-200"
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                currentPage < totalPages && onPageChange(currentPage + 1)
              }
              className={cn(
                currentPage === totalPages
                  ? "text-gray-400 hover:text-gray-400 cursor-default"
                  : "cursor-pointer hover:bg-gray-900 hover:text-white"
              )}
            />
          </PaginationItem>

        </PaginationContent>
      </Pagination>
    </div>
  );
}
