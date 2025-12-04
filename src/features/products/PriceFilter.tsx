"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

export function PriceFilter() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  const handleChange = (value: number[]) => {
    setPriceRange([value[0], value[1]] as [number, number])
  }

  return (
    <div className="space-y-3">
        <h3 className="font-semibold mb-2 font-poppins">Marge prix</h3>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{priceRange[0]} MGA</span>
        <span>{priceRange[1]} MGA</span>
      </div>

      <Slider
        value={priceRange}
        min={0}
        max={100000}
        step={1}
        onValueChange={handleChange}
        className="w-full"
      />
    </div>
  )
}
