"use client";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface IMobileMenuListProps {
  menu: {
    [key: string]: any;
  };
  pathname: string;
  closeMenu: () => void;
  level?: number;
}

export const MobileMenuList = ({
  menu,
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
      {/* DYNAMIC MENU */}
      {Object.entries(menu).map(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length === 0) return null;
          return (
            <li key={key}>
              <button
                onClick={() => toggleGroup(key)}
                className="flex items-center justify-between w-full px-4 py-3 text-grey-800 hover:bg-grey-50"
                style={{ paddingLeft: `${level * 16 + 16}px` }}
              >
                <span>{key.replace("_TOURS", " Tours")}</span>
                <ChevronDownIcon
                  className={`transition-transform ${
                    openGroups[key] ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openGroups[key] && (
                <ul className="ml-2 border-l">
                  {value.map((item) => renderLink(item.name, item.url))}
                </ul>
              )}
            </li>
          );
        }

        const open = openGroups[key];
        const childrenKeys = Object.keys(value);
        if (!childrenKeys.length) return null;

        return (
          <li key={key}>
            <button
              onClick={() => toggleGroup(key)}
              className="flex items-center justify-between w-full px-4 py-3 text-grey-800 hover:bg-grey-50"
              style={{ paddingLeft: `${level * 16 + 16}px` }}
            >
              <span>{key.replace("_TOURS", " Tours")}</span>
              <ChevronDownIcon
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div className="ml-2 border-l">
                <MobileMenuList
                  menu={value}
                  pathname={pathname}
                  closeMenu={closeMenu}
                  level={level + 1}
                />
              </div>
            )}
          </li>
        );
      })}

      {level === 0 && (
        <>
          {renderLink("Packages", "/package")}
          {renderLink("About Us", "/about-us")}
          {renderLink("Blog", "/blog")}
          {renderLink("Contact Us", "/contact-us")}
        </>
      )}
    </ul>
  );
};
