import * as Yup from "yup";

export const step1ValidationSchema = Yup.object({
  user: Yup.string().uuid("Invalid user ID").required("User is required"),
  package: Yup.string()
    .uuid("Invalid package ID")
    .required("Package is required"),
  adult_count: Yup.number()
    .min(1, "At least 1 adult is required")
    .required("Adult count is required"),
  child_count: Yup.number()
    .min(0, "Cannot be negative")
    .required("Child count is required"),
  infant_count: Yup.number()
    .min(0, "Cannot be negative")
    .required("Infant count is required"),
  arrival_date: Yup.string().required("Arrival date is required"),
  departure_date: Yup.string().required("Departure date is required"),
  total_amount: Yup.number()
    .min(0, "Total amount must be positive")
    .required("Total amount is required"),
  currency: Yup.string().required("Currency is required"),

  adults: Yup.array()
    .of(
      Yup.object({
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        phone: Yup.string()
          .matches(/^\+?\d{7,15}$/, "Invalid phone number")
          .required("Phone is required"),
        passport_number: Yup.string().required("Passport number is required"),
        nationality: Yup.string().required("Nationality is required"),
      })
    )
    .min(1, "At least one adult is required")
    .required("Adults are required"),

  children: Yup.array().of(
    Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      date_of_birth: Yup.date()
        .max(new Date(), "Date of birth cannot be in the future")
        .required("Date of birth is required"),
      nationality: Yup.string().required("Nationality is required"),
    })
  ),
});

export const step2ValidationSchema = Yup.object({});

export const bookingValidationSchema = step1ValidationSchema.concat(
  step2ValidationSchema
);
export type Step1ValidationSchemaType = Yup.InferType<
  typeof step1ValidationSchema
>;
export type Step2ValidationSchemaType = Yup.InferType<
  typeof step2ValidationSchema
>;

export type BookingValidationSchemaType = Step1ValidationSchemaType &
  Step2ValidationSchemaType;
