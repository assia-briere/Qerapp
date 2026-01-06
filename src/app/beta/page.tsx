"use client";

import { useState, useEffect, useMemo } from "react";
import countries from "i18n-iso-countries";
import fr from "i18n-iso-countries/langs/fr.json";

// Register French locale
countries.registerLocale(fr);

// Extend Window interface for dataLayer
declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

export default function BetaPage() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    os: "ios",
    country: "",
    source: "",
  });
  const [otherCountry, setOtherCountry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [referralLink, setReferralLink] = useState("");

  // Get all countries in French, sorted alphabetically
  const allCountries = useMemo(() => {
    const countriesObj = countries.getNames("fr", { select: "official" });
    return Object.entries(countriesObj)
      .map(([code, name]) => ({ code, name }))
      .filter(({code})=>code!=="EH")
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Track page view on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "beta_view",
      });
    }
  }, []);

  const handleSubmit = async () => {
    setError("");

    // Validate firstName
    if (!formData.firstName.trim()) {
      setError("Veuillez entrer votre prénom.");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    // Validate required fields
    if (!formData.country) {
      setError("Veuillez sélectionner votre pays.");
      return;
    }

    // If "OTHER" is selected, validate that a specific country is chosen
    if (formData.country === "OTHER" && !otherCountry) {
      setError("Veuillez sélectionner un pays dans la liste.");
      return;
    }

    if (!formData.source) {
      setError("Veuillez indiquer comment vous avez connu Qera.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Use otherCountry if "OTHER" was selected, otherwise use the main country
      const finalCountry = formData.country === "OTHER" ? otherCountry : formData.country;
      
      const response = await fetch("/api/beta-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          country: finalCountry,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Track success event
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "beta_submit_success",
            firstName: formData.firstName,
            email: formData.email,
            os: formData.os,
            country: finalCountry,
            source: formData.source,
          });
        }

        // Generate referral link (you can customize this)
        const refCode = Math.random().toString(36).substring(7);
        setReferralLink(`https://qerapp.com/beta?ref=${refCode}`);
        
        setStep("success");
      } else {
        setError(data.error || "Une erreur est survenue. Réessayez.");
        
        // Track error event
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "beta_submit_error",
            error: data.error,
          });
        }
      }
    } catch (err) {
      setError("Impossible de se connecter. Vérifiez votre connexion.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    
    // Track copy event
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "copy_link" });
    }
    
    alert("Lien copié !");
  };

  const shareToWhatsApp = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "share_click", platform: "whatsapp" });
    }
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        `Rejoins-moi sur la bêta de Qera, l'app qui analyse tes produits ! ${referralLink}`
      )}`,
      "_blank"
    );
  };

  const shareToTelegram = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "share_click", platform: "telegram" });
    }
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(
        "Rejoins-moi sur la bêta de Qera !"
      )}`,
      "_blank"
    );
  };

  const shareToLinkedIn = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "share_click", platform: "linkedin" });
    }
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
      "_blank"
    );
  };

  if (step === "success") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bienvenue dans la bêta ! 🎉
            </h1>
          </div>

          {/* Download Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-2 text-center">📱 Téléchargez Qera maintenant</h2>
            <p className="text-blue-100 text-center mb-6 text-sm">
              Commencez dès aujourd&apos;hui à analyser vos produits
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* iOS TestFlight Button */}
              <a
                href="https://testflight.apple.com/join/tzvz8UXU"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-4 px-6 rounded-xl hover:bg-gray-50 transition shadow-lg"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-500">Disponible sur</div>
                  <div className="text-sm font-bold">TestFlight (iOS)</div>
                </div>
              </a>

              {/* Android Play Store Button */}
              <a
                href="https://play.google.com/store/apps/details?id=com.qera.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-4 px-6 rounded-xl hover:bg-gray-50 transition shadow-lg"
              >
                <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.46 11.46 0 0 0-8.94 0L5.65 5.67c-.19-.28-.55-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C4.8 10.92 3.5 12.62 3.5 14.5h17c0-1.88-1.3-3.58-2.9-5.02M7 13.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75m10 0c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-500">Disponible sur</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              📧 Prochaines étapes
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">1.</span>
                <span>Surveillez votre boîte email (vérifiez vos spams)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">2.</span>
                <span>Téléchargez l&apos;app via le lien que nous vous enverrons</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">3.</span>
                <span>Profitez de Qera en avant-première !</span>
              </li>
            </ul>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Invitez vos amis et passez en priorité !
            </h2>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">Votre lien de parrainage :</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                />
                <button
                  onClick={copyLink}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                >
                  Copier
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={shareToWhatsApp}
                className="flex flex-col items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"
              >
                <svg className="w-8 h-8 text-green-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-xs font-medium text-gray-700">WhatsApp</span>
              </button>

              <button
                onClick={shareToTelegram}
                className="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"
              >
                <svg className="w-8 h-8 text-blue-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span className="text-xs font-medium text-gray-700">Telegram</span>
              </button>

              <button
                onClick={shareToLinkedIn}
                className="flex flex-col items-center justify-center p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition border border-indigo-200"
              >
                <svg className="w-8 h-8 text-indigo-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-xs font-medium text-gray-700">LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Rejoignez la bêta de Qera
          </h1>
          <p className="text-xl text-gray-600">
            Soyez parmi les premiers à analyser vos produits et faire les meilleurs choix pour votre santé, budget et planète.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 mb-6">
          <div className="space-y-6">
            {/* First Name Field */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg"
                placeholder="Votre prénom"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Adresse email *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg"
                placeholder="votre@email.com"
              />
            </div>

            {/* OS Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Votre système d&apos;exploitation *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, os: "ios" })}
                  className={`p-4 border-2 rounded-xl transition ${
                    formData.os === "ios"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <span className="font-semibold text-gray-900">iOS</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, os: "android" })}
                  className={`p-4 border-2 rounded-xl transition ${
                    formData.os === "android"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-2 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.46 11.46 0 0 0-8.94 0L5.65 5.67c-.19-.28-.55-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C4.8 10.92 3.5 12.62 3.5 14.5h17c0-1.88-1.3-3.58-2.9-5.02M7 13.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75m10 0c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75"/>
                    </svg>
                    <span className="font-semibold text-gray-900">Android</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Country Field */}
            <div>
              <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                Pays *
              </label>
              <select
                id="country"
                value={formData.country}
                onChange={(e) => {
                  setFormData({ ...formData, country: e.target.value });
                  // Reset otherCountry when changing main selection
                  if (e.target.value !== "OTHER") {
                    setOtherCountry("");
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg bg-white"
              >
                <option value="">Sélectionnez votre pays</option>
                <option value="FR">🇫🇷 France</option>
                <option value="BE">🇧🇪 Belgique</option>
                <option value="CH">🇨🇭 Suisse</option>
                <option value="MA">🇲🇦 Maroc</option>
                <option value="OTHER">🌍 Autre</option>
              </select>

              {/* Conditional dropdown for all countries when "Autre" is selected */}
              {formData.country === "OTHER" && (
                <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
                  <label htmlFor="otherCountry" className="block text-sm font-semibold text-gray-700 mb-2">
                    Sélectionnez votre pays dans la liste
                  </label>
                  <select
                    id="otherCountry"
                    value={otherCountry}
                    onChange={(e) => setOtherCountry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg bg-white"
                  >
                    <option value="">Choisissez un pays...</option>
                    {allCountries.map(({ code, name }) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Source Field */}
            <div>
              <label htmlFor="source" className="block text-sm font-semibold text-gray-700 mb-2">
                Comment avez-vous entendu parler de Qera ? *
              </label>
              <select
                id="source"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg bg-white"
              >
                <option value="">Sélectionnez une option</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="tiktok">TikTok</option>
                <option value="L'équipe Qera">L'équipe Qera</option>
                <option value="friend">Recommandation d&apos;un ami</option>
                <option value="other">Autre</option>
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-lg"
            >
              {isSubmitting ? "Inscription en cours..." : "Rejoindre la bêta"}
            </button>
          </div>
        </div>

        {/* Trust Block */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-gray-200">
          <div className="flex items-start gap-3 mb-4">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Votre vie privée est protégée</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Photos non stockées sur nos serveurs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Préférences stockées sur votre appareil</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Données personnelles jamais revendues</span>
                </li>
              </ul>
              <a
                href="/politique-de-confidentialite"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm mt-3"
              >
                En savoir plus
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// "use client";

// import { useState, useEffect, useMemo } from "react";
// import countries from "i18n-iso-countries";
// import fr from "i18n-iso-countries/langs/fr.json";

// // Register French locale
// countries.registerLocale(fr);

// // Extend Window interface for dataLayer
// declare global {
//   interface Window {
//     dataLayer: Array<Record<string, unknown>>;
//   }
// }

// export default function BetaPage() {
//   const [step, setStep] = useState<"form" | "success">("form");
//   const [formData, setFormData] = useState({
//     email: "",
//     os: "ios",
//     country: "",
//     source: "",
//   });
//   const [otherCountry, setOtherCountry] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [referralLink, setReferralLink] = useState("");

//   // Get all countries in French, sorted alphabetically
//   const allCountries = useMemo(() => {
//     const countriesObj = countries.getNames("fr", { select: "official" });
//     return Object.entries(countriesObj)
//       .map(([code, name]) => ({ code, name }))
//       .sort((a, b) => a.name.localeCompare(b.name));
//   }, []);

//   // Track page view on mount
//   useEffect(() => {
//     if (typeof window !== "undefined" && window.dataLayer) {
//       window.dataLayer.push({
//         event: "beta_view",
//       });
//     }
//   }, []);

//   const handleSubmit = async () => {
//     setError("");

//     // Validate email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError("Veuillez entrer une adresse email valide.");
//       return;
//     }

//     // Validate required fields
//     if (!formData.country) {
//       setError("Veuillez sélectionner votre pays.");
//       return;
//     }

//     // If "OTHER" is selected, validate that a specific country is chosen
//     if (formData.country === "OTHER" && !otherCountry) {
//       setError("Veuillez sélectionner un pays dans la liste.");
//       return;
//     }

//     if (!formData.source) {
//       setError("Veuillez indiquer comment vous avez connu Qera.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Use otherCountry if "OTHER" was selected, otherwise use the main country
//       const finalCountry = formData.country === "OTHER" ? otherCountry : formData.country;
      
//       const response = await fetch("/api/beta-signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           country: finalCountry,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Track success event
//         if (typeof window !== "undefined" && window.dataLayer) {
//           window.dataLayer.push({
//             event: "beta_submit_success",
//             email: formData.email,
//             os: formData.os,
//             country: finalCountry,
//             source: formData.source,
//           });
//         }

//         // Generate referral link (you can customize this)
//         const refCode = Math.random().toString(36).substring(7);
//         setReferralLink(`https://qerapp.com/beta?ref=${refCode}`);
        
//         setStep("success");
//       } else {
//         setError(data.error || "Une erreur est survenue. Réessayez.");
        
//         // Track error event
//         if (typeof window !== "undefined" && window.dataLayer) {
//           window.dataLayer.push({
//             event: "beta_submit_error",
//             error: data.error,
//           });
//         }
//       }
//     } catch (err) {
//       setError("Impossible de se connecter. Vérifiez votre connexion.");
//       console.error(err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const copyLink = () => {
//     navigator.clipboard.writeText(referralLink);
    
//     // Track copy event
//     if (typeof window !== "undefined" && window.dataLayer) {
//       window.dataLayer.push({ event: "copy_link" });
//     }
    
//     alert("Lien copié !");
//   };

//   const shareToWhatsApp = () => {
//     if (typeof window !== "undefined" && window.dataLayer) {
//       window.dataLayer.push({ event: "share_click", platform: "whatsapp" });
//     }
//     window.open(
//       `https://wa.me/?text=${encodeURIComponent(
//         `Rejoins-moi sur la bêta de Qera, l'app qui analyse tes produits ! ${referralLink}`
//       )}`,
//       "_blank"
//     );
//   };

//   const shareToTelegram = () => {
//     if (typeof window !== "undefined" && window.dataLayer) {
//       window.dataLayer.push({ event: "share_click", platform: "telegram" });
//     }
//     window.open(
//       `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(
//         "Rejoins-moi sur la bêta de Qera !"
//       )}`,
//       "_blank"
//     );
//   };

//   const shareToLinkedIn = () => {
//     if (typeof window !== "undefined" && window.dataLayer) {
//       window.dataLayer.push({ event: "share_click", platform: "linkedin" });
//     }
//     window.open(
//       `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
//       "_blank"
//     );
//   };

//   if (step === "success") {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
//         <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
//           <div className="text-center mb-8">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Bienvenue dans la bêta ! 🎉
//             </h1>
//           </div>

//           {/* Download Section */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white">
//             <h2 className="text-2xl font-bold mb-2 text-center">📱 Téléchargez Qera maintenant</h2>
//             <p className="text-blue-100 text-center mb-6 text-sm">
//               Commencez dès aujourd&apos;hui à analyser vos produits
//             </p>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* iOS TestFlight Button */}
//               <a
//                 href="https://testflight.apple.com/join/tzvz8UXU"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-4 px-6 rounded-xl hover:bg-gray-50 transition shadow-lg"
//               >
//                 <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
//                 </svg>
//                 <div className="text-left">
//                   <div className="text-xs text-gray-500">Disponible sur</div>
//                   <div className="text-sm font-bold">TestFlight (iOS)</div>
//                 </div>
//               </a>

//               {/* Android Play Store Button */}
//               <a
//                 href="https://play.google.com/store/apps/details?id=com.qera.app"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-4 px-6 rounded-xl hover:bg-gray-50 transition shadow-lg"
//               >
//                 <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.46 11.46 0 0 0-8.94 0L5.65 5.67c-.19-.28-.55-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C4.8 10.92 3.5 12.62 3.5 14.5h17c0-1.88-1.3-3.58-2.9-5.02M7 13.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75m10 0c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75"/>
//                 </svg>
//                 <div className="text-left">
//                   <div className="text-xs text-gray-500">Disponible sur</div>
//                   <div className="text-sm font-bold">Google Play</div>
//                 </div>
//               </a>
//             </div>
//           </div>

//           <div className="bg-blue-50 rounded-2xl p-6 mb-8">
//             <h2 className="text-xl font-semibold text-gray-900 mb-3">
//               📧 Prochaines étapes
//             </h2>
//             <ul className="space-y-2 text-gray-700">
//               <li className="flex items-start">
//                 <span className="text-blue-600 mr-2">1.</span>
//                 <span>Surveillez votre boîte email (vérifiez vos spams)</span>
//               </li>
//               <li className="flex items-start">
//                 <span className="text-blue-600 mr-2">2.</span>
//                 <span>Téléchargez l&apos;app via le lien que nous vous enverrons</span>
//               </li>
//               <li className="flex items-start">
//                 <span className="text-blue-600 mr-2">3.</span>
//                 <span>Profitez de Qera en avant-première !</span>
//               </li>
//             </ul>
//           </div>

//           <div className="border-t pt-8">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
//               Invitez vos amis et passez en priorité !
//             </h2>
            
//             <div className="bg-gray-50 rounded-xl p-4 mb-4">
//               <p className="text-sm text-gray-600 mb-2">Votre lien de parrainage :</p>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={referralLink}
//                   readOnly
//                   className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm"
//                 />
//                 <button
//                   onClick={copyLink}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
//                 >
//                   Copier
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-3">
//               <button
//                 onClick={shareToWhatsApp}
//                 className="flex flex-col items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"
//               >
//                 <svg className="w-8 h-8 text-green-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//                 </svg>
//                 <span className="text-xs font-medium text-gray-700">WhatsApp</span>
//               </button>

//               <button
//                 onClick={shareToTelegram}
//                 className="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"
//               >
//                 <svg className="w-8 h-8 text-blue-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
//                 </svg>
//                 <span className="text-xs font-medium text-gray-700">Telegram</span>
//               </button>

//               <button
//                 onClick={shareToLinkedIn}
//                 className="flex flex-col items-center justify-center p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition border border-indigo-200"
//               >
//                 <svg className="w-8 h-8 text-indigo-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                 </svg>
//                 <span className="text-xs font-medium text-gray-700">LinkedIn</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
//       <div className="max-w-xl w-full">
//         {/* Hero Section */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Rejoignez la bêta de Qera
//           </h1>
//           <p className="text-xl text-gray-600">
//             Soyez parmi les premiers à analyser vos produits et faire les meilleurs choix pour votre santé, budget et planète.
//           </p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 mb-6">
//           <div className="space-y-6">
//             {/* Email Field */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
//                 Adresse email *
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg"
//                 placeholder="votre@email.com"
//               />
//             </div>

//             {/* OS Selection */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-3">
//                 Votre système d&apos;exploitation *
//               </label>
//               <div className="grid grid-cols-2 gap-4">
//                 <button
//                   type="button"
//                   onClick={() => setFormData({ ...formData, os: "ios" })}
//                   className={`p-4 border-2 rounded-xl transition ${
//                     formData.os === "ios"
//                       ? "border-blue-600 bg-blue-50"
//                       : "border-gray-300 hover:border-gray-400"
//                   }`}
//                 >
//                   <div className="text-center">
//                     <svg className="w-12 h-12 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
//                     </svg>
//                     <span className="font-semibold text-gray-900">iOS</span>
//                   </div>
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => setFormData({ ...formData, os: "android" })}
//                   className={`p-4 border-2 rounded-xl transition ${
//                     formData.os === "android"
//                       ? "border-blue-600 bg-blue-50"
//                       : "border-gray-300 hover:border-gray-400"
//                   }`}
//                 >
//                   <div className="text-center">
//                     <svg className="w-12 h-12 mx-auto mb-2 text-green-600" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.46 11.46 0 0 0-8.94 0L5.65 5.67c-.19-.28-.55-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C4.8 10.92 3.5 12.62 3.5 14.5h17c0-1.88-1.3-3.58-2.9-5.02M7 13.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75m10 0c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75"/>
//                     </svg>
//                     <span className="font-semibold text-gray-900">Android</span>
//                   </div>
//                 </button>
//               </div>
//             </div>

//             {/* Country Field */}
//             <div>
//               <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
//                 Pays *
//               </label>
//               <select
//                 id="country"
//                 value={formData.country}
//                 onChange={(e) => {
//                   setFormData({ ...formData, country: e.target.value });
//                   // Reset otherCountry when changing main selection
//                   if (e.target.value !== "OTHER") {
//                     setOtherCountry("");
//                   }
//                 }}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg bg-white"
//               >
//                 <option value="">Sélectionnez votre pays</option>
//                 <option value="FR">🇫🇷 France</option>
//                 <option value="BE">🇧🇪 Belgique</option>
//                 <option value="CH">🇨🇭 Suisse</option>
//                 <option value="MA">🇲🇦 Maroc</option>
//                 <option value="OTHER">🌍 Autre</option>
//               </select>

//               {/* Conditional dropdown for all countries when "Autre" is selected */}
//               {formData.country === "OTHER" && (
//                 <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
//                   <label htmlFor="otherCountry" className="block text-sm font-semibold text-gray-700 mb-2">
//                     Sélectionnez votre pays dans la liste
//                   </label>
//                   <select
//                     id="otherCountry"
//                     value={otherCountry}
//                     onChange={(e) => setOtherCountry(e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg bg-white"
//                   >
//                     <option value="">Choisissez un pays...</option>
//                     {allCountries.map(({ code, name }) => (
//                       <option key={code} value={code}>
//                         {name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//             </div>

//             {/* Source Field */}
//             <div>
//               <label htmlFor="source" className="block text-sm font-semibold text-gray-700 mb-2">
//                 Comment avez-vous entendu parler de Qera ? *
//               </label>
//               <select
//                 id="source"
//                 value={formData.source}
//                 onChange={(e) => setFormData({ ...formData, source: e.target.value })}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg bg-white"
//               >
//                 <option value="">Sélectionnez une option</option>
//                 <option value="social_media">Réseaux sociaux (Instagram, Facebook, TikTok)</option>
//                 <option value="friend">Recommandation d&apos;un ami</option>
//                 <option value="search">Recherche Google</option>
//                 <option value="linkedin">LinkedIn</option>
//                 <option value="youtube">YouTube</option>
//                 <option value="blog">Blog ou article</option>
//                 <option value="other">Autre</option>
//               </select>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
//                 {error}
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-lg"
//             >
//               {isSubmitting ? "Inscription en cours..." : "Rejoindre la bêta"}
//             </button>
//           </div>
//         </div>

//         {/* Trust Block */}
//         <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-gray-200">
//           <div className="flex items-start gap-3 mb-4">
//             <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//             <div className="flex-1">
//               <h3 className="font-semibold text-gray-900 mb-2">Votre vie privée est protégée</h3>
//               <ul className="space-y-2 text-sm text-gray-600">
//                 <li className="flex items-start">
//                   <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span>Photos non stockées sur nos serveurs</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span>Préférences stockées sur votre appareil</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span>Données personnelles jamais revendues</span>
//                 </li>
//               </ul>
//               <a
//                 href="/politique-de-confidentialite"
//                 className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm mt-3"
//               >
//                 En savoir plus
//                 <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

