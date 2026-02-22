"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useModal } from "@/core/context/ModalContext";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { ArrowLeft, Mail } from "lucide-react";
import React from "react";
import { useVerifyOTP } from "../hooks/useForgotPassword";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { useSession } from "next-auth/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EmailSentConfirm = ({ isOpen, onClose, onSuccess }: Props) => {
  //   const { formik, isLoading } = useForgotPassword();
  const { formik, isVerifying } = useVerifyOTP();

  const { openModal } = useModal();
  // const data = sessionStorage.getItem("user_email") || "";
  const { data: session } = useSession();
  const data = session?.user?.email || "";

  const handleSwitchModal = () => {
    onClose();
    setTimeout(() => openModal("login"), 100);
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
        onSuccess();
      }}
    >
      <DialogContent
        className="w-[29rem] p-12 rounded-[1.5rem] shadow-[0px_0px_12px_0px_#00000026] bg-white"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <DialogHeader className="typography-h6-regular items-center justify-center font-semibold">
          <Mail className="mb-6 h-14 w-14 text-orange-400 bg-orange-100 rounded-full p-4" />
          <DialogTitle>Check Your Email</DialogTitle>
          <DialogDescription className="text-center mt-6 typography-large-body font-light text-grey-400 px-10">
            We sent a otp to <p className="font-semibold">{data}</p>
          </DialogDescription>
        </DialogHeader>

        {/* <button
          type="submit"
          className="my-3 w-full rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] shadow-md py-2 lg:py-3 lg:px-5 typography-extra-large-body cursor-pointer "
        >
          Open Email App
        </button> */}

        <form
          onSubmit={formik.handleSubmit}
          className="px-4 lg:px-8 py-2 space-y-5"
        >
          {/* OTP Input */}
          <div className="space-y-2">
            <InputOTP
              maxLength={6}
              name="otp"
              value={formik.values.otp}
              onChange={(value) => formik.setFieldValue("otp", value)}
              className="flex justify-between "
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="mt-3 text-primary-500 text-center border-[0.6px] border-primary-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-primary-300 mx-2"
                />
              ))}
            </InputOTP>
            {formik.touched.otp && formik.errors.otp && (
              <p className="text-error typography-paragraph-small">
                {formik.errors.otp}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isVerifying}
            className={`w-full bg-primary-500 hover:bg-primary-600 transition duration-300 rounded-[4px] !text-white py-2 lg:py-2.5 lg:px-5 font-medium typography-paragraph-large cursor-pointer ${
              isVerifying ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </button>
        </form>
        <div className="text-center">
          <button
            onClick={handleSwitchModal}
            className="inline-flex gap-2 typography-mid-body text-grey-700 hover:text-grey-600 items-center"
          >
            Didn&apos;t receive the email?
            <button className="text-yellow-500  cursor-pointer">
              Click to resend.{" "}
            </button>
          </button>
        </div>
        <div className="text-center">
          <button
            onClick={handleSwitchModal}
            className="inline-flex gap-2 typography-mid-body text-grey-400 cursor-pointer hover:text-grey-600 items-center"
          >
            <ArrowLeft size={16} /> Back to Login
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailSentConfirm;
