import * as Yup from "yup";

export const LoginByPasswordSchema = Yup.object({
  //   username: Yup.string()
  //     .required("Email or Phone number is required")
  //     .test(
  //       "is-email-or-phone",
  //       "Enter a valid email or 10-digit phone number",
  //       (value) =>
  //         !!value &&
  //         !/\s/.test(value) &&
  //         (/^\d{10}$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
  //     ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string().required("New password is required"),
  // .min(6, "Password must be at least 6 characters")
  // .matches(
  //   /[!@#$%^&*(),.?":{}|<>]/,
  //   "Password must contain at least one special character"
  // )
});

export const SignUpSchema = Yup.object({
  full_name: Yup.string()
    .matches(
      /^[A-Za-z\s'-]+$/,
      "First name can not contain numbers or special characters"
    )
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),

  //   phone_no: Yup.string()
  //     .required("Phone number is required")
  //     .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const SellerRegisterSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),

  middle_name: Yup.string(),

  last_name: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),

  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["M", "F", "O"], "Please select a valid gender"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Include one special character"),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),

  referral_code: Yup.string().optional(),
});

export const SignUpByPhoneSchema = Yup.object({
  phone_no: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  referral_code: Yup.string().optional(),
});

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Current password is required"),

  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .matches(/^\S+$/, "Password must not contain spaces")
    .notOneOf(
      [Yup.ref("oldPassword")],
      "New password cannot be the same as the current password"
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export const DeliveryAddressSchema = Yup.object({
  first_name: Yup.string()
    .matches(
      /^[A-Za-z\s'-]+$/,
      "First name can not contain numbers or special characters"
    )
    .required("First name is required"),
  last_name: Yup.string()
    .matches(
      /^[A-Za-z\s'-]+$/,
      "Last name can not contain numbers or special characters"
    )
    .required("Last name is required"),
  alternative_address: Yup.string().required("Alternative address is required"),
  landmark: Yup.string().required("Landmark is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
});
