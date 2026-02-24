"use client";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface IMobileMenuListProps {
  pathname: string;
  closeMenu: () => void;
  level?: number;
}

export const MobileMenuList = ({
  pathname,
  closeMenu,
  level = 0,
}: IMobileMenuListProps) => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const isActive = (url: string) => pathname === url;

  const toggleGroup = (name: string) =>
    setOpenGroups((prev) => ({ ...prev, [name]: !prev[name] }));

  const renderLink = (name: string, url: string) => (
    <li key={url}>
      <Link
        href={url}
        onClick={closeMenu}
        className={`block px-4 py-3 border-l-4 transition-colors ${
          isActive(url)
            ? "text-primary-500 border-primary-500 bg-primary-50"
            : "text-grey-700 border-transparent hover:bg-grey-50 hover:border-primary-300"
        }`}
        style={{ paddingLeft: `${level * 16 + 16}px` }}
      >
        {name}
      </Link>
    </li>
  );

  return (
    <ul className="flex flex-col space-y-1 mb-2 overflow-y-auto overscroll-contain max-h-screen">
      {level === 0 && <>{renderLink("Home", "/")}</>}

      {level === 0 && (
        <>
          {renderLink("Packages", "/package")}
          {renderLink("About Us", "/about-us")}
          {renderLink("FAQs", "/faq")}
          {renderLink("Contact Us", "/contact-us")}
        </>
      )}
    </ul>
  );
};
