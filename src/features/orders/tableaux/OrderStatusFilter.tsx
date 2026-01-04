import SearchInput from "@/components/utils/search-input";
import SelectForm from "@/components/utils/select-form";
import React from "react";

const orderStatusOptions = [
  { label: "Toutes", value: "all" },
  { label: "En attente", value: "en_attente" },
  { label: "Payée", value: "paye" },
  { label: "En traitement", value: "en_preparation" },
  { label: "Expédiée", value: "expediee" },
  { label: "Livrée", value: "livree" },
  { label: "Non Payée", value: "non_paye" },
  { label: "Remboursée", value: "remboursee" },
  { label: "Annulée", value: "annulee" },
];

interface OrderStatusFilterProps {
  value: string;
  onChange: (value: string) => void;
  selectedValue: string;
  handleSelect: (value: string) => void;
}

const OrderStatusFilter: React.FC<OrderStatusFilterProps> = ({
  value,
  selectedValue,
  onChange,
  handleSelect,
}) => {
  return (
    <div className="flex items-center rounded gap-2">
      <SearchInput onChange={onChange} value={value} />
      <SelectForm
        placeholder="Statut commande"
        options={orderStatusOptions}
        value={selectedValue}
        onChange={handleSelect}
        className="w-[200px]"
      />
    </div>
  );
};

export default OrderStatusFilter;
