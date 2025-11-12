"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const DesktopNav = () => {
  const { data: session } = useSession(); // to get the user session state

  return (
    <nav className="text-white h-[10vh] w-full flex justify-between items-center px-18 max-md:p-10">
      <div className="flex items-center space-x-3">
        <Image
          src="/logo.png"
          alt="logo"
          width={30}
          height={10}
          className="w-auto h-auto"
        />
        <p className="text-xl font-medium">OrganiseMe</p>
      </div>

      {session?.user ? (
        <div className="flex items-center space-x-5">
          <span className="text-xl max-xl:text-lg">
            Hi, {session.user.email}
          </span>
          <span>|</span>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="hover:text-white/70 text-xl cursor-pointer transition-all ease-in-out duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <ul className="flex space-x-5 text-xl">
          <li className="hover:text-white/70 transition-all ease-in-out duration-200 cursor-pointer">
            <Link href="/login">Login</Link>
          </li>
          <li className="hover:text-white/70 transition-all ease-in-out duration-200 cursor-pointer">
            <Link href="/signup">SignUp</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default DesktopNav;
