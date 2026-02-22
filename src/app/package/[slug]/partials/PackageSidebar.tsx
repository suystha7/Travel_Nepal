import React from "react";
import PackageSummary from "./PackageSummary";
import PromoCode from "./PromoCode";
import Rating from "./Rating";

interface SidebarProps {
  packageData: any;
  orgData: any;
}

const PackageSidebar: React.FC<SidebarProps> = ({ packageData, orgData }) => {
  return (
    <aside className="w-full lg:w-80 shrink-0">
      <div className="lg:sticky lg:top-20 space-y-6">
        <PackageSummary
          groupSize={packageData?.group_size}
          currentPrice={packageData?.current_price}
          previousPrice={packageData?.previous_price}
        />
        <PromoCode orgData={orgData?.data} />
        <Rating packageId={packageData?.id} />
      </div>
    </aside>
  );
};

export default PackageSidebar;
