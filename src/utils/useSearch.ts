"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

const useSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const search = searchParams.get("search") ?? "";

  const updateSearchParams = (params: { search?: string }) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (params.search !== undefined) {
      if (!params.search) {
        newParams.delete("search");
      } else {
        newParams.set("search", params.search);
      }
    }

    const newUrl = `${pathname}?${newParams.toString()}`;
    router.push(newUrl, { scroll: false });
  };

  const handleSearch = (val: string) => {
    updateSearchParams({ search: val });
  };

  return { search, handleSearch };
};

export default useSearch;
