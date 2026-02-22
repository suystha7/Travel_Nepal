"use client";

import RichText from "@/utils/richText";
import {
  IReservationRecord,
  IReservationRoot,
} from "../interface/IReservationInterface";

interface ReservationContentProps {
  activeTab: string;
  dataByType: Record<string, IReservationRoot>;
}

export default function ReservationContent({
  activeTab,
  dataByType,
}: ReservationContentProps) {
  const response = dataByType?.[activeTab];
  const records = response?.data?.records ?? [];

  if (!records.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No reservation data found for {activeTab.replace("_", " ")}.
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {records.map((item: IReservationRecord) => (
        <div key={item.id} className="p-4 bg-white">
          <RichText
            className="text-gray-700 mt-2 text-center"
            content={item?.description || ""}
          />
        </div>
      ))}
    </div>
  );
}
