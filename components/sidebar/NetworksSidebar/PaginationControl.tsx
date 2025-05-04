import { useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlProps {
  pageIndex: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControl({ pageIndex, totalPages, onPageChange }: PaginationControlProps) {
  if (totalPages <= 1) return null;

  const handlePrevPage = useCallback(() => {
    onPageChange(Math.max(0, pageIndex - 1));
  }, [pageIndex, onPageChange]);

  const handleNextPage = useCallback(() => {
    onPageChange(Math.min(totalPages - 1, pageIndex + 1));
  }, [pageIndex, totalPages, onPageChange]);

  const pagesToShow =
    totalPages <= 4
      ? // Show all pages
        Array.from({ length: totalPages }).map((_, i) => i)
      : // Else show only 3 meaningful pages
        [
          ...new Set([
            0, // always show the first page
            pageIndex === 0 ? 1 : pageIndex, // optionally show the second page
            pageIndex, // always show current page
            pageIndex === totalPages - 1 ? pageIndex - 1 : pageIndex, // optionally show second-to-last page
            totalPages - 1, // always show the last page
          ]), // `new Set` makes sure that optional pages collapse with the current page
        ]
          .sort() // fix last and second-to-last page order
          .reduce<Array<number | null>>((acc, p, i, arr) => {
            acc.push(p);
            // insert `null` in place of skipped pages
            if (i < arr.length - 1 && p + 1 !== arr[i + 1]) acc.push(null);
            return acc;
          }, []);

  return (
    <Pagination currentPage={pageIndex + 1} lastPage={totalPages}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevPage} />
        </PaginationItem>
        {pagesToShow.map((page, i) => (
          <PaginationItem key={page !== null ? page : `empty_${i}`}>
            {page !== null ? (
              <PaginationLink onClick={() => onPageChange(page)} isActive={page === pageIndex}>
                {page + 1}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
