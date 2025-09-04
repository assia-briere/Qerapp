import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Qera Blogs — Conseils pour mieux acheter",
  description:
    "Articles Qera : prix, santé, allergies, durabilité. Astuces et comparatifs pour des achats plus éclairés.",
};

// ----- Types & Mock Data (remplace par une vraie source plus tard) -----
type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  tags: string[];
  readingTime: string; // ex: "4 min"
  cover?: string; // /public path
};

const posts: Post[] = [
  {
    slug: "guide-choisir-cereales",
    title: "Céréales du matin : comment choisir sans exploser le sucre ?",
    excerpt:
      "Nos critères simples pour repérer les meilleurs bols : sucres, fibres, additifs et prix au kilo.",
    date: "2025-05-12",
    tags: ["Santé", "Prix"],
    readingTime: "4 min",
    cover: "/images/blog-cereales.jpg",
  },
  {
    slug: "yaourts-comparatif-prix-sante",
    title: "Yaourts : le bon équilibre entre prix et qualité nutritionnelle",
    excerpt:
      "On compare 5 références populaires et on vous montre comment gagner sans sacrifier la santé.",
    date: "2025-05-03",
    tags: ["Prix", "Santé"],
    readingTime: "5 min",
    cover: "/images/blog-yaourt.jpg",
  },
  {
    slug: "decrypter-etiquettes-allergenes",
    title: "Allergènes : décrypter vite les étiquettes en rayon",
    excerpt:
      "Les mentions à connaître et les pièges fréquents — gluten, lait, fruits à coque, etc.",
    date: "2025-04-28",
    tags: ["Allergies"],
    readingTime: "3 min",
    cover: "/images/blog-etiquette.jpg",
  },
  {
    slug: "durabilite-produit-quotidien",
    title: "Durabilité : 7 signaux simples pour des choix plus responsables",
    excerpt:
      "Labels, origine, emballage, saisonnalité… nos repères pour s’y retrouver sans y passer la journée.",
    date: "2025-04-20",
    tags: ["Durabilité"],
    readingTime: "6 min",
    cover: "/images/blog-durabilite.jpg",
  },
  {
    slug: "astuces-budget-courses",
    title: "Courses : 9 astuces budget qui ne changent pas le goût",
    excerpt:
      "Formats, marques de distributeur, promos intelligentes : nos bons réflexes au quotidien.",
    date: "2025-04-10",
    tags: ["Prix"],
    readingTime: "4 min",
    cover: "/images/blog-budget.jpg",
  },
  {
    slug: "scanner-rayons-avec-qera",
    title: "Scanner les rayons avec Qera : comment ça marche ?",
    excerpt:
      "Un aperçu de la méthode Qera et des données qui alimentent nos recommandations.",
    date: "2025-04-01",
    tags: ["Produit", "Méthodo"],
    readingTime: "5 min",
    cover: "/images/blog-qera.jpg",
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero */}
        <header className="max-w-3xl">
          <h1 className="text-4xl font-black leading-tight text-black sm:text-5xl">
            Qera <span className="text-[#1565c0]">blogs</span>
          </h1>
          <p className="mt-3 text-black/70">
            Conseils concrets pour choisir mieux : <span className="font-semibold">prix</span>,
            <span className="mx-1 font-semibold">santé</span>,
            <span className="mx-1 font-semibold">allergies</span> et
            <span className="mx-1 font-semibold">durabilité</span>.
          </p>
        </header>

        {/* Grid */}
        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Cover image */}
              <div className="relative aspect-[16/9] w-full bg-gray-100">
                {post.cover ? (
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-black/40">
                    <span>Qera</span>
                  </div>
                )}
                {/* Tags */}
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[#1565c0] shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <time className="text-xs text-black/50">{formatDate(post.date)} · {post.readingTime}</time>
                <h3 className="mt-2 line-clamp-2 text-xl font-bold text-black">
                  <Link href={`/blogs/${post.slug}`} className="hover:text-[#1565c0]">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-black/70">{post.excerpt}</p>

                <div className="mt-4">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[#1565c0] px-4 py-2 text-sm font-semibold text-[#1565c0] transition hover:bg-[#1565c0] hover:text-white"
                  >
                    Lire l’article
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="translate-x-0 transition group-hover:translate-x-0.5"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7l-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Footer de liste (placeholder pagination) */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            className="rounded-full border border-black/10 px-4 py-2 text-sm text-black/70 hover:bg-gray-50"
            disabled
          >
            Précédent
          </button>
          <button className="rounded-full bg-[#1565c0] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95">
            Plus d’articles
          </button>
        </div>
      </div>
    </main>
  );
}
