
import { useState } from "react"
import { PricingRadio } from "@/components/pricing-radio"

export function ShippingMethod() {
    const [selectedShipping, setSelectedShipping] = useState("standard")

  const shippingOptions = [
    {
      label: "Livraison standard",
      price: "3,000 Ar",
      value: "standard",
      description: "3–5 jours",
    },
    {
      label: "Livraison express",
      price: "5,000 Ar",
      value: "express",
      popular: true,
      description: "1–2 jours",
    },
    {
      label: "Recuperer aux point de vente",
      price: "0 Ar",
      value: "pickup",
      description: "",
    },
  ]
  return (
    <div className="space-y-4">
      <PricingRadio
        legend="Mode de livraison"
        options={shippingOptions}
        value={selectedShipping}
        onValueChange={setSelectedShipping}
        defaultValue="standard"
      />
    </div>
  )
}
