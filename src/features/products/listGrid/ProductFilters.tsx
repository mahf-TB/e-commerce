"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"; // chemin généré par shadcn
// import tes produits depuis ton API ou un hook

type Brand = { value: number | string; label: string };
type Category = { value: number | string; label: string };

const brands: Brand[] = [
  { value: 1, label: "Samsung" },
  { value: 2, label: "Apple" },
  { value: 3, label: "Sony" },
  { value: 4, label: "LG" },
  { value: 5, label: "Xiaomi" },
];

const categories: Category[] = [
  { value: 1, label: "Smartphones" },
  { value: 2, label: "Ordinateurs portables" },
  { value: 3, label: "Tablettes" },
  { value: 4, label: "Télévisions" },
  { value: 5, label: "Casques audio" },
  { value: 6, label: "Enceintes" },
  { value: 7, label: "Accessoires (câbles, chargeurs…)" },
];

export function ProductFilters() {
  const [selectedBrands, setSelectedBrands] = useState<(number | string)[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<(number | string)[]>([]);

  const toggleBrand = (brand: number | string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (cat: number | string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="space-y-4">
      {/* Marques */}
      <div>
        <h3 className="font-semibold mb-2 font-poppins">Marques</h3>
        <div className="space-y-1">
          {brands.map((brand) => (
            <label key={brand.value} className="flex items-center gap-2">
              <Checkbox
                checked={selectedBrands.includes(brand.value)}
                onCheckedChange={() => toggleBrand(brand.value)}
              />
              <span className="text-sm">{brand.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Catégories */}
      <div>
        <h3 className="font-semibold mb-2 font-poppins">Catégories</h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <label key={cat.value} className="flex items-center gap-2">
              <Checkbox
                checked={selectedCategories.includes(cat.value)}
                onCheckedChange={() => toggleCategory(cat.value)}
              />
              <span className="text-sm">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
