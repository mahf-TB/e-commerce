import { Button } from "@/components/ui/button";
import type { Column } from "@/components/utils/data-table";
import PaginationPage from "@/components/utils/pagination-page";
import SearchInput from "@/components/utils/search-input";
import SegmentedControl, {
  type SegmentOption,
} from "@/components/utils/segmented-control";
import AddUserModal from "@/features/user/AddUserModal";
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
  { key: "role", label: "Rôle" },
  { key: "status", label: "Status" },
  { key: "created_at", label: "Création" },
  { key: "actions", label: "" },
];

const UserStaff = () => {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const { items, pagination, isLoading, isError } = useUsersList({
    statut: status !== "all" ? status : "",
    search,
    page,
    role: "admin,manager,support",
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
              labelTitle="Statut de l'utilisateur"
              placeholder="Statut"
              options={userStatusOptions}
              value={status}
              onChange={handleSetStatut}
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

          <AddUserModal
            title="Ajouter un utilisateur"
            description="Créer un nouveau compte utilisateur dans le système"
            trigger={
              <Button className="flex items-center gap-1 rounded bg-gray-950 text-white px-5 py-2">
                <Plus size={18} />
                <span>Nouveau</span>
              </Button>
            }
          />
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
              userId={user.id}
              adresse={user.adresse || ""}
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



// Wrapper export : vérifie le rôle avant d'afficher le dashboard
import RequireRole from "@/components/utils/RequireRole";

export default function UserPageWrapper() {
  return (
    <RequireRole allowedRoles={["admin"]}>
      <UserStaff />
    </RequireRole>
  );
}