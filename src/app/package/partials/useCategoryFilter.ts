// "use client";
// import { useState, useEffect } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// export function useCategoryFilter(basePath?: string) {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();

//   const pathSegments = pathname.split("/");
//   const slug = pathSegments[pathSegments.length - 1];

//   const [activeCategory, setActiveCategory] = useState<string>("all");

//   useEffect(() => {
//     const categorySlug = searchParams.get("category_slug");
//     setActiveCategory(categorySlug || "all");
//   }, [searchParams]);

//   const handleCategoryClick = (categorySlug: string | "all") => {
//     const params = new URLSearchParams(searchParams.toString());

//     if (categorySlug === "all") {
//       params.delete("category_slug");
//     } else {
//       const cleanSlug = categorySlug.replace(/^\//, "");
//       params.set("category_slug", cleanSlug);
//     }

//     router.push(`${basePath ?? slug}?${params.toString()}`);
//   };

//   const isActive = (categorySlug: string) => activeCategory === categorySlug;

//   return { activeCategory, handleCategoryClick, isActive };
// }

"use client";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useURLFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setFilter = useCallback(
    (key: string, value: string | number | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null || value === "" || value === "all") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }

      const queryString = params.toString();
      router.push(`?${queryString}`, { scroll: false });
    },
    [router, searchParams]
  );

  const getFilter = useCallback(
    (key: string, defaultValue: string | null = null) => {
      return searchParams.get(key) ?? defaultValue;
    },
    [searchParams]
  );

  return { setFilter, getFilter };
}
