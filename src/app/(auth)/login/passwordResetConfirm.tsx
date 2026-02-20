"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useModal } from "@/core/context/ModalContext";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { ArrowLeft, Check } from "lucide-react";
import React from "react";
import { useSetPassword } from "../hooks/useForgotPassword";
import Input from "@/components/common/Input";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ResetConfirm = ({ isOpen, onClose, onSuccess }: Props) => {
  //   const { formik, isLoading } = useForgotPassword();
  const { openModal } = useModal();

  const handleSwitchModal = () => {
    onClose();
    setTimeout(() => openModal("login"), 100);
  };

  const { formik, isResetting } = useSetPassword();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
        onSuccess();
      }}
    >
      <DialogContent
        className="w-[29rem] py-10 rounded-[1.5rem] shadow-[0px_0px_12px_0px_#00000026] bg-white"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <DialogHeader className="typography-h6-regular items-center justify-center font-semibold">
          <Check className="mb-6 h-14 w-14 text-orange-400 bg-orange-100 rounded-full p-4" />
          <DialogTitle>Set New Password</DialogTitle>
          <DialogDescription className="text-center mt-6 typography-large-body font-light text-grey-400 px-10">
            Your otp has successfully been verified.Please set a new password.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={formik.handleSubmit}
          className="px-4 lg:px-8 py-2 space-y-5"
        >
          <Input
            id="new_password"
            name="new_password"
            label="New Password"
            placeholder="Enter New Password"
            type="password"
            value={formik.values.new_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.new_password}
            touched={formik.touched.new_password}
            showToggle
            // showPassword={showPassword}
            // onTogglePassword={() => setShowPassword((prev) => !prev)}
            className="md:col-span-3"
          />

          <Input
            id="confirm_password"
            name="confirm_password"
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            type="password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.confirm_password}
            touched={formik.touched.confirm_password}
            showToggle
            // showPassword={showConfirmPassword}
            // onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
            className="md:col-span-3"
          />
          <button
            type="submit"
            disabled={isResetting}
            className={` w-full rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] shadow-md py-2 lg:py-3 lg:px-5 typography-extra-large-body cursor-pointer ${
              isResetting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isResetting ? "Submitting..." : "Submit"}
          </button>
        </form>
        <div className="text-center pb-2">
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

export default ResetConfirm;
