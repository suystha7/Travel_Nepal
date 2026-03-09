import React from "react";
import BookingForm from "./partials/BookingForm";
import { getBookingData } from "./hooks/useGetBooking";

const fallbackBookingData = {
  user: "862eb1a7-5709-482c-9e95-dda1dcefe2b5",
  package: "df20eb6c-83bf-4c47-8d98-7b55cc0e8442",
  package_name: "Rara Adventure",
  adult_count: 2,
  child_count: 1,
  infant_count: 0,
  arrival_date: "2026-06-10",
  departure_date: "2026-06-15",
  total_amount: 3500,
  currency: "AUD",
  adult_price: 8500,
  child_price: 2000,
  infant_price: 0,
  adults: [
    {
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      phone: "+61400000000",
      passport_number: "A12345678",
      nationality: "Australian",
    },
    {
      first_name: "Jane",
      last_name: "Doe",
      email: "jane@example.com",
      phone: "+61400000001",
      passport_number: "B12345678",
      nationality: "Australian",
    },
  ],
  children: [
    {
      first_name: "Tom",
      last_name: "Doe",
      date_of_birth: "2015-05-10",
      nationality: "Australian",
    },
  ],
};

const Page = async () => {
  let bookingData;
  try {
    const response = await getBookingData();
    bookingData = response?.bookingData || fallbackBookingData;
  } catch (error) {
    console.error("Failed to fetch booking data:", error);
    bookingData = fallbackBookingData;
  }

  console.log("data", bookingData);

  return (
    <div className="padding-x my-10">
      <BookingForm booking={bookingData} />
    </div>
  );
};

export default Page;