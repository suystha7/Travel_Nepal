import Title from "@/core/common/Title";
import Link from "next/link";
import React from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

interface FollowUsProps {
  socialMedia: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
}

const FollowUs = ({ socialMedia }: FollowUsProps) => {
  const medias = [
    {
      name: "Facebook",
      url: socialMedia?.facebook || "#",
      logo: Facebook,
    },
    {
      name: "Instagram",
      url: socialMedia?.instagram || "#",
      logo: Instagram,
    },
    {
      name: "Youtube",
      url: socialMedia?.youtube || "#",
      logo: Youtube,
    },
    {
      name: "Tiktok",
      url: socialMedia?.tiktok || "#",
      logo: FaTiktok,
    },
  ];
  return (
    <div className="py-16">
      <Title
        underline={false}
        primaryText="Follow Our"
        highlightText="Journey"
      />
      <p className="text-grey-400 text-center py-2">
        Stay connected and get travel inspiration every day!{" "}
      </p>
      <div className="flex flex-row justify-center gap-6 my-6">
        {medias.map((media) => (
          <div key={media.name} className="flex flex-row my-4">
            <Link
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-3 bg-white shadow-md"
            >
              <media.logo className="w-6 h-6 text-primary-500" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowUs;
