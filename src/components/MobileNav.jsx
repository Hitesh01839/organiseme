"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";

import { useSession, signOut } from "next-auth/react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const { data: session } = useSession();

  useEffect(() => {
    if (menuRef.current) {
      gsap.set(menuRef.current, { x: "-100%" });
    }
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      if (open) {
        gsap.to(menuRef.current, { x: 0, duration: 0.6, ease: "power3.out" });
      } else {
        gsap.to(menuRef.current, {
          x: "-100%",
          duration: 0.6,
          ease: "power3.in",
        });
      }
    }
  }, [open]);

  return (
    <nav>
      <div className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-[#0a0a0a]/20 backdrop-blur-lg text-white z-50">
        <div className="left flex items-center space-x-3">
          <Image
            className="w-auto h-auto"
            src="/logo.png"
            alt="logo"
            width={30}
            height={10}
          ></Image>
          <p className="text-xl">OrganiseMe</p>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="relative w-8 h-8 flex items-center justify-center"
        >
          <span
            className={`absolute transition-all duration-300 ${
              open ? "opacity-0 scale-50" : "opacity-100 scale-100"
            }`}
          >
            ☰
          </span>
          <span
            className={`absolute font-semibold transition-all duration-300 ${
              open ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            ✕
          </span>
        </button>
      </div>

      <div
        ref={menuRef}
        className="fixed top-0 left-0 h-screen w-3/4 bg-[#0a0a0a]/60 backdrop-blur-xl text-white z-40 mt-10 p-8 flex flex-col space-y-6"
      >
        <Link href="/" className="text-xl hover:text-white/70 transition">
          Home
        </Link>
        {session?.user ? (
          <div className="flex flex-col space-y-2">
            <span>Hi, {session?.user.email}</span>
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="text-xl hover:text-white/70 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-xl hover:text-white/70 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
