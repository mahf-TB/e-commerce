"use client";

import { Checkbox } from "@/components/ui/checkbox"; // chemin généré par shadcn
import type { SelectOption } from "@/components/utils/select-form";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export type ProductFiltersProps = {
  selectedBrands: (number | string)[];
  selectedCategories: (number | string)[];
  categoriesOptions: SelectOption[];
  marquesOptions: SelectOption[];
  onChange: (filters: {
    brands: (number | string)[];
    categories: (number | string)[];
  }) => void;
};

export function ProductFilters({
  selectedBrands,
  selectedCategories,
  categoriesOptions,
  marquesOptions,
  onChange,
}: ProductFiltersProps) {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const BRAND_LIMIT = 6;
  const CATEGORY_LIMIT = 6;

  const displayedBrands = showAllBrands
    ? marquesOptions
    : marquesOptions.slice(0, BRAND_LIMIT);

  const displayedCategories = showAllCategories
    ? categoriesOptions
    : categoriesOptions.slice(0, CATEGORY_LIMIT);

  const toggleBrand = (brand: number | string) => {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    onChange({ brands: next, categories: selectedCategories });
  };

  const toggleCategory = (cat: number | string) => {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    onChange({ brands: selectedBrands, categories: next });
  };

  return (
    <div className="space-y-4">
      {/* Marques */}
      <div>
        <h3 className="font-semibold mb-2 font-poppins">Marques</h3>
        <div className="space-y-1">
          {displayedBrands.map((brand) => (
            <label key={brand.value} className="flex items-center gap-2">
              <Checkbox
                checked={selectedBrands.includes(brand.value)}
                onCheckedChange={() => toggleBrand(brand.value)}
              />
              <span className="text-sm">{brand.label}</span>
            </label>
          ))}
          
          {marquesOptions.length > BRAND_LIMIT && (
            <button
              // variant={"link"}
              type="button"
              onClick={() => setShowAllBrands((v) => !v)}
              className="text-xs text-blue-500 p-0 hover:underline"
            >
              {showAllBrands ? (
                <span className="flex items-center gap-1">
                  <Minus size={12} />
                  Voir moins
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Plus size={12} />
                  Voir plus
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Catégories */}
      <div>
        <h3 className="font-semibold mb-2 font-poppins">Catégories</h3>
        <div className="space-y-1">
          {displayedCategories.map((cat) => (
            <label key={cat.value} className="flex items-center gap-2">
              <Checkbox
                checked={selectedCategories.includes(cat.value)}
                onCheckedChange={() => toggleCategory(cat.value)}
              />
              <span className="text-sm">{cat.label}</span>
            </label>
          ))}
          {categoriesOptions.length > CATEGORY_LIMIT && (
            <button
              type="button"
              onClick={() => setShowAllCategories((v) => !v)}
              className="text-xs text-blue-500 p-0 hover:underline"
            >
              {showAllCategories ? (
                <span className="flex items-center gap-1">
                  <Minus size={12} />
                  Voir moins
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Plus size={12} />
                  Voir plus
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
