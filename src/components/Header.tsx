"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isPolicy = pathname.startsWith("/politique-de-confidentialite");
  const isContact = pathname.startsWith("/contact");

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
              className="h-25 w-auto"
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
              href="/politique-de-confidentialite"
              className={`${baseLink} ${isPolicy ? activeLink : ""}`}
              aria-current={isPolicy ? "page" : undefined}
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className={`${baseLink} ${isContact ? activeLink : ""}`}
              aria-current={isContact ? "page" : undefined}
            >
              Contactez-nous
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
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1024px-LinkedIn_icon.svg.png"
                alt="LinkedIn"
                width={18}
                height={18}
                className="object-contain"
              />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/qera_app?igsh=aHVvb3IyanIzdDNw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid size-9 place-items-center rounded-full bg-gray-100 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E1306C]"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"
                alt="Instagram"
                width={18}
                height={18}
                className="object-contain"
              />
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
                href="/politique-de-confidentialite"
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium hover:text-[#1565c0]"
                aria-current={isPolicy ? "page" : undefined}
              >
                Politique de confidentialité
              </Link>
              <Link
              href="/contact"
              className={`${baseLink} ${isContact ? activeLink : ""}`}
              aria-current={isContact ? "page" : undefined}
            >
              Contactez-nous
            </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
