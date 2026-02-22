"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalRecords: number;
  perPage: number;
  goToPage: (page: number) => void;
  changePerPage: (perPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalRecords,
  perPage,
  goToPage,
  changePerPage,
}) => {
  const totalPages = Math.ceil(totalRecords / perPage);

  const { start, end } = useMemo(() => {
    const s = totalRecords === 0 ? 0 : (currentPage - 1) * perPage + 1;
    const e = Math.min(s + perPage - 1, totalRecords);
    return { start: s, end: e };
  }, [currentPage, perPage, totalRecords]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 px-6 rounded-xl bg-white">
      <div className="text-sm text-gray-600 min-w-fit">
        Showing <span className="font-medium">{start}</span> to{" "}
        <span className="font-medium">{end}</span> of{" "}
        <span className="font-medium">{totalRecords}</span> items
      </div>

      <div className="flex items-center gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
          className="p-2 inline-flex text-gray-500 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-gray-100 text-gray-900 border border-gray-300"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => goToPage(currentPage + 1)}
          className="p-2 inline-flex text-gray-500 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative border border-gray-300 rounded-full px-3 py-1 flex items-center bg-white">
          <select
            value={perPage}
            onChange={(e) => changePerPage(Number(e.target.value))}
            className="appearance-none bg-transparent pr-4 outline-none cursor-pointer text-sm font-medium text-gray-700"
          >
            {[1, 5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 flex items-center">
            <div className="border-t-4 border-t-gray-500 border-x-4 border-x-transparent" />
          </div>
        </div>
        <p className="text-sm text-gray-600 whitespace-nowrap">per page</p>
      </div>
    </div>
  );
};

export default Pagination;
