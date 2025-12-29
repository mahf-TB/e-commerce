import type { Column } from "@/components/data-table";
import PaginationPage from "@/components/pagination-page";
import SearchInput from "@/components/search-input";
import SegmentedControl, {
    type SegmentOption,
} from "@/components/segmented-control";
import { Button } from "@/components/ui/button";
import TableListeUser from "@/features/user/TableListeUser";
import { UserRows } from "@/features/user/UserRows";
import { useUsersList } from "@/hooks/use-users";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const options: SegmentOption[] = [
  {
    value: "all",
    label: <span className="flex items-center gap-2">Touts</span>,
  },
  {
    value: "active",
    label: <span className="flex items-center gap-2">Active</span>,
  },
  {
    value: "inactive",
    label: <span className="flex items-center gap-2">Inactive</span>,
  },
  {
    value: "banned",
    label: <span className="flex items-center gap-2">Banned</span>,
  },
];

const columns: Column[] = [
  { key: "noms", label: "Noms" },
  { key: "adresse", label: "Adresse" },
  { key: "tele", label: "Téléphone" },
  { key: "role", label: "Rôle" },
  { key: "status", label: "Status" },
  { key: "created_at", label: "Création" },
  { key: "actions", label: "" },
];

const Customer = () => {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const { items, pagination, isLoading, isError } = useUsersList({
    statut: status !== "all" ? status : "",
    search,
    page,
    role:"customer,guest"
  });

  return (
    <div className="flex items-start p-5 flex-col">
      <div className="flex items-center justify-between w-full mt-5">
        <SegmentedControl
          options={options}
          value={status}
          onValueChange={setStatus}
          className="m-0"
          itemsLength={pagination?.totalItems?.toString() ?? "0"}
        />
        <div className="flex items-center gap-2">
          {/* FILTRE */}
          <div className="flex items-center rounded gap-2">
            <SearchInput value={search} onChange={setSearch} />
            {/* <SelectForm
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
            /> */}
          </div>
          <Button
            onClick={() => navigate("ajouter")}
            disabled
            className="flex items-center gap-1 rounded bg-gray-950 text-white px-5 py-2"
          >
            <Plus size={18} />
            <span className="">Nouveau</span>
          </Button>
        </div>
      </div>
      {/* Liste des donnee en table */}
      <div className="mt-5 w-full">
        <TableListeUser
          columns={columns}
          isError={isError}
          isLoading={isLoading}
          length={items?.length || 0}
        >
          {items?.map((user) => (
            <UserRows
            isClient={true}
              userId={user.id}
              adresse={user.adresse || ""}
              telephone={user.telephone || ""}
              email={user.email || ""}
              photo={user.photo || ""}
              prenom={user.prenom || ""}
              role={user.role || ""}
              nom={user.nom || ""}
              username={user.username || ""}
              status={user.statut || ""}
              date={user.createdAt || ""}
            />
          ))}
        </TableListeUser>
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

export default Customer;
