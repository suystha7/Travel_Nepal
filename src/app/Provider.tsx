"use client";

import { ProgressProvider } from "@bprogress/next/app";
import React from "react";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { ModalProvider } from "@/core/context/ModalContext";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import ScrollToTop from "@/core/common/ScrollToTop";

const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) => {
  return (
    <SessionProvider session={session}>
      <ProgressProvider
        height="4px"
        color="#1d5e41"
        options={{ showSpinner: false }}
        shallowRouting
      >
        <Provider store={store}>
          <ModalProvider>
            <ToastContainer
              stacked
              autoClose={3000}
              newestOnTop
              position="top-right"
            />
            {children}
            <ScrollToTop />
          </ModalProvider>
        </Provider>
      </ProgressProvider>
    </SessionProvider>
  );
};

export default Providers;
