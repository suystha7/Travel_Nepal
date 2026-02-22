import React from "react";
import { getRefundPolicyData } from "./hooks/useGetPolicies";
import { endpoints } from "@/core/api/endpoints";
import { getStaticData } from "@/core/api/fetch";
import { ISeoResponse } from "@/interface/seoResponse";
import { createMetadata } from "@/utils/createMetadata";
import Refund from "./partials/RefundPolicy";

export async function generateMetadata() {
  const { data } = await getStaticData<ISeoResponse>(
    endpoints.SEO.REFUND_POLICY
  );
  const seoRecord = data?.records?.[0] ?? null;
  const meta = createMetadata(seoRecord);
  return meta;
}

const Page = async () => {
  const { refundPolicyData } = await getRefundPolicyData();
  return (
    <div>
      <Refund data={refundPolicyData?.data?.records} />
    </div>
  );
};

export default Page;
