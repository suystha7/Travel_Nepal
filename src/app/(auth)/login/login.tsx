"use client";
import Input from "@/components/common/Input";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useModal } from "@/core/context/ModalContext";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useLoginByPassword } from "../hooks/useLoginByPassword.hook";
import GoogleLoginButton from "./GoogleLoginButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const Login: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  // const [isPhone, setIsPhone] = useState(false);

  // const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   formik.handleChange(e);

  //   const phoneRegex = /^[0-9+\-() ]+$/;
  //   setIsPhone(phoneRegex.test(value));
  // };

  const { openModal } = useModal();
  const { formik, isLoading } = useLoginByPassword({ onSuccess });

  const handleSwitchModal = () => {
    onClose();
    setTimeout(() => openModal("signup"), 100);
  };
  const handleSwitchToForgotPassword = () => {
    onClose();
    setTimeout(() => openModal("forgotPassword"), 100);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="w-116 px-14 py-10 bg-white rounded-3xl shadow-[0px_4px_20px_0px_rgba(255,255,255,0.25)]">
        <DialogHeader className="typography-h6-regular font-medium">
          <DialogTitle>Login </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          {/* Phone Number or Referral Code */}
          <div className="mb-4">
            <div className="flex flex-col">
              <Input
                label="Email Address"
                id="email"
                name="email"
                type="email"
                placeholder={`E-mail Address`}
                className="form-input"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
                required
              />
            </div>
          </div>

          <Input
            id="password"
            name="password"
            label="New Password"
            placeholder="Enter your password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            showToggle
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((prev) => !prev)}
            className="md:col-span-3"
          />

          <div className="flex justify-end mt-2.5 ">
            {/* <Link
              href={"#"}
              onClick={onClose}
              className="typography-mid-body font-light text-grey-300 hover:text-grey-700 hover:underline"
            >
            </Link> */}
            <button
              onClick={handleSwitchToForgotPassword}
              className="typography-mid-body font-light text-grey-500 hover:text-grey-700 hover:underline"
            >
              Forgot your Password?
            </button>
          </div>

          {/* Submit Button */}
          {/* <button
            type="submit"
            disabled={isLoading}
            className={`mt-3.5 lg:mt-2 w-full bg-primary-500 hover:bg-primary-500 transition duration-300 rounded-[4px] !text-white py-2 lg:py-2.5 lg:px-5 font-medium typography-paragraph-large cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging In..." : "Login"}
          </button> */}
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-3.5 lg:mt-2 w-full hover:bg-primary-600 bg-primary-500 rounded-full shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] text-white py-2 lg:py-2.5 lg:px-5 font-medium typography-paragraph-large cursor-pointer
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Social Media Login Options */}
        <p className="text-grey-200 text-center text-sm">Or</p>

        <div className="flex gap-5 items-center justify-center cursor-pointer ">
          <GoogleLoginButton
            isOpen={isOpen}
            onSuccess={() => {
              onClose();
              onSuccess();
            }}
          />
        </div>

        {/* Sign In Link */}
        <div className="text-center typography-paragraph-medium pb-2">
          <span className=" text-grey-700">Don’t have an account? </span>
          <button
            onClick={handleSwitchModal}
            className="text-yellow-600 cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
