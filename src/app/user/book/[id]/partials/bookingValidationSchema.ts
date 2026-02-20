import * as Yup from "yup";

export const step1ValidationSchema = Yup.object({});

export const step2ValidationSchema = Yup.object({});

export const step3ValidationSchema = Yup.object({});

export const bookingValidationSchema = step1ValidationSchema
  .concat(step2ValidationSchema)
  .concat(step3ValidationSchema);

export type Step1ValidationSchemaType = Yup.InferType<
  typeof step1ValidationSchema
>;
export type Step2ValidationSchemaType = Yup.InferType<
  typeof step2ValidationSchema
>;
export type Step3ValidationSchemaType = Yup.InferType<
  typeof step3ValidationSchema
>;

export type BookingValidationSchemaType = Step1ValidationSchemaType &
  Step2ValidationSchemaType &
  Step3ValidationSchemaType;
