import type { Column } from "@/components/data-table";
import DataTable from "@/components/data-table";
import type { ReactNode } from "react";

const columns: Column[] = [
  { key: "name", label: "Produit" },
  { key: "category", label: "Catégorie" },
  { key: "variants", label: "Variantes" },
  { key: "stock", label: "Stock" },
  { key: "price", label: "Prix (à partir de)" },
  { key: "rating", label: "Note" },
  { key: "status", label: "Statut" },
  { key: "created_at", label: "Création" },
  { key: "actions", label: "" },
];

type TableListeProduitsProps = {
  children: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  length?: number;
};

const TableListeProduits = ({
  children,
  isLoading,
  isError,
  length,
}: TableListeProduitsProps) => {
  return (
    <DataTable columns={columns}>
      {isLoading && (
        <tr>
          <td colSpan={columns.length} className="px-4 py-6 text-center">
            Chargement...
          </td>
        </tr>
      )}

      {isError && (
        <tr>
          <td
            colSpan={columns.length}
            className="px-4 py-6 text-center text-red-600"
          >
            Erreur lors du chargement des produits
          </td>
        </tr>
      )}

      {!isLoading && !isError && length === 0 && (
        <tr>
          <td colSpan={columns.length} className="px-4 py-6 text-center">
            Aucun produit
          </td>
        </tr>
      )}
      {children}
    </DataTable>
  );
};

export default TableListeProduits;
