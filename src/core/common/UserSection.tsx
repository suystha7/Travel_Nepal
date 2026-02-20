"use client";

import React from "react";
import { useModal } from "../context/ModalContext";
import UserDropdown from "./UserDropDown";
import { useSession } from "next-auth/react";
import { ISessionRoot } from "@/interface/dto/user.session";

const UserSection = () => {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const { openModal } = useModal();

  return (
    <div className="ml-auto flex items-center">
      <div className="shrink-0 flex flex-col md:flex-row items-center space-x-0 md:space-x-6 space-y-2 md:space-y-0">
        {isLoggedIn ? (
          <>
            <UserDropdown sessionData={session as ISessionRoot} />
          </>
        ) : (
          <>
            <div className="flex items-center space-x-6 ">
              <button
                className="typography-sub-h3-regular px-5 py-2 rounded-xl bg-primary-500 text-white cursor-pointer"
                onClick={() => openModal("login")}
              >
                <div className="font-semibold">Log in</div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserSection;
