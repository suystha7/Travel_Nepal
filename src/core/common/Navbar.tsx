"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileMenuList } from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = useCallback((href: string) => pathname === href, [pathname]);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const renderNavLink = (href: string, label: string, active: boolean) => (
    <Link
      href={href}
      className={`relative py-1 transition-colors duration-300 ${
        active
          ? "text-primary-500 font-bold"
          : "text-black hover:text-primary-500 group font-medium"
      }`}
    >
      {label}

      {active && (
        <motion.span
          layoutId="navUnderline"
          className="absolute left-0 bottom-0 h-0.5 w-full bg-primary-500"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}

      {!active && (
        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-primary-500 transition-all duration-300 group-hover:w-full" />
      )}
    </Link>
  );

  return (
    <nav className="relative z-50">
      <ul className="hidden md:flex items-center gap-8 px-6 py-4">
        <li>{renderNavLink("/", "Home", isActive("/"))}</li>
        <li>{renderNavLink("/about-us", "About Us", isActive("/about-us"))}</li>
        <li>{renderNavLink("/package", "Packages", isActive("/package"))}</li>
        <li>{renderNavLink("/faq", "FAQs", isActive("/faq"))}</li>
        <li>
          {renderNavLink("/contact-us", "Contact Us", isActive("/contact-us"))}
        </li>
      </ul>

      <button
        onClick={toggleMenu}
        className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
          className="block h-0.5 w-6 bg-white"
        />
        <motion.span
          animate={{ opacity: isOpen ? 0 : 1 }}
          className="block h-0.5 w-6 bg-white"
        />
        <motion.span
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
          className="block h-0.5 w-6 bg-white"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-2xl md:hidden overflow-y-auto"
            >
              <div className="flex justify-end p-6">
                <button
                  onClick={closeMenu}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-900" />
                </button>
              </div>
              <MobileMenuList pathname={pathname} closeMenu={closeMenu} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
