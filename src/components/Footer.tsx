import React from "react";

export default function Footer() {
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
              <a
                href="#"
                aria-label="Facebook"
                className="grid size-11 place-items-center rounded-full bg-gray-100 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1565c0]"
              >
                {/* Facebook */}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="grid size-11 place-items-center rounded-full bg-gray-100 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1565c0]"
              >
                {/* Instagram */}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7zM18 6.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" />
                </svg>
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
            <p className="mt-3 text-sm text-black/80">Youssef Guessous — Co‑fondateur</p>
          </div>
        </div>

        {/* Bas de footer (optionnel) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-black/70">
          <p>© {new Date().getFullYear()} Qera. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
