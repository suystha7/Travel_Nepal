"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function usePagination(defaultPage = 1, defaultPerPage = 10) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageFromUrl = parseInt(searchParams.get("page") || "") || defaultPage;
  const perPageFromUrl =
    parseInt(searchParams.get("perPage") || "") || defaultPerPage;

  const [page, setPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState(perPageFromUrl);

  const updateUrl = (page: number, perPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    params.set("perPage", String(perPage));

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const goToPage = (newPage: number) => {
    setPage(newPage);
    updateUrl(newPage, perPage);
  };

  const changePerPage = (newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(1);
    updateUrl(1, newPerPage);
  };

  return { page, perPage, goToPage, changePerPage };
}
