import { PricingRadio } from "@/components/utils/pricing-radio";

interface ShippingMethodProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

export function ShippingMethod({
  value = "standard",
  onValueChange,
}: ShippingMethodProps) {
  const shippingOptions = [
    {
      label: "Livraison standard",
      price: 5000,
      value: "standard",
      description: "3–5 jours",
    },
    {
      label: "Livraison express",
      price: 10000,
      value: "express",
      popular: true,
      description: "1–2 jours",
    },
    {
      label: "Recuperer aux point de vente",
      price: "0 Ar",
      value: "retrait_magasin",
      description: "",
    },
  ];
  return (
    <div className="space-y-4">
      <PricingRadio
        legend="Mode de livraison"
        options={shippingOptions}
        value={value}
        onValueChange={(val) => onValueChange?.(val)}
        defaultValue="standard"
      />
    </div>
  );
}
