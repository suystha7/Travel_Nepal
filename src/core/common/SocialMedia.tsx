"use client";

import React, { memo } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";

type SocialRecord = {
  platform: string;
  url: string;
};

type Props = {
  socialMedia?: SocialRecord[] | null;
};

const SocialMedia: React.FC<Props> = ({ socialMedia }) => {
  const list = [
    { key: "facebook", icon: <FaFacebookF className="w-5 h-5" /> },
    { key: "instagram", icon: <FaInstagram className="w-5 h-5" /> },
    { key: "youtube", icon: <FaYoutube className="w-5 h-5" /> },
    { key: "twitter", icon: <FaXTwitter className="w-5 h-5" /> },
    { key: "tiktok", icon: <SiTiktok className="w-5 h-5" /> },
  ];

  const data = socialMedia || [];

  const findUrl = (key: string) =>
    data.find((x) => x.platform?.toLowerCase().includes(key))?.url;

  return (
    <div className="flex gap-3 items-center">
      {list.map(({ key, icon }) => {
        const url = findUrl(key);

        return url ? (
          <Link
            key={key}
            href={url}
            target="_blank"
            className="p-2 bg-white text-primary-500 rounded-xl cursor-pointer"
          >
            {icon}
          </Link>
        ) : (
          <div
            key={key}
            className="p-2 bg-white text-primary-500 rounded-xl cursor-pointer"
          >
            {icon}
          </div>
        );
      })}
    </div>
  );
};

export default memo(SocialMedia);
