import { getContactUsData } from "../contact-us/hooks/useGetContactUsData";
import FAQs from "./partials/FAQs";

const Page = async () => {
  try {
    const contactData = await getContactUsData().catch((err) => {
      console.error("Fetch failed:", err);
      return null;
    });

    const faqs = contactData?.faqData?.data?.records ?? [];

    return (
      <div>
        <FAQs faqData={faqs} />
      </div>
    );
  } catch (error) {
    console.error("Error loading FAQ page data:", error);
    return (
      <div className="min-h-[60vh] flex items-center justify-center typography-h3-regular text-primary-500 border-t border-b">
        Error loading FAQ page data!!
      </div>
    );
  }
};

export default Page;
