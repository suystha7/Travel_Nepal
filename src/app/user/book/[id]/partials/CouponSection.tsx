import Input from "@/components/common/Input";
import { FiTag } from "react-icons/fi";

const CouponSection = () => {
  const initialValues = { couponCode: "" };
  const formik = {
    values: initialValues,
    onSubmit: () => {},
  };
  return (
    <div className="mt-8">
      <p className="flex items-center gap-2 typography-mid-body font-medium mb-2">
        <FiTag size={18} /> Apply Coupon
      </p>
      <hr className="my-2" />

      <form onSubmit={() => {}} className="w-full">
        <Input
          label=""
          name="couponCode"
          placeholder="Coupon Code"
          onChange={() => {}}
          onBlur={() => {}}
          value={formik.values.couponCode}
          className="border-[#E3E8EF] rounded-[8px]"
        />
      </form>
    </div>
  );
};

export default CouponSection;
