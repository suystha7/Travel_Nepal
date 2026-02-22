import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import cashOnDelivery from "@/assest/cod.png";
import esewa from "@/assest/esewa.png";
import phonepay from "@/assest/phonepay.png";
import khalti from "@/assest/khalti.png";
import visa from "@/assest/visa.png";
import CouponSection from "./CouponSection";
import PaymentSummarySection from "./PaymentSummary";

const paymentOptions = [
  { id: "khalti", image: khalti, alt: "Khalti" },
  { id: "esewa", image: esewa, alt: "Esewa" },
  { id: "visa", image: visa, alt: "Visa" },
  { id: "phonepay", image: phonepay, alt: "PhonePay" },
  {
    id: "cod",
    image: cashOnDelivery,
    alt: "Cash on Delivery",
    label: "Cash on\nDelivery",
  },
];

const Step3Form = ({
  selectedMethod,
  setSelectedMethod,
}: {
  selectedMethod: string;
  setSelectedMethod: (val: string) => void;
}) => {
  return (
    <div className="">
      <h2 className="typography-sub-h2-medium text-grey-800">Payment</h2>
      <p className="typography-mid-body text-grey-700s">
        Select a payment method
      </p>
      <hr className="my-2" />
      <div className="grid grid-cols-4 gap-2">
        {paymentOptions.map((option) => (
          <label
            key={option.id}
            className="flex items-center space-x-1 cursor-pointer border-r pr-2"
          >
            <Checkbox
              checked={selectedMethod === option.id}
              onCheckedChange={() => setSelectedMethod(option.id)}
              className="border-gray-200  data-[state=checked]:bg-primary-500"
            />
            <div className="flex gap-2 items-center">
              <div
                className={
                  option.id === "cod"
                    ? "w-8 h-8"
                    : "w-[4.21875rem] h-[1.3865rem]"
                }
              >
                <Image
                  src={option.image}
                  alt={option.alt}
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                />
              </div>
              {option.id === "cod" && (
                <p className="text-[#2E1A68] text-sm font-medium leading-tight">
                  Cash on <br /> Delivery
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
      <CouponSection />
      <PaymentSummarySection />
    </div>
  );
};

export default Step3Form;
