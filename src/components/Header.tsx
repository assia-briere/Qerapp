"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isBlogs = pathname.startsWith("/blogs");
  const isTeam = pathname.startsWith("/equipe"); // ← adapte si ton chemin diffère

  const baseLink =
    "text-base font-medium transition hover:text-[#1565c0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1565c0]";
  const activeLink = "text-[#1565c0]";

  return (
    <header className="w-full border-b border-gray-100 text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="Accueil">
            <Image
              src="/images/logo-qera.jpeg"
              alt="Qera"
              width={140}
              height={36}
              className="h-15 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Navigation principale">
            <Link
              href="/"
              className="rounded-full bg-[#1565c0] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1565c0]"
              aria-current={isHome ? "page" : undefined}
            >
              L’application
            </Link>

            <Link
              href="/blogs"
              className={`${baseLink} ${isBlogs ? activeLink : ""}`}
              aria-current={isBlogs ? "page" : undefined}
            >
              Qera blogs
            </Link>

            <Link
              href="/equipe"
              className={`${baseLink} ${isTeam ? activeLink : ""}`}
              aria-current={isTeam ? "page" : undefined}
            >
              Équipe Qera
            </Link>
          </nav>

          {/* Right side: social + burger */}
          <div className="flex items-center gap-2">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/qerapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid size-9 place-items-center rounded-full bg-gray-100 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1565c0]"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-black">
                <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2zm.02 4H1V21h4V7.5zm7.5 0H9v13.5h4V14c0-2.2 3-2.4 3 0v7.5h4V13c0-4.7-5-4.5-6.5-2.2V7.5z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/qera_app?igsh=aHVvb3IyanIzdDNw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid size-9 place-items-center rounded-full bg-gray-100 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1565c0]"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-black">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7zM18 6.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" />
              </svg>
            </a>

            {/* Burger */}
            <button
              aria-label="Ouvrir le menu"
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="md:hidden ml-1 grid size-9 place-items-center rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1565c0]"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" className="text-black">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {open && (
          <div id="mobile-menu" className="md:hidden pb-4">
            <nav className="flex flex-col gap-2" aria-label="Navigation mobile">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="inline-block w-max rounded-full bg-[#1565c0] px-5 py-2 text-sm font-semibold text-white"
                aria-current={isHome ? "page" : undefined}
              >
                L’application
              </Link>
              <Link
                href="/blogs"
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium hover:text-[#1565c0]"
                aria-current={isBlogs ? "page" : undefined}
              >
                Qera blogs
              </Link>
              <Link
                href="/equipe"
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium hover:text-[#1565c0]"
                aria-current={isTeam ? "page" : undefined}
              >
                Équipe Qera
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
