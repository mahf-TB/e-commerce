import { Button } from "@/components/ui/button";
import { useProductList } from "@/hooks/use-product";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "../products/skeleton/ProductCardSkeleton";

export function FeaturedProducts({sort, title, description} : {sort?: string, title?: string, description?: string  }) {
  const { items, isLoading } = useProductList({
    page: 1,
    limit: 4,
    statut: "active",
    sort
  });

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const products = items || [];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2 font-poppins">
              {title || "Produits en Vedette"}
            </h2>
            <p className="text-muted-foreground text-lg">
              {description || "Notre sélection des meilleurs produits"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <Button asChild variant="outline" size="lg" className="rounded">
              <Link to="/products">
                Voir tout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="md:hidden text-center mt-8"
        >
          <Button asChild size="lg" className="w-full max-w-sm">
            <Link to="/products">
              Voir tous les produits
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
