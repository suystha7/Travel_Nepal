import { endpoints } from "@/core/api/endpoints";
import { safeFetch } from "@/utils/safeFetch";

export const getBookingData = async () => {
  const bookingData = await safeFetch(endpoints.BOOKING.GET);
  return { bookingData };
};
