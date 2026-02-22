import React from "react";
import ContactHero from "./partials/ContactHero";
import SendUsMessage from "./partials/SendUsMessage";
import FollowUs from "./partials/FollowUs";
import { getContactUsData } from "./hooks/useGetContactUsData";
import { getOrgData } from "../../core/hooks/useGetOrgData";
import { endpoints } from "@/core/api/endpoints";
import { getStaticData } from "@/core/api/fetch";
import { ISeoResponse } from "@/interface/seoResponse";
import { createMetadata } from "@/utils/createMetadata";

export async function generateMetadata() {
  try {
    const response = await getStaticData<ISeoResponse>(
      endpoints.SEO.CONTACT_US
    );
    const seoRecord = response?.data?.records?.[0] ?? null;
    return createMetadata(seoRecord);
  } catch (error) {
    return createMetadata(null);
  }
}

const Page = async () => {
  try {
    const [contactResult, orgResult] = await Promise.allSettled([
      getContactUsData(),
      getOrgData(),
    ]);

    const contactUsData =
      contactResult.status === "fulfilled"
        ? contactResult.value.contactUsData
        : null;
    const socialMediaData =
      orgResult.status === "fulfilled" ? orgResult.value.socialMediaData : null;

    const contactHero = contactUsData?.data?.records ?? [];
    const socialMedia = socialMediaData?.data?.records?.[0] ?? null;

    return (
      <div>
        <ContactHero contactHero={contactHero} />
        <div className="padding-x my-4 flex flex-col md:flex-row items-center md:justify-between gap-32">
          <div className="w-1/2 lg:m-10">
            <SendUsMessage />
          </div>

          <div className="w-1/2 lg:m-10">
            <div className="w-full bg-slate-50 rounded-3xl p-6 md:p-10 border border-slate-200/60 flex flex-col justify-center">
              <div className="mb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Stay Connected
                </p>
              </div>
              <FollowUs socialMedia={socialMedia} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading contact us page data:", error);
    return (
      <div className="min-h-[60vh] flex items-center justify-center typography-h3-regular text-primary-500 border-t border-b">
        Error loading contact us page data!!
      </div>
    );
  }
};

export default Page;
