import { safeFetch } from "@/utils/safeFetch";

export const getRefundPolicyData = async () => {
  const refundPolicyData = await safeFetch("/policy?policy_type=refundpolicy");
  return { refundPolicyData };
};
