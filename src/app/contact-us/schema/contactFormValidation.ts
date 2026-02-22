import * as Yup from "yup";

export const SERVICE_CHOICES = [
  { value: "flights", label: "Flight Booking" },
  { value: "hotels", label: "Hotel & Resort Booking" },
  { value: "trekking", label: "Trekking & Hiking" },
  { value: "adventure", label: "Adventure Activities" },
  { value: "sightseeing", label: "Sightseeing Tours" },
  { value: "cultural", label: "Cultural & Heritage Tours" },
  { value: "pilgrimage", label: "Pilgrimage Tours" },
  { value: "safari", label: "Jungle Safari" },
  { value: "transport", label: "Airport Pickup & Transport" },
  { value: "tour_packages", label: "Domestic & International Tour Packages" },
];

export const contactSchema = Yup.object({
  name: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z\s'-]+$/,
      "Name cannot contain numbers or special characters"
    )
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .required("Name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  service: Yup.string()
    .oneOf(
      SERVICE_CHOICES.map((c) => c.value),
      "Invalid service selection"
    )
    .required("Please select a service"),
  message: Yup.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long")
    .required("Message is required"),
});

export type IFormValues = Yup.InferType<typeof contactSchema>;
