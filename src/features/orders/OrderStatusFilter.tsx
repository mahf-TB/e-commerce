import ReusableSelect from "@/components/select-form";
import SearchInput from "@/components/search-input";
import React from "react";

const orderStatusOptions = [
  { label: "Toutes", value: "all" },
  { label: "En attente", value: "pending" },
  { label: "En traitement", value: "processing" },
  { label: "Expédiée", value: "shipped" },
  { label: "Livrée", value: "delivered" },
  { label: "Remboursée", value: "options" },
  { label: "Annulée", value: "cancelled" },
];

interface OrderStatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const OrderStatusFilter: React.FC<OrderStatusFilterProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center rounded gap-2">
      <SearchInput />
      <ReusableSelect
        placeholder="Statut commande"
        options={orderStatusOptions}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default OrderStatusFilter;
