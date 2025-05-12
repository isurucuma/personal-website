"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  const createPageUrl = (page: number) => {
    const url = new URL(baseUrl, window.location.origin);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", page.toString());
    url.search = searchParams.toString();
    return url.pathname + url.search;
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        asChild={currentPage > 1}
      >
        {currentPage > 1 ? (
          <Link href={createPageUrl(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Link>
        ) : (
          <>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </>
        )}
      </Button>

      <div className="flex items-center gap-2 mx-4">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              asChild={currentPage !== page}
            >
              {currentPage !== page ? (
                <Link href={createPageUrl(page)}>{page}</Link>
              ) : (
                page
              )}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        asChild={currentPage < totalPages}
      >
        {currentPage < totalPages ? (
          <Link href={createPageUrl(currentPage + 1)}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <>
            Next
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
