// app/page.tsx

"use client";

import React from "react";
import Image from "next/image";
import PourquoiQera from "@/components/pourquoiQera";
import SimpleRapideIntuitif from "@/components/simple";

// const WAITLIST_URL =
//   "https://docs.google.com/forms/d/e/1FAIpQLSc9KLE1StFrBnBZH6HHPXBDJsaXVwxv5bbMmpzBvPDEN9ODMw/viewform?usp=header";

export default function Page() {

  const handleWaitlistClick = () => {
    console.log('🔵 Button clicked!'); // Debug log
    
    // Track the click event
    if (typeof window !== 'undefined' && window.dataLayer) {
      console.log('🟢 Pushing waitlist_click event'); // Debug log
      window.dataLayer.push({
        event: 'waitlist_click',
        button_location: 'hero_section'
      });
      console.log('✅ Event pushed successfully'); // Debug log
    } else {
      console.error('❌ DataLayer not available'); // Debug log
    }
  };
  return (
    <main>
      {/* HERO SIMPLIFIÉ */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid min-h-[70vh] grid-cols-1 items-center gap-10 py-16 md:grid-cols-2">
            <div>
              <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl">
                Qera vous aide à choisir le bon produit en rayon, en quelques secondes.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-black/80">
                Prenez une photo et comparez selon vos priorités :
                <span className="font-semibold text-[#1565c0]"> santé </span>,
                <span className="font-semibold text-[#1565c0]"> budget </span>,
                <span className="font-semibold text-[#1565c0]"> allergies </span> 
                <span>et,</span>
                <span className="font-semibold text-[#1565c0]"> environnement </span>.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {/* <Link
                  href="/beta"
                  className="rounded-full bg-[#1565c0] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1976d2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1565c0]"
                >
                  Rejoindre la bêta
                </Link> */}
                <a
                  href="/beta"
                  rel="noopener noreferrer"
                  onClick={handleWaitlistClick}
                  className="rounded-full bg-[#1565c0] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1976d2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1565c0]"
                >
                  Rejoindre la bêta
                </a>
              </div>
            </div>
            <div className="relative mx-auto h-[260px] w-[260px] md:h-[340px] md:w-[340px]">
              <Image
                src="/images/test1.png"
                alt="Logo Qera"
                fill
                sizes="(max-width: 900px) 360px, 340px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTIONS SEO */}
      <PourquoiQera />
      <SimpleRapideIntuitif
        imageSrc="/images/imageQera.png"
        imageMaxWidth="max-w-md md:max-w-lg lg:max-w-xl"
        aspect="aspect-[5/4]"
        sizes="(max-width:768px) 90vw, 520px"
      />
    </main>
  );
}