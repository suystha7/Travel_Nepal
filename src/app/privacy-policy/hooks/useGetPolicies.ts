import { safeFetch } from "@/utils/safeFetch";

export const getPrivacyPolicyData = async () => {
  const privacyPolicyData = await safeFetch("/policy?policy_type=privacy");

  // const privacyPolicyDetailsData = await getStaticData(`${endpoints.PRIVACY_POLICY.DETAILS}${slug}/`);
  // return { privacyPolicyData, privacyPolicyDetailsData };
  return { privacyPolicyData };
};
