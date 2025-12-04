"use client"

import { useState, useMemo } from "react"
import { Checkbox } from "@/components/ui/checkbox" // chemin généré par shadcn
// import tes produits depuis ton API ou un hook

type Brand = { id: number; name: string }
type Category = { id: number; name: string }

const brands: Brand[] = [
  { id: 1, name: "Samsung" },
  { id: 2, name: "Apple" },
  { id: 3, name: "Sony" },
  { id: 4, name: "LG" },
  { id: 5, name: "Xiaomi" },
]

const categories: Category[] = [
  { id: 1, name: "Smartphones" },
  { id: 2, name: "Ordinateurs portables" },
  { id: 3, name: "Tablettes" },
  { id: 4, name: "Télévisions" },
  { id: 5, name: "Casques audio" },
  { id: 6, name: "Enceintes" },
  { id: 7, name: "Accessoires (câbles, chargeurs…)" },
]

export function ProductFilters() {
  const [selectedBrands, setSelectedBrands] = useState<number[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

  const toggleBrand = (brand: number) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const toggleCategory = (cat: number) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  return (
    <div className="space-y-4">
      {/* Marques */}
      <div>
        <h3 className="font-semibold mb-2 font-poppins">Marques</h3>
        <div className="space-y-1">
          {brands.map((brand) => (
            <label key={brand.id} className="flex items-center gap-2">
              <Checkbox
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={() => toggleBrand(brand.id)}
              />
              <span className="text-sm">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Catégories */}
      <div>
        <h3 className="font-semibold mb-2 font-poppins">Catégories</h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2">
              <Checkbox
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
              <span className="text-sm">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
