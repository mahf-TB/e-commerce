import PaginationPage from "@/components/pagination-page";
import ReusableSelect from "@/components/select-form";
import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import TableListeProduits from "@/features/products/TableListeProduits";
import { Filter, Plus, SortDesc } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const orderStatusOptions = [
  { label: "active", value: "active" },
  { label: "inactive", value: "inactive" },
  { label: "En traitement", value: "archived" },
];
const Products = () => {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState("");
  const [page, setPage] = useState(1);
  return (
    <div className="flex items-start p-5 flex-col">
      <div className="flex items-center justify-between w-full mt-5">
        <span className="text-xl font-black font-poppins">Produits</span>
        <div className="flex items-center gap-2">
          {/* FILTRE */}
          <div className="flex items-center rounded gap-2">
            <SearchInput />

            <ReusableSelect
              labelTitle="Status"
              placeholder="Statut Produit"
              options={orderStatusOptions}
              value={status}
              onChange={setStatus}
              icon={Filter}
            />

            <ReusableSelect
              labelTitle="Status"
              placeholder="Tirer par"
              options={orderStatusOptions}
              value={status}
              onChange={setStatus}
              icon={SortDesc}
            />
          </div>
          <Button
            onClick={() => navigate('ajouter')}
            className="flex items-center gap-1 rounded bg-gray-950 text-white px-2 py-2"
          >
            <Plus size={18} />
            <span className="">Nouveaux</span>
          </Button>
        </div>
      </div>
      <div className="mt-5 w-full">
          <TableListeProduits />
          <PaginationPage
            isList
            currentPage={page}
            totalPages={10}
            onPageChange={(p) => setPage(p)}
          />
        </div>
    </div>
  );
};

export default Products;
