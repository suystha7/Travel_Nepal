import React from "react";
import OurTourPackages from "./partials/OurTourPackages";
import PackageHero from "./partials/PackageHero";
import { endpoints } from "@/core/api/endpoints";
import { getStaticData } from "@/core/api/fetch";
import { ISeoResponse } from "@/interface/seoResponse";
import { createMetadata } from "@/utils/createMetadata";
import { getCategories } from "@/core/hooks/useGetCategories";
import { getPackageData } from "./hooks/useGetPackageData";
// import SpecialOffer from "./partials/SpecialOffer";
import { safeFetch } from "@/utils/safeFetch";

export async function generateMetadata() {
  const { data } = await getStaticData<ISeoResponse>(endpoints.SEO.PACKAGE);
  const seoRecord = data?.records?.[0] ?? null;
  return createMetadata(seoRecord);
}

interface PageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const Page = async ({ searchParams }: PageProps) => {
  const params = (await searchParams) || {};

  const page = Number(params.p) || 1;
  const perPage = Number(params.page_size) || 10;
  const country = params.country ? String(params.country) : undefined;
  const package_type = params.package_type
    ? String(params.package_type)
    : undefined;
  const min_rating = params.min_rating ? Number(params.min_rating) : undefined;
  const max_rating = params.max_rating ? Number(params.max_rating) : undefined;
  const duration = params.duration ? Number(params.duration) : undefined;
  const min_price = params.min_price ? Number(params.min_price) : undefined;
  const max_price = params.max_price ? Number(params.max_price) : undefined;
  const start_date = params.start_date ? String(params.start_date) : undefined;
  const end_date = params.end_date ? String(params.end_date) : undefined;
  const search = params.search ? String(params.search) : undefined;

  const [packageData, packageBreacrumb, { packageType }] = await Promise.all([
    getPackageData(
      search,
      page,
      perPage,
      min_price,
      max_price,
      max_rating,
      min_rating,
      duration,
      package_type,
      country,
      start_date,
      end_date
    ),
    safeFetch(endpoints.BREADCRUMB.PACKAGE),
    getCategories(),
  ]);

  return (
    <main>
      <PackageHero packageHero={packageBreacrumb?.data?.records} />

      <OurTourPackages
        key={packageData?.data?.id}
        packageData={packageData?.data?.records || []}
        tripTypes={packageType?.data?.records || []}
        totalRecords={packageData?.data?.totalRecords || 0}
        currentPage={page}
        perPage={perPage}
      />

      {/* <SpecialOffer /> */}
    </main>
  );
};

export default Page;
