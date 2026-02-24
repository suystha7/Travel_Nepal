'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './Navbar';
import logo from '@/assest/logo/travel-logo.webp';
import UserSection from './UserSection';
import HeaderClient from './HeaderClient';

const Header = () => {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY.current) {
      setShow(false); 
    } else {
      setShow(true); 
    }
    lastScrollY.current = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderClient>
      <header
        className={`sticky top-0 left-0 w-full py-2 bg-white border-b transition-transform duration-300 z-50 ${
          show ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="padding-x flex items-center justify-between w-full h-16">
          <div className="shrink-0">
            <Link href="/" aria-label="Homepage" className="flex items-center group">
              <Image src={logo} alt="logo" className="w-36" priority />
            </Link>
          </div>

          <nav className="hidden lg:flex flex-1 justify-center mx-8">
            <div className="px-6 py-2">
              <Navbar />
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5">
              <UserSection />
            </div>
            <div className="w-10 lg:hidden" />
          </div>
        </div>
      </header>
    </HeaderClient>
  );
};

export default Header;