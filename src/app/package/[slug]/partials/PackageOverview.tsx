"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { detailsNav } from "@/data/packageDetailsNav";
import { IPackageDetailsData } from "../interface/IPackageDetails.interface";

import Overview from "./Overview";
import Inclusions from "./Inclusions";
import CancellationPolicy from "./CancellationPolicy";
import Itinerary from "./Itinerary";
import PackageFooter from "./PackageFooter";
import PackageNav from "./PackageNav";
import PackageSections from "./PackageSections";
import PackageSidebar from "./PackageSidebar";

interface IProps {
  packageData: IPackageDetailsData;
  orgData?: any;
}

const PackageOverview: React.FC<IProps> = ({ packageData, orgData }) => {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [isVisible, setIsVisible] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const { status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 2000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    detailsNav.forEach((item) => {
      const sectionId = item.href.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) observer.current?.observe(element);
    });

    return () => observer.current?.disconnect();
  }, []);

  const sections = [
    {
      id: "overview",
      component: <Overview overview={packageData?.itinerary} />,
    },
    {
      id: "itinerary",
      component: (
        <Itinerary
          itinerary={packageData?.itinerary}
          activity={packageData?.activity}
          meals={packageData?.meals}
        />
      ),
    },
    {
      id: "inclusions",
      component: (
        <Inclusions
          inclusions={packageData?.inclusions}
          exclusions={packageData?.exclusions}
          notices={packageData?.notices}
        />
      ),
    },
    {
      id: "cancellationPolicy",
      component: (
        <CancellationPolicy
          paymentPolicy={packageData?.payment_policy}
          cancellationPolicy={packageData?.cancellation_policy}
          termsAndConditions={packageData?.terms_conditions}
        />
      ),
    },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="flex flex-col lg:flex-row gap-10 pb-5">
        <div className="flex-1 flex flex-col gap-10">
          <PackageNav
            activeSection={activeSection}
            onScrollToSection={scrollToSection}
          />
          <PackageSections sections={sections} />
        </div>

        <PackageSidebar packageData={packageData} orgData={orgData} />
      </div>

      <AnimatePresence>
        {isVisible && <PackageFooter price={packageData?.current_price} />}
      </AnimatePresence>
    </div>
  );
};

export default PackageOverview;
