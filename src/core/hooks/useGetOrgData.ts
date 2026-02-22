import { endpoints } from "@/core/api/endpoints";
import { safeFetch } from "@/utils/safeFetch";

export const getOrgData = async () => {
  const orgData = await safeFetch(endpoints.ORGANIZATION.LIST);
  const socialMediaData = await safeFetch(endpoints.ORGANIZATION.SOCIAL_MEDIA);
  return { orgData, socialMediaData };
};
