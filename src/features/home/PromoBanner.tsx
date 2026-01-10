import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function PromoBanner() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Banner 1 - Flash Sale */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/products?sort=promo">
              <div className="group relative h-80 rounded-2xl overflow-hidden bg-linear-to-br from-red-500 to-pink-600 p-8 text-white hover:shadow-2xl transition-all duration-300">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between">
                  <div>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                      <Clock className="h-4 w-4 animate-pulse" />
                      <span className="text-sm font-medium">Offre Flash</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-4xl md:text-5xl font-bold mb-3">
                      Ventes Flash
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-white/90 mb-4">
                      Jusqu'à <span className="text-4xl font-bold">-70%</span>
                    </p>
                    <p className="text-white/80">
                      Dépêchez-vous, stocks limités !
                    </p>
                  </div>

                  {/* CTA */}
                  <div>
                    <Button
                      size="lg"
                      className="bg-white text-red-600 hover:bg-gray-100 group-hover:translate-x-2 transition-transform"
                    >
                      Profiter maintenant
                    </Button>
                  </div>
                </div>

                {/* Decorative Circle */}
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              </div>
            </Link>
          </motion.div>

          {/* Banner 2 - New Arrivals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/products?sort=-createdAt">
              <div className="group relative h-80 rounded-2xl overflow-hidden bg-linear-to-br from-blue-500 to-purple-600 p-8 text-white hover:shadow-2xl transition-all duration-300">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between">
                  <div>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">Nouveauté</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-4xl md:text-5xl font-bold mb-3">
                      Nouveaux
                      <br />
                      Arrivages
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-white/90">
                      Collection 2026
                    </p>
                    <p className="text-white/80">
                      Découvrez les dernières tendances
                    </p>
                  </div>

                  {/* CTA */}
                  <div>
                    <Button
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-100 group-hover:translate-x-2 transition-transform"
                    >
                      Découvrir la collection
                    </Button>
                  </div>
                </div>

                {/* Decorative Circle */}
                <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
