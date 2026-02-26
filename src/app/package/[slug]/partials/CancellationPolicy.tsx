"use client";

import React from "react";
import { ShieldAlert, CreditCard, ScrollText, ArrowRight } from "lucide-react";
import RichText from "@/utils/richText";

interface IProps {
  paymentPolicy?: string;
  cancellationPolicy?: string;
  termsAndConditions?: string;
}

const CancellationPolicy: React.FC<IProps> = ({
  paymentPolicy,
  cancellationPolicy,
  termsAndConditions,
}) => {
  const cancellationSteps = [
    { range: "15–30 Days", fee: "30%", color: "border-orange-200" },
    { range: "10–15 Days", fee: "75%", color: "border-rose-200" },
    { range: "Under 10 Days", fee: "100%", color: "border-rose-500" },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-2" id="policy-triptych">
      <div className="">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">
          Booking Terms & Policies
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 rounded-[3rem] overflow-hidden mt-2">
        <div className="p-10 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white hover:bg-gray-50/50 transition-colors group">
          <div className="flex items-center justify-between mb-12">
            <span className="text-6xl font-black text-gray-100 group-hover:text-rose-100 transition-colors">
              01
            </span>
            <ShieldAlert size={32} className="text-rose-500" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-widest text-gray-900 mb-8">
            Cancellation
          </h3>

          <div className="space-y-3 mb-10">
            {cancellationSteps.map((step, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-4 border-l-4 bg-white shadow-sm ${step.color}`}
              >
                <span className="text-xs font-bold text-gray-500 uppercase">
                  {step.range}
                </span>
                <span className="text-lg font-black text-gray-900">
                  {step.fee}
                </span>
              </div>
            ))}
          </div>

          <RichText
            content={cancellationPolicy || ""}
            className="prose prose-sm prose-p:text-gray-500 prose-li:text-gray-500 prose-strong:text-gray-900"
          />
        </div>

        <div className="p-10 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50/30 hover:bg-gray-50/80 transition-colors group">
          <div className="flex items-center justify-between mb-12">
            <span className="text-6xl font-black text-gray-200 group-hover:text-primary-100 transition-colors">
              02
            </span>
            <CreditCard size={32} className="text-primary-600" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-widest text-gray-900 mb-8">
            Settlement
          </h3>

          <div className="space-y-8 mb-10">
            <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-primary-200">
              <p className="text-xs font-black text-primary-600 uppercase mb-1">
                Phase 01
              </p>
              <p className="text-lg font-bold text-gray-900">
                75% Advance Payment
              </p>
              <p className="text-sm text-gray-500 italic">
                45–30 Days before arrival
              </p>
            </div>
            <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-primary-600">
              <p className="text-xs font-black text-primary-600 uppercase mb-1">
                Phase 02
              </p>
              <p className="text-lg font-bold text-gray-900">
                Full 100% Balance
              </p>
              <p className="text-sm text-gray-500 italic">
                Within 30 Days of arrival
              </p>
            </div>
          </div>

          <RichText
            content={paymentPolicy || ""}
            className="prose prose-sm prose-p:text-gray-500 prose-li:text-gray-500 prose-strong:text-gray-900"
          />
        </div>

        <div className="p-10 bg-white hover:bg-gray-50/50 transition-colors group">
          <div className="flex items-center justify-between mb-12">
            <span className="text-6xl font-black text-gray-100 group-hover:text-gray-200 transition-colors">
              03
            </span>
            <ScrollText size={32} className="text-gray-900" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-widest text-gray-900 mb-8">
            Standard Terms
          </h3>

          <div className="max-h-100 overflow-y-auto pr-4 custom-scrollbar">
            <RichText
              content={termsAndConditions || ""}
              className="prose prose-sm prose-p:text-gray-500 prose-li:text-gray-500 prose-strong:text-gray-900"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CancellationPolicy;
