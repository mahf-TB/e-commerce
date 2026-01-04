import { Button } from "@/components/ui/button";
import PaginationPage from "@/components/utils/pagination-page";
import SearchInput from "@/components/utils/search-input";
import SelectForm from "@/components/utils/select-form";
import { ProductRow } from "@/features/products/tableaux/ProductRow";
import TableListeProduits from "@/features/products/tableaux/TableListeProduits";
import { useProductList } from "@/hooks/use-product";
import { productStatusOptions, sortOptions } from "@/utils/options";
import { Filter, Plus, SortDesc } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("newest");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { items, pagination, isLoading, isError } = useProductList({
    page,
    limit,
    sort,
    q: search,
    statut: status,
  });

  const hanleSetStatut = (statut: string) => {
    if (statut === "all") {
      setStatus("");
      setPage(1);
      return;
    }
    setStatus(statut);
    setPage(1); // Reset to first page on filter change
  };

  return (
    <div className="flex items-start p-5 flex-col">
      <div className="flex items-center justify-between w-full mt-5">
        <span className="text-xl font-black font-poppins">{pagination?.totalItems} Produits</span>
        <div className="flex items-center gap-2">
          {/* FILTRE */}
          <div className="flex items-center rounded gap-2">
            <SearchInput value={search} onChange={setSearch} />
            <SelectForm
              labelTitle="Statut du produit"
              placeholder="Statut"
              options={productStatusOptions}
              value={status}
              onChange={hanleSetStatut}
              icon={Filter}
            />

            <SelectForm
              labelTitle="Trier par"
              placeholder="Trier par"
              options={sortOptions}
              value={sort}
              onChange={setSort}
              icon={SortDesc}
            />
          </div>
          <Button
            onClick={() => navigate("ajouter")}
            className="flex items-center gap-1 rounded bg-gray-950 text-white px-5 py-2"
          >
            <Plus size={18} />
            <span className="">Nouveau</span>
          </Button>
        </div>
      </div>
      {/* Liste des donnee en table */}
      <div className="mt-5 w-full">
        <TableListeProduits
          isError={isError}
          isLoading={isLoading}
          length={items?.length || 0}
        >
          {items &&
            items.map((p) => (
              <ProductRow
                key={p.id}
                id={p.id}
                code={String(p.code)}
                image={p.imagePrincipale ?? "/images/default-product.jpg"}
                produit={p.nom}
                category={p.categorieNom ?? "-"}
                description={p.marqueNom ?? ""}
                statut={p.statut}
                variantes={p.variantsCount}
                quantite={p.stockTotal}
                prix={p.minPrice}
                nombreAvis={p.nombreAvis}
                noteMoyenne={p.noteMoyenne}
                date={p.createdAt}
                onView={(id) => console.log("Voir produit", id)}
                onEdit={(id) => navigate(`${id}`)}
                onDelete={(id) => console.log("Supprimer produit", id)}
              />
            ))}
        </TableListeProduits>
        <PaginationPage
          isList
          currentPage={page}
          totalPages={pagination?.totalPages || 1}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
};

export default Products;
