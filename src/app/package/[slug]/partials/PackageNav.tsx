import React from "react";
import { motion } from "framer-motion";
import { detailsNav } from "@/data/packageDetailsNav";

interface NavProps {
  activeSection: string;
  onScrollToSection: (e: React.MouseEvent, id: string) => void;
}

const PackageNav: React.FC<NavProps> = ({
  activeSection,
  onScrollToSection,
}) => {
  return (
    <div className="sticky top-0 z-20 py-4">
      <nav className="bg-white border border-gray-200 p-2 flex items-center gap-1 overflow-x-auto no-scrollbar rounded-2xl">
        {detailsNav.map((item) => {
          const sectionId = item.href.replace("#", "");
          const isActive = activeSection === sectionId;
          return (
            <button
              key={item.href}
              onClick={(e) => onScrollToSection(e, sectionId)}
              className="relative px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary-500 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span
                className={`relative z-10 ${isActive ? "text-white" : "text-gray-500"}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default PackageNav;
