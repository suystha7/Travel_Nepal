"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useGetCategoryFilter(basePath?: string) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const slug = pathname.split("/").filter(Boolean).pop() ?? "";

  const activeCategory = searchParams?.get("type") ?? "all";

  const handleCategoryClick = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (categorySlug === "all") params.delete("type");
    else params.set("type", categorySlug);

    const query = params.toString();
    const target = `${basePath ?? `/${slug}`}${query ? `?${query}` : ""}`;
    router.push(target);
  };

  const isActive = (categorySlug: string) => activeCategory === categorySlug;

  return { activeCategory, handleCategoryClick, isActive };
}
