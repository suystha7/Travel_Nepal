import type { Metadata } from "next";
import "./globals.css";
import { Quicksand, Open_Sans, Outfit } from "next/font/google";

import Providers from "./Provider";
import Header from "../core/common/Header";
import Footer from "../core/common/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Script from "next/script";

const openSans = Open_Sans({
  variable: "--open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  fallback: ["system-ui", "arial"],
});
const quicksand = Quicksand({
  variable: "--quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "arial"],
});
const outfit = Outfit({
  variable: "--outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Travel Nepal Pvt. Ltd.",
  description: "Travel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head>
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${openSans.variable} ${quicksand.variable} ${outfit.variable} antialiased bg-white`}
      >
        <Providers session={session}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="grow">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
