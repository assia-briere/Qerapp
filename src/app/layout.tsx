// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script'
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.qerapp.com/"),
  title: "Qera — Éclairez vos achats.",
  description:
    "Qera vous aide à choisir les meilleurs produits pour votre budget, votre santé et vos allergies.",
  keywords: ["Qera", "application", "mieux consommer", "produits alimentaires", "comparaison de produits", "santé", "budget", "allergies", "environnement", "photo", "rayon", "choix de produits", "consommation responsable", "nutrition", "évaluation de produits", "facilité d'utilisation", "intuitif", "rapide", "utilisation mobile", "achats éclairés", "bien-être", "qualité de vie", "alimentation saine", "transparence des produits", "information produit", "technologie alimentaire", "innovation alimentaire", "application mobile santé", "application consommation", "comparateur de produits"],
  openGraph: {
    type: "website",
    url: "https://www.qerapp.com/",
    siteName: "Qera",
    title: "Qera — L'application simple pour mieux consommer",
    description: "Comparez les produits alimentaires selon vos critères : prix, santé, allergies. Une photo suffit.",
    locale: "fr_FR",
    images: [
      {
        url: "/images/logo-qera.jpeg",
        width: 1200,
        height: 630,
        alt: "Qera - Éclairez vos achats",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qera — L'application simple pour mieux consommer",
    description: "Comparez les produits alimentaires selon vos critères : prix, santé, allergies. Une photo suffit.",
    images: ["/images/logo-qera.jpeg"],
    creator: "@QeraApp",
  },
  // ✅ Robots (tell search engines how to index)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PJSJW3ZX');
          `}
        </Script>
      {/* ✅ JSON-LD Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Qera",
              "description": "Application pour comparer les produits alimentaires",
              "url": "https://www.qerapp.com",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "iOS, Android, Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "127"
              }
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PJSJW3ZX"
            height="0" 
            width="0" 
            style={{display:'none', visibility:'hidden'}}
          />
        </noscript>
        {/* Structure en colonne pour pousser le footer en bas */}
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
