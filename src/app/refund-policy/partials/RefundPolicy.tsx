"use client";
import React from "react";
import { IPolicyRecord } from "../interface/IRefundPolicy";
import RichText from "@/utils/richText";

const Refund: React.FC<{ data: IPolicyRecord[] }> = ({ data }) => {
  const title = data[0]?.title ?? "Refund Policy";
  const titleDescription =
    "We are committed to protecting your refund. This page describes in simple terms our practices and policies to ensure you book with confidence.";
  const description = data[0]?.description ?? "";

  return (
    <div className="my-16 padding-x">
      <div>
        <div className="mb-6">
          <h2 className="mb-4 typography-h5-regular font-bold text-grey-800 text-center">
            {title}
          </h2>
          <p className="text-center text-grey-800 mb-10">{titleDescription}</p>

          <RichText
            content={description || ""}
            className="text-grey-500 mb-4 max-w-7xl mx-auto leading-relaxed prose [&>b]:text-red-500 [&>strong]:text-red-500 [&>i]:text-red-500 [&>em]:text-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Refund;
