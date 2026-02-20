import { safeFetch } from "@/utils/safeFetch";

export const getReservationData = async () => {
  const faqData = await safeFetch("/faq");

  const air = await safeFetch(`/reservation?type=air_ticket`);
  const car = await safeFetch(`/reservation?type=car_booking`);
  const holiday = await safeFetch(`/reservation?type=holiday_booking`);
  const hotel = await safeFetch(`/reservation?type=hotel_booking`);

  return {
    faqData,
    dataByType: {
      air_ticket: air || {},
      car_booking: car || {},
      holiday_booking: holiday || {},
      hotel_booking: hotel || {},
    },
  };
};
