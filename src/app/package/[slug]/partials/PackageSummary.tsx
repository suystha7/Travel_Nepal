import React from "react";

interface IProps {
  groupSize: string;
  previousPrice: string;
  currentPrice: string;
}

const PackageSummary: React.FC<IProps> = ({
  groupSize,
  previousPrice,
  currentPrice,
}) => {
  const parsePrice = (val: string) =>
    parseFloat(String(val).replace(/[^\d.]/g, "")) || 0;

  const baseNumeric = parsePrice(previousPrice);
  const currentNumeric = parsePrice(currentPrice);

  const discountAmount = Math.max(0, baseNumeric - currentNumeric);
  const discountPercent =
    baseNumeric > 0 ? Math.round((discountAmount / baseNumeric) * 100) : 0;

  const tax = currentNumeric * 0.13;
  const grandTotal = currentNumeric + tax;
  const grandTotalNumeric = Math.floor(grandTotal);

  const formatCurrency = (num: number) =>
    `NRP ${num.toLocaleString("en-NP", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-primary-700 px-6 py-5 text-white">
        <h3 className="text-lg font-bold tracking-tight">Fare Summary</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <p className="text-white/70 text-xs font-medium tracking-wider">
            Pricing for {groupSize} person{groupSize !== "1" && "s"}
          </p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Actual Package Cost</span>
          <div className="text-right">
            <span className="font-semibold text-gray-700">
              {formatCurrency(baseNumeric)}
            </span>
          </div>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Discount ({discountPercent}%)</span>
            <span className="text-emerald-600 font-bold">
              -{formatCurrency(discountAmount)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Current Package Cost</span>
          <div className="text-right">
            <span className="font-semibold text-gray-700">
              {formatCurrency(currentNumeric)}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Taxes & Fees (13%)</span>
          <span className="font-semibold text-gray-700">
            {formatCurrency(tax)}
          </span>
        </div>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed border-gray-200"></div>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
              Total Amount
            </p>
            <p className="text-2xl font-black text-gray-900 tracking-tight">
              {formatCurrency(grandTotalNumeric)}
            </p>
          </div>
          <div className="text-[10px] text-gray-400 italic mb-1">
            Inc. all taxes
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSummary;
