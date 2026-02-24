"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { MobileMenuList } from "./MobileMenu";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assest/logo/travel-logo.webp";

interface HeaderClientProps {
  children: React.ReactNode;
}

const HeaderClient = ({ children }: HeaderClientProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div className="relative">
        {children}
        <button
          onClick={toggleMenu}
          className={`lg:hidden fixed top-5 right-4 z-60 p-2 rounded-full transition-all duration-300 ${
            isOpen || isScrolled 
              ? "bg-white text-primary-500 shadow-sm" 
              : "bg-transparent text-primary-500"
          }`}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-55 bg-black/50 transition-opacity lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />

      <aside
        className={`fixed top-0 left-0 z-56 h-full w-full bg-white shadow-md transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center h-20 px-6 border-b border-gray-100">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center"
            >
              <Image 
                src={logo} 
                alt="Logo" 
                className="w-32 h-auto object-contain" 
                priority 
              />
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <MobileMenuList
              pathname={pathname}
              closeMenu={closeMenu}
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default HeaderClient;