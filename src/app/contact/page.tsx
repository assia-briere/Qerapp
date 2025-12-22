"use client";

import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";


export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Validate fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error");
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Veuillez entrer une adresse email valide.");
      return;
    }

  // Get reCAPTCHA token
    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      setStatus("error");
      setErrorMessage("Veuillez compléter le CAPTCHA.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        recaptchaRef.current?.reset();
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Une erreur s'est produite lors de l'envoi.");
        recaptchaRef.current?.reset();
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Impossible de se connecter au serveur. Veuillez réessayer.");
      console.error("Submit error:", error);
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Contactez-nous – Qera</h1>
        
        <p className="mb-6 text-gray-700 text-lg">
          Pour toute question, suggestion ou demande d&apos;assistance, n&apos;hésitez pas à nous contacter.
        </p>

        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-gray-800">
            <strong>Email de support :</strong>{" "}
            <a href="mailto:contact@qera.com" className="text-blue-600 hover:text-blue-800 underline">
              contact@qera.com
            </a>
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="email@exemple.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
              Sujet *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Objet de votre message"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              placeholder="Décrivez votre demande en détail..."
            />
          </div>

                  {/* reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              theme="light"
            />
          </div>

          {status === "success" && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              ✓ Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
            </div>
          )}

          {status === "error" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              ✗ {errorMessage || "Une erreur s'est produite. Veuillez réessayer ou nous contacter directement par email."}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Questions fréquentes</h2>
          <div className="space-y-3 text-gray-700">
            <details className="group">
              <summary className="cursor-pointer font-medium hover:text-blue-600">
                Comment utiliser l&apos;application Qera ?
              </summary>
              <p className="mt-2 pl-4 text-gray-600">
                Consultez notre guide d&apos;utilisation dans l&apos;application ou contactez-nous pour une assistance personnalisée.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium hover:text-blue-600">
                Quel est le délai de réponse ?
              </summary>
              <p className="mt-2 pl-4 text-gray-600">
                Nous nous efforçons de répondre à toutes les demandes dans un délai de 24 à 48 heures ouvrables.
              </p>
            </details>
          </div>
        </div>
      </div>
    </main>
  );
}
