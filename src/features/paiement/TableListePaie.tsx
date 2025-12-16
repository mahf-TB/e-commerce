import type { Column } from "@/components/data-table";
import DataTable from "@/components/data-table";
import type { ReactNode } from "react";
// import Dropdown, { DropdownItems } from "../utils/dropdown";

const columns: Column[] = [
  { key: "numm", label: "Transaction ID" },
  { key: "status", label: "Status" },
  { key: "montant", label: "Montant" },
  { key: "paiement", label: "Paiement" },
  { key: "client", label: "Client" },
  { key: "created_at", label: "Création" },
  { key: "actions", label: "" },
];

type TableListePaieProps = {
  children: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  length?: number;
};

const TableListePaie = ({
  children,
  isLoading,
  isError,
  length,
}: TableListePaieProps) => {
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

export default TableListePaie;
