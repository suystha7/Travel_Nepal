"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useModal } from "@/core/context/ModalContext";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Input from "@/components/common/Input";
import { useSignUpForm } from "../hooks/useSignUpForm.hook";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const Register: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { openModal } = useModal();

  const { formik, isLoading } = useSignUpForm({ onSuccess });

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
        className="w-115 p-8 rounded-xl shadow-md bg-white"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <DialogHeader className="typography-h6-regular font-semibold ">
          <DialogTitle>Create Account</DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <Input
            id="full_name"
            name="full_name"
            label="Name and Surname"
            placeholder="Enter your name and surname"
            value={formik.values.full_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.full_name}
            touched={formik.touched.full_name}
          />

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
          <Input
            id="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
            showToggle
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((prev) => !prev)}
            className="md:col-span-3"
          />
          <Input
            id="confirm_password"
            name="confirm_password"
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.confirm_password}
            touched={formik.touched.confirm_password}
            showToggle
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
            className="md:col-span-3"
          />

          <div className="flex items-start gap-2 my-6">
            <Checkbox
              id="terms"
              className="data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500 border-grey-100"
            />

            <label
              htmlFor="terms"
              className="typography- cursor-pointer text-grey-300!"
            >
              I aggree with{" "}
              <Link href="/terms-conditions" className="text-yellow-500">
                Terms
              </Link>{" "}
              And{" "}
              <Link href="/privacy-policy" className="text-yellow-500">
                Privacy
              </Link>
            </label>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={` w-full rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow-md py-2 lg:py-2.5 lg:px-5 font-medium typography-extra-large-body cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center font-extralight text-md pb-2">
          <span className="">Already have an account?</span>{" "}
          <button
            className="text-yellow-500 cursor-pointer"
            onClick={handleSwitchModal}
          >
            Log In
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
