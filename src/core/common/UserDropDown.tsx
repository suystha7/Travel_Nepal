import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ISessionRoot } from "@/interface/dto/user.session";
import { LogOut, TicketsIcon, UserCircle2 } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface UserDropdownProps {
  sessionData: ISessionRoot;
}

export default function UserDropdown({ sessionData }: UserDropdownProps) {
  const userName = sessionData.user?.name || "User name";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none cursor-pointer ">
        <>
          {sessionData?.user?.image ? (
            <div className="size-9  rounded-full overflow-hidden">
              <Image
                src={sessionData?.user?.image}
                alt="user-image"
                width={400}
                height={400}
                className="size-full object-cover"
              />
            </div>
          ) : (
            <UserCircle2
              size={30}
              className=" text-gray-500 typography-paragraph-small"
            />
          )}
        </>
        <span className="typography-paragraph-small capitalize text-gray-600">
          {userName}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 mt-6" align="center">
        <DropdownMenuItem asChild>
          <a
            className="typography-large-body font-light text-grey-700 hover:text-grey-600 cursor-pointer"
            href="/user/ticket"
          >
            <TicketsIcon /> My Tickets
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          className="typography-large-body font-light text-grey-700 focus:text-primary-600 cursor-pointer"
        >
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
