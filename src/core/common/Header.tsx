import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import logo from "@/assest/logo/travel-logo.webp";
import UserSection from "./UserSection";
import { getPackageData } from "@/app/package/[slug]/hooks/useGetPackageData";
import { getCategories } from "../hooks/useGetCategories";
import { buildDynamicMenu } from "@/constants/dynamicMenus";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  try {
    const { packageType } = await getCategories();
    const packageData = await getPackageData();
    const dynamicMenu = buildDynamicMenu(
      packageType?.data?.records || [],
      packageData?.data?.records || []
    );

    return (
      <HeaderClient menu={dynamicMenu}>
        <header className="sticky z-50 top-0 left-0 w-full py-2 bg-white border-b">
          <div className="padding-x flex items-center justify-between w-full h-16">
            <div className="shrink-0">
              <Link
                href="/"
                aria-label="Homepage"
                className="flex items-center group"
              >
                <Image src={logo} alt="logo" className="w-36" priority />
              </Link>
            </div>

            <nav className="hidden lg:flex flex-1 justify-center mx-8">
              <div className="px-6 py-2">
                <Navbar menu={dynamicMenu} />
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
  } catch (error) {
    console.error(error);
    return (
      <div className="h-20 flex items-center justify-center bg-rose-700 text-white text-[10px] font-black uppercase tracking-[0.2em]">
        System Navigation Error
      </div>
    );
  }
};

export default Header;