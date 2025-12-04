import type { Column } from "@/components/data-table";
import DataTable from "@/components/data-table";
import { ProductRow } from "./ProductRow";

const columns: Column[] = [
  { key: "name", label: "Produit" },
  { key: "category", label: "Catégorie" },
  { key: "statut", label: "Statut" },
  { key: "stock", label: "Stock" },
  { key: "price", label: "Prix" },
  { key: "created_at", label: "Création" },
  { key: "actions", label: "" },
];

const TableListeProduits = () => {
  return (
    <DataTable columns={columns}>
      <ProductRow
        id={1}
        code="FRE43D2-345"
        image="/images/article1.jpg"
        produit="Lampe de bureau LED"
        category="Éclairage"
        description="Acme Light"
        statut="inactive"
        variantes={3}
        quantite={24}
        prix={89000}
        date="25-11-2025"
        onView={(id: any) => console.log("Voir produit", id)}
        onEdit={(id: any) => console.log("Modifier produit", id)}
        onDelete={(id: any) => console.log("Supprimer produit", id)}
      />
    </DataTable>
  );
};

export default TableListeProduits;
