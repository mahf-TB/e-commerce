import type { Column } from "@/components/utils/data-table";
import DataTable from "@/components/utils/data-table";
import type { ReactNode } from "react";
// import Dropdown, { DropdownItems } from "../utils/dropdown";

const columns: Column[] = [
  { key: "name", label: "Numéro" },
  { key: "type", label: "Client" },
  { key: "address", label: "Adresse" },
  { key: "status", label: "Status" },
  { key: "montant", label: "Total" },
  { key: "paiement", label: "Paiement" },
  { key: "created_at", label: "Création" },
  { key: "actions", label: "" },
];

type TableListeOrderProps = {
  children: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  length?: number;
};

const TableListeOrder = ({
  children,
  isLoading,
  isError,
  length,
}: TableListeOrderProps) => {
  return (
    <DataTable columns={columns}>
      {isLoading && (
        <tr>
          <td colSpan={columns.length} className="px-4 py-6 text-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
              <p className="text-gray-600">Chargement des commandes...</p>
            </div>
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

export default TableListeOrder;
