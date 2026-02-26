import React from "react";
import PackageHighlights from "./partials/PackageHighlights";
import PackageOverview from "./partials/PackageOverview";
import BookNowSection from "./partials/BookNowSection";
import { getStaticData } from "@/core/api/fetch";
import HeroSection from "./partials/HeroSection";
import { getOrgData } from "@/core/hooks/useGetOrgData";
import RelatedPackage from "./partials/RelatedPackage";
import { getReviewData } from "./hooks/useGetRating";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const packageDetailsData = await getStaticData(`/package/${slug}`);
  const { orgData } = await getOrgData();
  const {getReviews} = await getReviewData();

  const relatedPackages = packageDetailsData?.data?.related_package
    ? [packageDetailsData.data.related_package]
    : [];

  return (
    <>
      <HeroSection
        title={packageDetailsData?.data?.name}
        image={packageDetailsData?.data?.image}
      />

      <div className="padding-x my-10">
        <BookNowSection
          packageData={packageDetailsData?.data}
          orgData={orgData?.data}
        />

        <PackageHighlights
          highlights={packageDetailsData?.data?.highlights}
          imageGallery={packageDetailsData?.data?.gallery}
        />

        <div className="flex flex-col lg:flex-row justify-between gap-10 my-10">
          <div className="lg:w-full">
            <PackageOverview
              packageData={packageDetailsData?.data}
              orgData={orgData}
              reviewData={getReviews}
            />
          </div>
        </div>

        <div className="my-5 border-t border-gray-200">
          <RelatedPackage
            relatedPackages={relatedPackages}
            categoryName={packageDetailsData?.data?.category?.name}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
