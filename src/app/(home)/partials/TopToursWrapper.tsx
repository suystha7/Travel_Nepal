"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const TopTours = dynamic(() => import("./TopTours"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

interface TopToursWrapperProps {
  topTours: any[];
}

export default function TopToursWrapper({ topTours }: TopToursWrapperProps) {
  return (
    <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
      <TopTours topTours={topTours} />
    </Suspense>
  );
}
