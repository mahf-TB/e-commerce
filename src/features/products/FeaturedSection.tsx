import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { Filter } from "lucide-react";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  status: "en-stock" | "limité" | "rupture";
};

const featuredLaptops: Product[] = [
  {
    id: 1,
    name: "Raptor Pro 15",
    description: "Intel i7, 16GB RAM, RTX 4060, 1TB SSD",
    price: 1499,
    imageUrl: "/images/article1.jpg",
    rating: 4.7,
    reviewsCount: 213,
    status: "en-stock",
  },
  {
    id: 2,
    name: "AeroBook X",
    description: "Intel i5, 8GB RAM, 512GB SSD",
    price: 899,
    imageUrl: "/images/article1.jpg",
    rating: 4.4,
    reviewsCount: 98,
    status: "en-stock",
  },
  {
    id: 3,
    name: "FlexPad 14",
    description: "Ryzen 7, 16GB RAM, Touchscreen",
    price: 1099,
    imageUrl: "/images/article1.jpg",
    rating: 4.6,
    reviewsCount: 154,
    status: "rupture",
  },
];

export function FeaturedSection({
  setOpen,
}: {
  setOpen: (value: boolean) => void;
}) {
  const isLoading = true;
  return (
    <section className="space-y-4">
      {/* Titre + tri */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold ">Produits électroniques</h2>

        <div className="flex items-center gap-2 text-sm ">
          <button
            className="relative hover:bg-gray-300 p-2 rounded-md cursor-pointer transition-colors  md:hidden"
            onClick={() => setOpen(true)}
          >
            <Filter size={14} />
          </button>
          <span className="text-slate-500">Sort:</span>
          <button className="inline-flex items-center gap-1">
            <span>Popular</span>
            <span className="text-slate-500">▾</span>
          </button>
        </div>
      </div>

      {/* Grille */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featuredLaptops.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : featuredLaptops.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
      </div>
    </section>
  );
}
