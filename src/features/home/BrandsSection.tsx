
import useBrands from "@/hooks/use-marques";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function BrandsSection() {
  const { items: brands, isLoading } = useBrands({ page: 1, limit: 8 });

  // Prendre les 12 premières marques
  // const brands = brands?.slice(0, 12) || [];

  if (isLoading || brands.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 font-poppins">
              Nos Marques Partenaires
            </h2>
            <p className="text-muted-foreground text-lg">
              Les meilleures marques, au même endroit
            </p>
          </motion.div>
        </div>

        {/* Brands Grid */}

        <div className="mx-5 mt-10 flex  flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-10">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link to={`/products?marque=${brand._id || brand.id}`}>
                {brand.logo ? (
                  <img
                    className="h-24 w-fit dark:invert"
                    src={brand.logo}
                    alt={brand.nom}
                    height="24"
                    width="auto"
                  />
                ) : (
                  <div className="text-center">
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {brand.nom}
                    </p>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Brands */}
        {brands && brands.length > 12 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/marques"
              className="inline-flex items-center text-primary hover:underline font-semibold"
            >
              Voir toutes les marques
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
