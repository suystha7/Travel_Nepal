"use client";

import { useScrollDirection } from "../hooks/useScrollDirection";

export default function HeaderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const isVisible = useScrollDirection();

  return (
    <header
      className={`sticky top-0 z-999 w-full transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {children}
    </header>
  );
}
