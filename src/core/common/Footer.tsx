import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assest/logo/travel-logo1.webp";
import { getOrgData } from "@/core/hooks/useGetOrgData";
import SocialMedia from "./SocialMedia";
import { getCategories } from "../hooks/useGetCategories";
import { getHomeData } from "@/app/(home)/hooks/useGetHomeData";
import { IPackageRecord } from "@/app/package/interface/IPackageData.interface";
import RichText from "@/utils/richText";
import NewsLetter from "./NewsLetter";
import { ArrowUpRight } from "lucide-react";
import { getBlogData } from "@/app/blog/hooks/useGetBlogData";

const footerBottom = [
  { name: "Why Travel Nepal", link: "/about-us" },
  { name: "Our Blogs", link: "/blog" },
  // { name: "Reservation", link: "/reservation" },
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
      <footer className="bg-linear-to-br from-primary-500 to-primary-500 text-gray-400 pt-10 pb-8 overflow-hidden">
        <div className="px-20">
          <div className="flex flex-col items-center lg:flex-row justify-between gap-10 pb-6 border-b border-white">
            <div className="flex flex-wrap items-center justify-between space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <Link href="/" className="inline-block group shrink-0">
                  <Image
                    src={logo}
                    alt="Travel Nepal"
                    className="w-48 h-auto transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </Link>

                <div className="max-w- md:border-l md:border-white md:pl-8">
                  <RichText
                    content={orgData?.data?.disclaimer ?? ""}
                    className="text-lg leading-relaxed text-white/90 font-medium line-clamp-3"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 ">
                  {footerBottom.map((item) => (
                    <Link
                      key={item.name}
                      href={item.link}
                      className="text-xs font-semibold uppercase tracking-wider text-white hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="flex">
                  <SocialMedia socialMedia={socialMedia} />
                </div>
              </div>
            </div>

            <div className="w-full lg:max-w-xl">
              <div>
                <h4 className="relative text-white font-bold mb-2 uppercase text-xl tracking-widest">
                  Stay Inspired
                  <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </h4>
                <p className="text-sm text-white mt-4">
                  Join our community for exclusive travel insights and secret
                  deals.
                </p>
                <NewsLetter />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-10">
            <div>
              <p className="text-white font-bold text-base uppercase mb-6 relative inline-block group cursor-default">
                Activities
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </p>
              <ul className="space-y-4">
                {packageTypeRecords.slice(0, 5).map((item: any) => (
                  <li key={item?.slug}>
                    <Link
                      href={`/package?trip_type=${item?.slug}`}
                      className="text-white hover:text-white transition-colors text-sm"
                    >
                      {item?.name}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white font-bold text-base uppercase mb-6 relative inline-block group cursor-default">
                Latest Blogs
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </p>
              <ul className="space-y-4">
                {blogRecord.slice(0, 5).map((item: any) => (
                  <li key={item?.id}>
                    <Link
                      href={`/blog/${item?.blog_slug}`}
                      className="text-white hover:text-white transition-colors flex items-center group text-sm"
                    >
                      {item?.title}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white font-bold text-base uppercase mb-6 relative inline-block group cursor-default">
                Featured Packages
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </p>
              <ul className="space-y-4">
                {topDealRecords.slice(0, 5).map((item: any) => (
                  <li key={item?.slug}>
                    <Link
                      href={`/package/${item?.slug}`}
                      className="text-white hover:text-white transition-colors text-sm line-clamp-2"
                    >
                      {item?.name}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white font-bold text-base uppercase mb-6 relative inline-block group cursor-default">
                Top Deals
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </p>
              <ul className="space-y-4">
                {topTourRecords.slice(0, 5).map((item: IPackageRecord) => (
                  <li key={item?.slug}>
                    <Link
                      href={`/package/${item?.slug}`}
                      className="text-white hover:text-white transition-colors text-sm line-clamp-2"
                    >
                      {item?.name}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-5 border-t border-white flex flex-col gap-10">
            <div className="flex justify-center items-center gap-8">
              <div className="space-y-2">
                <p className="text-sm font-medium text-white">
                  © Copyright Travel Nepal Pvt. Ltd. {new Date().getFullYear()}{" "}
                  | All rights reserved
                </p>
              </div>
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
