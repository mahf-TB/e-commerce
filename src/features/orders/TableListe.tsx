import type { Column } from "@/components/data-table";
import DataTable from "@/components/data-table";
import { OrderRow } from "./OrderRows";
// import Dropdown, { DropdownItems } from "../utils/dropdown";


const columns: Column[] = [
  { key: "name", label: "Numéro" },
  { key: "type", label: "Client" },
  { key: "address", label: "Adresse" },
  { key: "status", label: "Status" },
  { key: "items", label: "Articles" },
  { key: "montant", label: "Total" },
  { key: "created_at", label: "Création" },
  { key: "actions", label: "" },
];

const TableListe = () => {
  return (
    <DataTable columns={columns}>
      <OrderRow
        id={1}
        orderNumber="#12345"
        customer="Jean Rakoto"
        email="jean@example.com"
        status="En attente"
        totalArticles={2}
        total={29000}
        date="25-11-2025"
        onView={(id) => console.log("Voir", id)}
        onDelete={(id) => console.log("Supprimer", id)}
      />
    </DataTable>
  );
};

export default TableListe;

