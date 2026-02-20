import Input from "@/components/common/Input";
import React from "react";

const Step2Form = () => {
  return (
    <div>
      <h2 className="typography-sub-h2-medium text-grey-800 pb-5">
        Your Details
      </h2>

      <div className="flex flex-col gap-5">
        <div className="flex gap-4">
          <Input label="Name" name="name" placeholder="Enter your name" />
          <Input
            label="Surname"
            name="surname"
            placeholder="Enter your surname"
          />
        </div>
        <Input
          label="Telephone Number"
          name="telephoneNumber"
          placeholder="Enter your telephone number"
        />
        <Input
          label="Email Address"
          name="emailAddress"
          placeholder="Enter your email address"
        />
      </div>
    </div>
  );
};

export default Step2Form;
