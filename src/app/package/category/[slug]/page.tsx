import React from "react";
import OurTourPackages from "../../partials/OurTourPackages";
import DiscoverMore from "../../partials/DiscoverMore";
import { getCategories } from "@/core/hooks/useGetCategories";
import { getPackageByCategory } from "./hooks/useGetPackageByCategory";
import PackageHero from "./partials/PackageCategoryHero";
// import PackageHero from "./partials/PackageCategoryHero";

interface MenuPageProps {
  // params: { slug: string };
  params: Promise<{ slug: string }>;
  searchParams?: any;
}

const Page = async ({ params, searchParams = {} }: MenuPageProps) => {
  const { slug } = await params;

  const search = searchParams.search ?? "";
  const page = searchParams.p ? Number(searchParams.p) : 1;
  const perPage = searchParams.page_size ? Number(searchParams.page_size) : 10;

  const { packageType } = await getCategories();

  const packageData = await getPackageByCategory(slug, search, page, perPage);

  const { categoryData } = await getCategories();

  return (
    <div>
      <PackageHero
        packageImage={categoryData?.data?.records?.find(
          (c: any) => c.slug === slug
        )}
      />

      <OurTourPackages
        key={packageData?.data?.records}
        packageData={packageData?.data?.records}
        tripTypes={packageType?.data?.records || []}
        totalRecords={packageData?.data?.totalRecords || 0}
        currentPage={page}
        perPage={perPage}
      />

      <DiscoverMore />
    </div>
  );
};

export default Page;
