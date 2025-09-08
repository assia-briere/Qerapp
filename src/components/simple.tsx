// app/components/SimpleRapideIntuitif.tsx

"use client";

import React from "react";
import Image from "next/image";

type Props = {
  imageSrc?: string;
  imageAlt?: string;
  imageMaxWidth?: string;
  aspect?: string;
  sizes?: string;
  imgWidth?: number;
  imgHeight?: number;
  imageContainerClassName?: string;
};

export default function SimpleRapideIntuitif({
  imageSrc = "/images/imageQera.png",
  imageAlt = "Aperçu de l'application Qera",
  imageMaxWidth = "max-w-md md:max-w-lg lg:max-w-xl",
  aspect = "aspect-[5/4]",
  sizes = "(max-width:768px) 90vw, 520px",
  imgWidth,
  imgHeight,
  imageContainerClassName,
}: Props) {
  const useLegacy = typeof imgWidth === "number" && typeof imgHeight === "number";
  const containerWidth = imageContainerClassName || imageMaxWidth;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-black tracking-tight text-black sm:text-4xl">
          Qera vous aide à faire les bons choix au quotidien, selon vos besoins.
        </h2>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative rounded-2xl ring-1 ring-inset ring-[#1565c0]/15 bg-white p-4 md:p-6">
            <div className={`relative mx-auto w-full ${containerWidth} ${useLegacy ? "" : aspect}`}>
              {useLegacy ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={imgWidth}
                  height={imgHeight}
                  sizes={sizes}
                  className="h-auto w-full object-contain"
                  priority
                />
              ) : (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes={sizes}
                  className="object-contain"
                  priority
                />
              )}
            </div>
          </div>

          <div className="grid gap-5 place-self-center w-full max-w-xl">
            {/* Carte 1 */}
            <div className="flex items-start gap-4 rounded-2xl ring-1 ring-inset ring-[#1565c0]/20 bg-white p-5 w-full">
              <div className="grid size-10 place-items-center rounded-xl bg-[#1565c0]/10">
                <svg viewBox="0 0 24 24" width="18" height="18" className="text-[#1565c0]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20z" />
                  <path d="M16 8l-3 7l-7 3l3-7l7-3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Un scan, une réponse</h3>
                <p className="mt-1 text-sm text-black/80">
                  Prenez une photo d’un produit, Qera vous indique immédiatement ce qui vous correspond.
                </p>
              </div>
            </div>

            {/* Carte 2 */}
            <div className="flex items-start gap-4 rounded-2xl ring-1 ring-inset ring-[#1565c0]/20 bg-white p-5 w-full">
              <div className="grid size-10 place-items-center rounded-xl bg-[#1565c0]/10">
                <svg viewBox="0 0 24 24" width="18" height="18" className="text-[#1565c0]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Vos filtres, vos priorités</h3>
                <p className="mt-1 text-sm text-black/80">
                  Allergies, prix, nutrition ou écologie : filtrez ce qui compte vraiment pour vous.
                </p>
              </div>
            </div>

            {/* Carte 3 */}
           {/* <div className="flex items-start gap-4 rounded-2xl ring-1 ring-inset ring-[#1565c0]/20 bg-white p-5 w-full">
              <div className="grid size-10 place-items-center rounded-xl bg-[#1565c0]/10">
                <svg viewBox="0 0 24 24" width="18" height="18" className="text-[#1565c0]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6l1-1a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Plus clair, plus rapide</h3>
                <p className="mt-1 text-sm text-black/80">
                  Vos favoris accessibles, vos choix facilités. Achetez avec confiance.
                </p>
              </div>
            </div>*/}

          </div>
        </div>
      </div>
    </section>
  );
}
