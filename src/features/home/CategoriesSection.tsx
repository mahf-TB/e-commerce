import { Card } from "@/components/ui/card";
import { useCategories } from "@/hooks/use-categories";
import { cn } from "@/lib/utils";
import { normalizeString } from "@/utils/helpers";
import { motion } from "framer-motion";
import {
  Battery,
  BookOpen,
  Dumbbell,
  GamepadIcon,
  Home,
  Image,
  ImagePlay,
  Laptop,
  Plug,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Watch,
  Wifi,
} from "lucide-react";
import { Link } from "react-router-dom";

// Icons de fallback pour les catégories
export const categoryIcons: Record<string, any> = {
  électronique: Laptop,
  info: Laptop,
  accessoires: Watch,
  smartphone: Smartphone,
  mode: Shirt,
  chargeur: Plug,
  énergie: Battery,
  réseau: Wifi,
  internet: Wifi,
  home: Home,
  sport: Dumbbell,
  photo: ImagePlay,
  gaming: GamepadIcon,
  livres: BookOpen,
  beauté: Sparkles,
  objets: Sparkles,
  default: ShoppingBag,
};

// Normalize strings: lowercase + remove accents


export const getCategoryIcon = (name: string) => {
  const key = normalizeString(name);
  for (const [iconKey, Icon] of Object.entries(categoryIcons)) {
    const normKey = normalizeString(iconKey);
    if (key.includes(normKey)) return Icon;
  }
  return categoryIcons.default;
};

export function CategoriesSection() {
  const { data, items: categories, isLoading, } = useCategories({
    page: 1,
    limit: 8,
    parent: "principale",
  });

  // Prendre les 8 premières catégories
  // const displayCategories = categories?.slice(0, 8) || [];

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="h-40 animate-pulse bg-muted" />
            ))}
          </div>
        </div>
      </section>
    );
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
              Explorez par Catégorie
            </h2>
            <p className="text-muted-foreground text-lg">
              Trouvez rapidement ce que vous cherchez
            </p>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = getCategoryIcon(category.nom);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link to={`/category/${category._id || category.id}?nom=${encodeURIComponent(category.nom)}`}>
                  <Card
                    className={cn(
                      "rounded group relative  overflow-hidden cursor-pointer",
                      "hover:shadow-xl transition-all duration-300",
                      "border hover:border-primary p-0"
                    )}
                  >
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/90 to-primary/80 group-hover:from-primary/60 group-hover:to-primary/80 transition-all duration-300" />

                    {/* Content */}
                    <div className="relative h-full flex gap-1 items-center justify-between p-4 text-center">
                      {/* Icon */}
                      <div className="p-2 rounded-full bg-white/20 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="h-5 w-5 text-white" />
                      </div>

                      {/* Category Name */}
                      <h3 className="font-semibold text-lg text-white/80 group-hover:text-white transition-colors line-clamp-1">
                        {category.nom}
                      </h3>

                      {/* Hover Effect Arrow */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center">
                          <svg
                            className="h-4 w-4 text-white"
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
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        {categories && data.totalItems > 8 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/category"
              className="inline-flex items-center text-primary hover:underline font-semibold"
            >
              Voir toutes les catégories 
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
