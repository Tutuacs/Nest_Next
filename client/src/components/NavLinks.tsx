// NavLinks.tsx
"use client";

import { ROLE } from "@/common/role.enums";
import Link from "next/link";
import ButtonLogout from "./ButtonLogout";
import { useSession } from "next-auth/react";

export default function NavLinks() {
  const { data: session, status } = useSession();

  if (session?.profile?.role === ROLE.ADMIN) {
    return (
      <main>
        <div className="flex p-4 flex-row justify-between items-center">
          <div className="flex space-x-4">
            <Link className="p-2" href="/home">
              Home
            </Link>
            <Link className="p-2" href="/">
              Users
            </Link>
            <Link className="p-2" href="/">
              AdminName {session?.profile?.name}
            </Link>
          </div>
          <div className="flex space-x-4">
            <ButtonLogout />
          </div>
        </div>
      </main>
    );
  } else if (session?.profile?.role === ROLE.USER) {
    return (
      <main>
        <div className="flex p-4 flex-row justify-between items-center">
          <div className="flex space-x-4">
            <Link className="p-2" href="/home">
              Home
            </Link>
            <Link className="p-2" href="/">
              {session?.profile?.name}
            </Link>
          </div>
          <div className="flex space-x-4">
            <ButtonLogout />
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <div className="flex p-4 flex-row justify-between items-center">
          <div className="flex space-x-4">
            <Link className="p-2" href="/">
              Home
            </Link>
            <Link className="p-2 text-gray-800" href="/">
              Not logged
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link className="p-2" href="/login">
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
