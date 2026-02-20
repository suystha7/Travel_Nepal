import { endpoints } from "@/core/api/endpoints";
import { safeFetch } from "@/utils/safeFetch";

export const getContactUsData = async () => {
  const contactUsData = await safeFetch(endpoints.BREADCRUMB.CONTACT_US);
  const faqData = await safeFetch(endpoints.FAQ);
  return { contactUsData, faqData };
};
