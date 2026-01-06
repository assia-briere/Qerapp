"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();

  const isPolicy = pathname.startsWith("/politique-de-confidentialite");
  return (
    <footer className="w-full border-t border-gray-100 text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8">
          {/* Réseaux sociaux */}
          <div className="md:col-span-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span>Les réseaux Qera</span>
            </h2>

            <div className="mt-6 flex items-center gap-4">
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

            </div>
          </div>

          {/* Citation */}
          <div className="md:col-span-8 text-center">
            <p className="mx-auto max-w-3xl text-xl md:text-2xl font-semibold leading-relaxed">
              <span className="mr-1 text-[#1565c0]">“</span>
              Votre paix d’esprit commence ici : des produits justes pour votre
              <span className="mx-1 font-semibold text-[#1565c0]">budget</span>, votre
              <span className="mx-1 font-semibold text-[#1565c0]">santé</span> et vos
              <span className="ml-1 font-semibold text-[#1565c0]">allergies</span>.
              <span className="ml-1 text-[#1565c0]">”</span>
            </p>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="mt-5 flex flex-col sm:flex-row items-center text-sm text-black/70">
          <div className="mb-4 sm:mb-0 sm:mr-140 space-x-4">
            <Link
              href="/politique-de-confidentialite"
              className={`${isPolicy
                  ? "text-blue-600 font-semibold underline"
                  : "text-gray-700 hover:text-blue-600"
                }`}
            >
              Politique de confidentialité
            </Link>
          </div>
          <div className=" text-black/70">
            <p>© {new Date().getFullYear()} Qera. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}