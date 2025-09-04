import React from "react";

// Section "Pourquoi Qera ?" — version courte & émotionnelle
export default function PourquoiQera() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-black tracking-tight text-black sm:text-4xl">
          Pourquoi <span className="text-[#1565c0]">Qera</span> ?
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <article className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
            <div className="text-4xl font-black leading-none text-[#1565c0]/30">01.</div>
            <h3 className="mt-4 text-2xl font-bold text-black">Scannez. Trouvez le meilleur.</h3>
            <p className="mt-3 text-black/80">
              Un simple <span className="font-semibold text-[#1565c0]">scan</span> révèle les produits qui
              vous conviennent, grâce à des <span className="font-semibold">données fiables</span>.
              Moins d’hésitation, plus d’évidence.
            </p>
          </article>

          {/* Card 2 */}
          <article className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
            <div className="text-4xl font-black leading-none text-[#1565c0]/30">02.</div>
            <h3 className="mt-4 text-2xl font-bold text-black">Vos priorités d’abord</h3>
            <p className="mt-3 text-black/80">
              Choisissez selon vos critères :
              <span className="mx-1 font-semibold text-[#1565c0]">prix</span>,
              <span className="mx-1 font-semibold text-[#1565c0]">santé</span> et
              <span className="ml-1 font-semibold text-[#1565c0]">durabilité</span>.
              Qera met en avant ce qui compte pour vous.
            </p>
          </article>

          {/* Card 3 */}
          <article className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
            <div className="text-4xl font-black leading-none text-[#1565c0]/30">03.</div>
            <h3 className="mt-4 text-2xl font-bold text-black">Décidez sereinement</h3>
            <p className="mt-3 text-black/80">
              Gagnez du temps et achetez en confiance — une information claire pour des
              choix <span className="mx-1 font-semibold text-[#1565c0]">plus éclairés</span>.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
