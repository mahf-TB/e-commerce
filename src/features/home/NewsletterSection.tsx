import { Button } from "@/components/ui/button";
import InputForm from "@/components/utils/input-form";
import { showToast } from "@/lib/toast";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showToast("error", "Veuillez entrer votre email");
      return;
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("error", "Email invalide");
      return;
    }

    setIsLoading(true);

    // Simuler un appel API
    setTimeout(() => {
      showToast("success", "Inscription réussie ! Vérifiez votre email.");
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 px-4 bg-linear-to-br from-primary via-primary/90 to-primary/80 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse delay-700" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Restez Informé de Nos Offres
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Inscrivez-vous à notre newsletter et recevez{" "}
            <span className="font-bold underline">-10% sur votre première commande</span>
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="flex-1 items-center">
              <InputForm
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 bg-white/10 backdrop-blur-sm text-base border-white/30 text-white placeholder:text-white/60 focus:bg-white/20"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold rounded"
              disabled={isLoading}
            >
              {isLoading ? (
                "Inscription..."
              ) : (
                <>
                  S'inscrire
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Offres exclusives</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Nouveautés en avant-première</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Désabonnement facile</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
