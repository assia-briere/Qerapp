import React from "react";

// Section "Pourquoi Qera ?" — version courte & SEO-friendly
export default function PourquoiQera() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-black tracking-tight text-black sm:text-4xl">
          Pourquoi choisir <span className="text-[#1565c0]">Qera</span> pour vos courses du quotidien ?
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <article className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
            <div className="text-4xl font-black leading-none text-[#1565c0]/30">01.</div>
            <h3 className="mt-4 text-2xl font-bold text-black">Photographiez. Comparez. Choisissez.</h3>
            <p className="mt-3 text-black/80">
              Prenez une photo d’un produit. Qera vous donne une info claire, rapide et personnalisée.
              Moins d’hésitation, plus de simplicité.
            </p>
          </article>

          {/* Card 2 */}
          <article className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
            <div className="text-4xl font-black leading-none text-[#1565c0]/30">02.</div>
            <h3 className="mt-4 text-2xl font-bold text-black">Un tri selon vos critères</h3>
            <p className="mt-3 text-black/80">
              Filtrez selon ce qui compte vraiment pour vous :
              <span className="mx-1 font-semibold text-[#1565c0]">prix</span>,
              <span className="mx-1 font-semibold text-[#1565c0]">santé</span>,
              <span className="ml-1 font-semibold text-[#1565c0]">environnement</span>.
              Qera s’adapte à vos priorités.
            </p>
          </article>

          {/* Card 3 */}
          <article className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
            <div className="text-4xl font-black leading-none text-[#1565c0]/30">03.</div>
            <h3 className="mt-4 text-2xl font-bold text-black">Achetez en confiance</h3>
            <p className="mt-3 text-black/80">
              Grâce à des données claires et fiables, Qera vous aide à faire
              des choix <span className="font-semibold text-[#1565c0]">plus éclairés</span>, plus rapidement.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
