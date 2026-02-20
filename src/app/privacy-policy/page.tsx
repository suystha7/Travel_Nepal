import { getPrivacyPolicyData } from "./hooks/useGetPolicies";
import { endpoints } from "@/core/api/endpoints";
import { getStaticData } from "@/core/api/fetch";
import { ISeoResponse } from "@/interface/seoResponse";
import { createMetadata } from "@/utils/createMetadata";
import Privacy from "./partials/PrivacyPolicy";

export async function generateMetadata() {
  const { data } = await getStaticData<ISeoResponse>(
    endpoints.SEO.PRIVACY_POLICY
  );
  const seoRecord = data?.records?.[0] ?? null;
  const meta = createMetadata(seoRecord);
  return meta;
}

const Page = async () => {
  const { privacyPolicyData } = await getPrivacyPolicyData();
  return (
    <div>
      <Privacy data={privacyPolicyData?.data?.records} />
    </div>
  );
};

export default Page;
