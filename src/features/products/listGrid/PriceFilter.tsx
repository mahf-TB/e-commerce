"use client"

import { useEffect, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { formatPrice } from "@/utils/helpers"

type PriceFilterProps = {
  value: [number, number]
  onChange: (range: [number, number]) => void
}

export function PriceFilter({ value, onChange }: PriceFilterProps) {
  const [localRange, setLocalRange] = useState<[number, number]>(value)

  // Keep local slider state in sync when parent updates externally
  useEffect(() => {
    setLocalRange(value)
  }, [value])

  // Debounce emission to parent to avoid spamming requests while sliding
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localRange)
    }, 300)
    return () => clearTimeout(timer)
  }, [localRange, onChange])

  const handleChange = (next: number[]) => {
    setLocalRange([next[0], next[1]] as [number, number])
  }

  return (
    <div className="space-y-3">
        <h3 className="font-semibold mb-2 font-poppins">Marge prix</h3>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{formatPrice(localRange[0])} </span>
        <span>{formatPrice(localRange[1])} </span>
      </div>

      <Slider
        value={localRange}
        min={0}
        max={10000000}
        step={1}
        onValueChange={handleChange}
        className="w-full"
      />
    </div>
  )
}
