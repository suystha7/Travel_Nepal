"use client";

import Input from "@/components/common/Input";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useModal } from "@/core/context/ModalContext";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { ArrowLeft, Key } from "lucide-react";
import React from "react";
import { useForgotPassword } from "../hooks/useForgotPassword";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ForgotPassword = ({ isOpen, onClose, onSuccess }: Props) => {
  const { formik, isLoading } = useForgotPassword();
  // const isLoading = false;
  // const formik = {
  //   values: {
  //     email: "",
  //   },
  //   errors: {
  //     email: "",
  //   },
  //   touched: {
  //     email: false,
  //   },
  //   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
  //     e.preventDefault();
  //   },
  //   handleBlur: (e: React.FocusEvent<HTMLInputElement>) => {
  //     e.preventDefault();
  //   },
  //   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     // Handle form submission logic here
  //   },
  // };
  const { openModal } = useModal();

  const handleSwitchModal = () => {
    onClose();
    setTimeout(() => openModal("login"), 100);
  };
  // const showSendConfirm = () => {
  //   onClose();
  //   setTimeout(() => openModal("emailSentConfirm"), 100);
  // };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
        onSuccess();
      }}
    >
      <DialogContent
        className="w-[29rem] pt-[2rem] rounded-[1.5rem] shadow-[0px_0px_12px_0px_#00000026] bg-white"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <DialogHeader className="typography-h6-regular items-center justify-center font-semibold my-2">
          <Key className="my-2 h-14 w-14 text-orange-400 bg-orange-100 rounded-full p-4" />
          <DialogTitle>Forget Password</DialogTitle>
          <DialogDescription className="text-center mt-2 typography-large-body font-light text-grey-700">
            No worries, we&apos;ll send you reset instructions.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-5 px-6 py-4">
          <div className="space-y-2">
            <Input
              id="email"
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
              touched={formik.touched.email}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            // onClick={showSendConfirm}
            className={` w-full rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] shadow-md py-2 lg:py-3 lg:px-5 typography-extra-large-body cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Sending..." : "Reset Password"}
          </button>

          <div className="text-center pb-2">
            <button
              onClick={handleSwitchModal}
              className="inline-flex gap-2 typography-mid-body text-grey-400 cursor-pointer hover:text-grey-600 items-center"
            >
              <ArrowLeft size={16} /> Back to Login
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
