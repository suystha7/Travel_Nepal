"use client";

const RESERVATION_TABS = [
  { id: "air_ticket", label: "Air Ticket" },
  { id: "car_booking", label: "Car Booking" },
  { id: "hotel_booking", label: "Hotel Booking" },
  { id: "holiday_booking", label: "Holiday Booking" },
];

interface ReservationTabsProps {
  activeTab: string;
  onChange: (tabId: string) => void;
}

export default function ReservationTabs({
  activeTab,
  onChange,
}: ReservationTabsProps) {
  return (
    <div className="my-4 flex justify-center gap-10 bg-white p-3 rounded-full">
      {RESERVATION_TABS.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`px-4 py-1.5
            ${activeTab === item.id ? "text-grey-900" : "text-grey-600"}
          `}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
