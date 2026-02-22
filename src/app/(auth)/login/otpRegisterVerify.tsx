// "use client";
// // import { useRegisterOTP } from "@/app/(auth)/hooks/useRegisterOTP.hook";
// // import { useResendOtp } from "@/app/(auth)/hooks/useResendOtp.hook";
// import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
// import { DialogTitle } from "@radix-ui/react-dialog";
// import React from "react";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const OtpRegisterVerifyModal: React.FC<Props> = ({
//   isOpen,
//   onClose,
//   onSuccess,
// }) => {
//   //   const { formik, isVerifying } = useRegisterOTP({ onSuccess });
//   //   const { resendOtp, isResending } = useResendOtp();
//   const initialValues = {
//     otp: "",
//   };
//   const formik = {
//     values: initialValues,
//     errors: {} as Record<string, string>,
//     touched: {} as Record<string, boolean>,
//     handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
//     handleBlur: (e: React.FocusEvent<HTMLInputElement>) => {},
//     setFieldValue: (field: string, value: string) => {},
//     handleSubmit: (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       // Handle form submission logic here
//     },
//   };
//   const isVerifying = false;
//   const resendOtp = () => {
//     // Handle resend OTP logic here
//   };
//   const isResending = false;
//   return (
//     <Dialog
//       open={isOpen}
//       onOpenChange={(open) => {
//         if (!open) onClose();
//       }}
//     >
//       <DialogContent className="w-[29rem] p-[2rem] rounded-[1.5rem] overflow-hidden shadow-[0px_0px_12px_0px_#00000026] bg-white">
//         <DialogHeader className="typography-sub-h3 font-medium  text-grey-400 ">
//           <DialogTitle>Verify OTP</DialogTitle>
//         </DialogHeader>

//         <OTPForm
//           formik={formik}
//           isVerifying={isVerifying}
//           resendOtp={resendOtp}
//           isResending={isResending}
//         />
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default OtpRegisterVerifyModal;
