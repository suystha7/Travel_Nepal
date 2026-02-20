// import React, { useEffect, useState } from "react";
// import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
// import { FormikProps } from "formik";
// import { IOtpFormValues } from "@/app/(auth)/hooks/useRegisterOTP.hook";

// interface IProps {
//   formik: FormikProps<IOtpFormValues>;
//   isVerifying: boolean;
//   resendOtp?: (onSuccess?: () => void) => void;
//   isResending?: boolean;
// }

// const OTPForm: React.FC<IProps> = ({
//   formik,
//   isVerifying,
//   resendOtp,
//   isResending,
// }) => {
//   const phone_no =
//     typeof window !== "undefined"
//       ? sessionStorage.getItem("user_phone") || ""
//       : "";

//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     if (timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     }

//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleResend = () => {
//     resendOtp?.(() => {
//       setTimer(120);
//     });
//   };

//   const formatTime = (sec: number) => {
//     const minutes = Math.floor(sec / 60);
//     const seconds = sec % 60;
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return (
//     <>
//       <div className="text-center typography-paragraph-medium text-grey-100">
//         Enter the 6-digit code sent to: userg1234@mail.com in Gmail or Phone
//         Number
//         <p className="text-primary-400">{phone_no}</p>
//       </div>
//       <form onSubmit={formik.handleSubmit} className="space-y-5">
//         {/* OTP Input */}
//         <div className="space-y-2">
//           <InputOTP
//             maxLength={6}
//             name="otp"
//             value={formik.values.otp_code}
//             onChange={(value) => formik.setFieldValue("otp_code", value)}
//             className="flex justify-between "
//           >
//             {Array.from({ length: 6 }).map((_, index) => (
//               <InputOTPSlot
//                 key={index}
//                 index={index}
//                 className="mt-3 text-primary-300 text-center border-[0.6px] border-primary-75 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-brand-75 mx-2"
//               />
//             ))}
//           </InputOTP>
//           {formik.touched.otp_code && formik.errors.otp_code && (
//             <p className="text-error typography-paragraph-small">
//               {formik.errors.otp_code}
//             </p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isVerifying}
//           className={`mt-3.5 lg:mt-2 w-full bg-primary-300 hover:bg-primary-400 transition duration-300 rounded-[4px] !text-white py-2 lg:py-2.5 lg:px-5 font-medium typography-paragraph-large cursor-pointer ${
//             isVerifying ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {isVerifying ? "Verifying..." : "Verify"}
//         </button>

//         {/* Resend OTP */}
//         <div className="text-center typography-paragraph-medium text-grey-300 pb-4">
//           Didn’t receive the code?{" "}
//           <button
//             type="button"
//             onClick={handleResend}
//             disabled={isResending || timer > 0}
//             className="text-primary-400 disabled:opacity-50 cursor-pointer"
//           >
//             {timer > 0
//               ? `Resend in ${formatTime(timer)}`
//               : isResending
//                 ? "Resending..."
//                 : "Resend OTP"}
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default OTPForm;
