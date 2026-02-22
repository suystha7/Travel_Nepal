import React from "react";
import { Minus, Plus } from "lucide-react";

export interface IncreaseDecreaseButtonProps {
  // id: string;
  quantity: number;
  max?: number;
  min?: number;
  // onEdit: (id: string, quantity: string) => Promise<void> | void;
  className?: string;
}

const IncreaseDecreaseButton: React.FC<IncreaseDecreaseButtonProps> = ({
  // id,
  quantity,
  max = Number.POSITIVE_INFINITY,
  min = 1,
  // onEdit,
  className = "",
}) => {
  const [loading] = React.useState(false);

  const changeQuantity = async (newQty: number) => {
    if (loading) return;
    if (newQty < min || newQty > max) return;
    // try {
    //   setLoading(true);
    //   await onEdit(id, newQty.toString());
    // } finally {
    //   setLoading(false);
    // }
  };

  const canDecrease = quantity > min && !loading;
  const canIncrease = quantity < max && !loading;

  return (
    <div className={`flex items-center gap-x-2.5 ${className}`}>
      <div className="flex items-center gap-2.5 p-1">
        <button
          type="button"
          className={`bg-white border-white rounded-[6px] border flex items-center justify-center ${
            !canDecrease ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          onClick={() => canDecrease && changeQuantity(quantity - 1)}
          disabled={!canDecrease}
        >
          <Minus className="size-7 text-grey-500 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.08)] rounded-full p-1.5" />
        </button>

        <p className="px-1 typography-large-body font-semibold text-grey-800">
          {quantity}
        </p>

        <button
          type="button"
          className={`bg-white border-white rounded-[6px] border flex items-center justify-center ${
            !canIncrease ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          onClick={() => canIncrease && changeQuantity(quantity + 1)}
          disabled={!canIncrease}
        >
          <Plus className="size-7 text-grey-500 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.08)] rounded-full p-1.5" />
        </button>
      </div>
    </div>
  );
};

export default IncreaseDecreaseButton;
