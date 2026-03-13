"use client";

import {
  IPackageDetailsItinerary,
} from "../interface/IPackageDetails.interface";
import RichText from "@/utils/richText";

interface IOverview {
  overview: IPackageDetailsItinerary[];
  packageData: string;
}

const Overview = ({ overview, packageData }: IOverview) => {
  if (!overview || overview.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="mb-5">
        <RichText content={packageData} />
      </div>
    </section>
  );
};

export default Overview;
