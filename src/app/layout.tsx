// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.qerapp.com/"),
  title: "Qera — Éclairez vos achats.",
  description:
    "Qera vous aide à choisir les meilleurs produits pour votre budget, votre santé et vos allergies.",
  openGraph: {
    title: "Qera — L'application simple pour mieux consommer",
    description: "Comparez les produits alimentaires selon vos critères : prix, santé, allergies. Une photo suffit.",
    images: [
      {
        url: "/images/logo-qera.jpeg",
        width: 1200,
        height: 630,
        alt: "Logo Qera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qera — L'application simple pour mieux consommer",
    description: "Comparez les produits alimentaires selon vos critères : prix, santé, allergies. Une photo suffit.",
    images: ["/images/logo-qera.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
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
