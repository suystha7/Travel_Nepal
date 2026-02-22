"use client";
import ReservationContent from "./ReservationContent";
import ReservationTabs from "./ReservationTabs";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// import ReservationContent from "./ReservationContent";

interface ReservationPageProps {
  dataByType: any;
}

export default function ReservationPage({ dataByType }: ReservationPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeTab = searchParams.get("type") ?? "air_ticket";

  const handleTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", tabId);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="padding-x mt-[10rem]">
      <h1 className="text-center typography-h5-semibold font-bold text-primary-500">
        Reservation Process
      </h1>

      <ReservationTabs activeTab={activeTab} onChange={handleTabChange} />

      <ReservationContent activeTab={activeTab} dataByType={dataByType} />
    </div>
  );
}
