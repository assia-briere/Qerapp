"use client";

import React from "react";

export default function PolitiqueConfidentialite() {
  return (
    <main className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Politique de confidentialité – Qera</h1>
      <p className="mb-4">Dernière mise à jour : septembre 2025</p>

      <p className="mb-4">
        Qera respecte votre vie privée et s’engage à protéger les informations personnelles que vous nous confiez.
        Cette politique explique quelles données nous collectons, comment nous les utilisons et vos droits à ce sujet.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Données collectées</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>
          <strong>Caméra / Photos :</strong> utilisées uniquement pour scanner ou photographier un produit.
          Les images ne sont pas enregistrées ni partagées sans votre consentement.
        </li>
        <li>
          <strong>Informations d’utilisation :</strong> statistiques anonymes pour améliorer l’application.
        </li>
        <li>
          <strong>Préférences utilisateur :</strong> filtres (santé, prix, allergies, environnement) stockés
          localement sur votre appareil.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Utilisation des données</h2>
      <p className="mb-4">
        Les données collectées servent uniquement à analyser les produits scannés, personnaliser les résultats
        et améliorer Qera. Nous ne revendons ni ne partageons vos données à des fins commerciales.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Partage des données</h2>
      <p className="mb-4">
        Vos données peuvent être partagées uniquement dans les cas suivants : conformité légale ou recours à
        des prestataires techniques nécessaires au fonctionnement de l’application.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Conservation des données</h2>
      <p className="mb-4">
        Les photos ne sont pas conservées par Qera. Vos préférences restent stockées localement sur votre appareil.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Vos droits</h2>
      <p className="mb-4">
        Conformément au RGPD, vous pouvez demander l’accès, la rectification ou la suppression de vos données en
        nous écrivant à{" "}
        <a href="mailto:contact@qera.com" className="text-blue-600 underline">
          contact@qera.com
        </a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Sécurité</h2>
      <p className="mb-4">
        Nous protégeons vos données avec des mesures techniques et organisationnelles adaptées.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Modifications</h2>
      <p className="mb-4">
        Cette politique peut évoluer. Les mises à jour seront publiées sur cette page.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p>
        Pour toute question :{" "}
        <a href="mailto:contact@qera.com" className="text-blue-600 underline">
          contact@qera.com
        </a>
      </p>
    </main>
  );
}
