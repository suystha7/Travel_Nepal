"use client";

import Input from "@/components/common/Input";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import React, { useState } from "react";
const isVerifying = false;

const OtpVerify = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = {
    values: {
      otp_code: "",
      new_password: "",
      confirm_password: "",
    },
    errors: {
      otp_code: "",
      new_password: "",
      confirm_password: "",
    },
    touched: {
      otp_code: false,
      new_password: false,
      confirm_password: false,
    },
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
    },
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      e.preventDefault();
    },
    setFieldValue: () => {},
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Handle form submission logic here
    },
  };
  return (
    <div className="h-90 flex items-center justify-center my-20 ">
      <div className="w-[29rem] p-[2rem] rounded-[1.5rem] overflow-hidden shadow-[0px_0px_12px_0px_#00000026] bg-white">
        {/* Header */}
        <div className=" text-black pb-2 flex justify-between items-center border-b-[0.6px] border-primary-500">
          <h2 className="text-xl font-semibold ">Enter Your OTP</h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="px-4 lg:px-8 py-2 space-y-5"
        >
          {/* OTP Input */}
          <div className="space-y-2">
            <InputOTP
              maxLength={6}
              name="otp"
              value={formik.values.otp_code}
              onChange={() => formik.setFieldValue()}
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
            {formik.touched.otp_code && formik.errors.otp_code && (
              <p className="text-error typography-paragraph-small">
                {formik.errors.otp_code}
              </p>
            )}
          </div>

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
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((prev) => !prev)}
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
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
            className="md:col-span-3"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isVerifying}
            className={`w-full bg-primary-500 hover:bg-primary-500 transition duration-300 rounded-[4px] !text-white py-2 lg:py-2.5 lg:px-5 font-medium typography-paragraph-large cursor-pointer ${
              isVerifying ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </button>

          {/* Resend OTP Link */}
          {/* <div className="text-center typography-paragraph-small pb-4">
            Did not received the code ?{" "}
            <button
              type="button"
              onClick={resendOtp}
              disabled={isResending}
              className=" text-purple-500 disabled:opacity-50 cursor-pointer"
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default OtpVerify;
