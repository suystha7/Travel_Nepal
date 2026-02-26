import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assest/logo/travel-logo1.webp";
import { getOrgData } from "@/core/hooks/useGetOrgData";
import SocialMedia from "./SocialMedia";
import { getCategories } from "../hooks/useGetCategories";
import { getHomeData } from "@/app/(home)/hooks/useGetHomeData";
import RichText from "@/utils/richText";
import NewsLetter from "./NewsLetter";
import { ArrowUpRight } from "lucide-react";
import { getBlogData } from "@/app/blog/hooks/useGetBlogData";

const footerBottom = [
  { name: "Why Travel Nepal", link: "/about-us" },
  { name: "Our Blogs", link: "/blog" },
  { name: "Refund Policy", link: "/refund-policy" },
  { name: "Privacy Policy", link: "/privacy-policy" },
];

const Footer = async () => {
  try {
    const results = await Promise.allSettled([
      getCategories(),
      getHomeData(),
      getOrgData(),
      getBlogData(),
    ]);

    const categories =
      results[0].status === "fulfilled" ? results[0].value : null;
    const homeData =
      results[1].status === "fulfilled" ? results[1].value : null;
    const orgResponse =
      results[2].status === "fulfilled" ? results[2].value : null;
    const blogResponse =
      results[3].status === "fulfilled" ? results[3].value : null;

    const packageTypeRecords = categories?.packageType?.data?.records ?? [];
    const blogRecord = blogResponse?.blogs?.data?.records ?? [];
    const topTourRecords = homeData?.isTopTour?.data?.records ?? [];
    const topDealRecords = homeData?.isTopDeal?.data?.records ?? [];
    const orgData = orgResponse?.orgData ?? null;
    const socialMedia = orgResponse?.socialMediaData?.data?.records ?? [];

    return (
      <footer className="bg-linear-to-br from-primary-500 to-primary-500 text-gray-400 pt-12 pb-8 overflow-hidden">
        <div className="px-4 sm:px-8 lg:px-12 xl:px-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pb-10 border-b border-white/20">
            <div className="flex flex-col gap-4 w-full lg:max-w-3xl">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <Link href="/" className="inline-block group shrink-0">
                  <Image
                    src={logo}
                    alt="Travel Nepal"
                    className="w-60 md:w-48 h-auto transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </Link>

                <div className="md:border-l md:border-white/30 md:pl-8 text-center md:text-left">
                  <RichText
                    content={orgData?.data?.disclaimer ?? ""}
                    className="text-base md:text-lg leading-relaxed text-white/90 font-medium line-clamp-4"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6 items-center md:items-start">
                <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3">
                  {footerBottom.map((item) => (
                    <Link
                      key={item.name}
                      href={item.link}
                      className="text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:opacity-80 transition-all"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex justify-center md:justify-start">
                  <SocialMedia socialMedia={socialMedia} />
                </div>
              </div>
            </div>

            <div className="w-full lg:max-w-md">
              <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                <h4 className="relative text-white font-bold mb-2 uppercase text-lg md:text-xl tracking-widest inline-block group">
                  Stay Inspired
                  <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </h4>
                <p className="text-sm text-white/80 mt-4 mb-6">
                  Join our community for exclusive travel insights and secret
                  deals.
                </p>
                <NewsLetter />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 py-12">
            {[
              {
                title: "Activities",
                data: packageTypeRecords,
                path: (item: any) => `/package?trip_type=${item?.slug}`,
              },
              {
                title: "Latest Blogs",
                data: blogRecord,
                path: (item: any) => `/blog/${item?.blog_slug}`,
              },
              {
                title: "Featured Packages",
                data: topDealRecords,
                path: (item: any) => `/package/${item?.slug}`,
              },
              {
                title: "Top Deals",
                data: topTourRecords,
                path: (item: any) => `/package/${item?.slug}`,
              },
            ].map((section, idx) => (
              <div key={idx}>
                <p className="text-white font-bold text-base uppercase mb-6 relative inline-block group cursor-default">
                  {section.title}
                  <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </p>
                <ul className="space-y-4">
                  {section.data.slice(0, 5).map((item: any) => (
                    <li key={item?.id || item?.slug}>
                      <Link
                        href={section.path(item)}
                        className="text-white/90 hover:text-white transition-all text-sm flex items-center gap-1 group/link w-fit"
                      >
                        <span className="line-clamp-1">
                          {item?.name || item?.title}
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="shrink-0 opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <p className="text-xs md:text-sm font-medium text-white/80">
                © Copyright Travel Nepal Pvt. Ltd. {new Date().getFullYear()} |
                All rights reser ved
              </p>
              <p className="text-[10px] text-white/40 uppercase tracking-tighter">
                Adventure Awaits
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error("Critical Footer Error:", error);
    return (
      <footer className="bg-primary-500 py-10 text-center text-white">
        © Travel Nepal
      </footer>
    );
  }
};

export default Footer;
