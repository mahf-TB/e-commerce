import DateRangePickerComponent from "@/components/input-DateRangePicker";
import PaginationPage from "@/components/pagination-page";
import SelectForm, { type SelectOption } from "@/components/select-form";
import { PaiementRow } from "@/features/paiement/PaiementRows";
import TableListePaie from "@/features/paiement/TableListePaie";
import { useCommandeList } from "@/hooks/use-commande";
import { getDateRangeParams } from "@/utils/helpers";
import { Filter } from "lucide-react";
import React from "react";
import type { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";

const options: SelectOption[] = [
  {
    value: "all",
    label: "Touts",
  },
  {
    value: "en_attente",
    label: "En attente",
  },
  {
    value: "paye",
    label: "Payé",
  },
  {
    value: "non_paye",
    label: "Non payé",
  },
  {
    value: "remboursee",
    label: "Remboursée",
  },
  {
    value: "echoue",
    label: "Échoué",
  },
];



const Paiement = () => {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState("");
  const [page, setPage] = React.useState(1);

  const [range, setRange] = React.useState<DateRange | undefined>(undefined);
  const { items, isLoading, isError, pagination } = useCommandeList({
    page,
    limit: 5,
    etatPaiement: status === "all" ? undefined : status,
    ...getDateRangeParams(range),
  });

  return (
    <div className="flex items-start p-5 flex-col">
      <div className="flex items-center justify-between w-full mt-5">
        <h2 className="text-2xl font-semibold font-poppins">Paiements</h2>

        <div className="flex items-center gap-2">
          {/* FILTRE */}
          <div className="flex items-center rounded gap-2">
            <DateRangePickerComponent value={range} onChange={setRange} />
            <SelectForm
              labelTitle="Statut du produit"
              placeholder="Statut"
              options={options}
              value={status}
              onChange={setStatus}
              icon={Filter}
            />
          </div>
        </div>
      </div>
      {/* Liste des donnee en table */}
      <div className="mt-5 w-full">
        <TableListePaie
          isError={isError}
          isLoading={isLoading}
          length={items?.length || 0}
        >
          {items?.map((order) => (
            <PaiementRow
              customer={order.client.nom}
              image={order.client.photo || ""}
              id={order.id}
              mode={order.modePaiement || ""}
              montant={order.total}
              paiement={order.etatPaiement || ""}
              date={order.creeLe || ""}
            />
          ))}
        </TableListePaie>
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

export default Paiement;
