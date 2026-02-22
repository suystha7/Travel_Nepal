"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParams = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === "") newParams.delete(key);
      else newParams.set(key, value);
    });
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return { searchParams, updateParams };
};
