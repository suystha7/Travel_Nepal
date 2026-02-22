"use client";
import Link from "next/link";
import { Fragment, JSX } from "react";

interface BreadcrumbItem {
  name: string;
  link?: string;
  isHome?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string | JSX.Element;
  homeIcon?: JSX.Element;
  className?: string;
}

function Breadcrumb({
  items,
  separator = "/",
  homeIcon,
  className = "",
}: BreadcrumbProps) {
  return (
    <nav
      className={`flex items-start pt-3 mb-3  ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center space-x-1 font-light text-[14px]">
        {items?.map((item: BreadcrumbItem, index: number) => {
          const isLast = index === items.length - 1;

          const truncationClasses =
            "max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap";

          return (
            <Fragment key={index}>
              <li aria-current={isLast ? "page" : undefined}>
                {item.link && !isLast ? (
                  <Link
                    href={item.link}
                    className={`text-[#757575] transition-colors duration-200 capitalize ${truncationClasses}`}
                  >
                    {item.isHome && homeIcon ? homeIcon : item.name}
                  </Link>
                ) : isLast ? (
                  <span className="text-primary-500 capitalize">
                    {item.name}
                  </span>
                ) : (
                  <span
                    className={`text-primary-500 capitalize ${truncationClasses}`}
                  >
                    {item.name}
                  </span>
                )}
              </li>
              {!isLast && (
                <li className="text-black-200 select-none" aria-hidden="true">
                  {separator}
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
