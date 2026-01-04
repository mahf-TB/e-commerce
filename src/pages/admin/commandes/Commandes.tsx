import { Button } from "@/components/ui/button";
import DateRangePickerComponent from "@/components/utils/input-DateRangePicker";
import PaginationPage from "@/components/utils/pagination-page";
import StatisticGrid, { type Stat } from "@/components/utils/statistic-grid";
import { OrderRow } from "@/features/orders/tableaux/OrderRows";
import OrderStatusFilter from "@/features/orders/tableaux/OrderStatusFilter";
import TableListe from "@/features/orders/tableaux/TableListe";
import useAuthUser from "@/hooks/use-auth-user";
import {
  useAnnulerCommande,
  useCommandeList,
  useCommandeStats,
} from "@/hooks/use-commande";
import { formatPrice, getDateRangeParams, isAdmin } from "@/utils/helpers";
import {
  Banknote,
  Download,
  Landmark,
  Package,
  PackageCheck,
  Plus,
} from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";

const getFilterStatut = (status: string) => {
  if (
    status === "en_attente" ||
    status === "en_preparation" ||
    status === "expediee" ||
    status === "livree" ||
    status === "annulee"
  ) {
    return status;
  }
  return undefined;
};

const getFilterPaiement = (status: string) => {
  if (status === "remboursee" || status === "non_paye" || status === "paye") {
    return status;
  }
  return undefined;
};

const Commande = () => {
  const { user } = useAuthUser();
  const navigate = useNavigate();
  const annulerCommandeMutation = useAnnulerCommande();
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const dateParams = getDateRangeParams(range);

  const { items, isLoading, isError, pagination } = useCommandeList({
    page,
    limit: 7,
    search,
    statutCommande: getFilterStatut(status),
    etatPaiement: getFilterPaiement(status),
    ...dateParams,
  });

  console.log(items);
  
  const handleAnnuler = (id: string) => {
    if (!id) return;
    annulerCommandeMutation.mutate({
      commandeId: id,
    });
  };

  return (
    <div className="flex items-start">
      <div className="p-4 md:w-4/4  w-full mt-5 space-y-6">
        {isAdmin(user?.role) && <AdminStatistics />}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <OrderStatusFilter
              selectedValue={status}
              handleSelect={setStatus}
              value={search}
              onChange={setSearch}
            />
            {/* FILTRE */}
            <DateRangePickerComponent value={range} onChange={setRange} />
          </div>
          <div className="flex items-start gap-2">
            <Button
              onClick={() => console.log("hello")}
              className="flex items-center gap-1 rounded bg-blue-500 hover:bg-blue-500/80 text-white px-5 py-2"
            >
              <Download size={18} />
              <span className="">Export</span>
            </Button>
            <Button
            disabled
              onClick={() => console.log("hello")}
              className="flex items-center gap-1 rounded bg-gray-950 text-white px-5 py-2"
            >
              <Plus size={18} />
              <span className="">Nouvelle commande</span>
            </Button>
          </div>
        </div>
        <div className="mt-5">
          <TableListe
            isLoading={isLoading}
            isError={isError}
            length={items.length}
          >
            {items.length > 0 &&
              items.map((order, index) => (
                <OrderRow
                  key={index}
                  orderId={order.id}
                  orderNumber={order.reference}
                  customer={order.client.nom}
                  email={order.client.email}
                  image={order.client.photo || ""}
                  status={order.statut}
                  paiement={order.etatPaiement}
                  adresse={order?.adresseLivraison || "N/A"}
                  totalArticles={order.items.length}
                  total={order.total}
                  date={order.creeLe}
                  onView={(id) =>navigate(`/admin/commande/${id}`)}
                  onDelete={(id) => handleAnnuler(id as string)}
                />
              ))}
          </TableListe>
          <PaginationPage
            isList
            currentPage={page}
            totalPages={pagination?.totalPages || 1}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>
      {/* <div className="p-4 w-1/4 border-l h-screen hidden md:flex flex-col items-center">
        <span className="text-lg font-black font-poppins  whitespace-nowrap">
          Statistiques des commandes
        </span>
        <div>
          <SemiCircleChart stats={orderStats} />
        </div>
      </div> */}
    </div>
  );
};

export default Commande;

const AdminStatistics = () => {
  // Récupérer les statistiques dynamiques
  const { data: statsData } = useCommandeStats();

  // Mapper les données backend vers le format Stat[]
  const stats: Stat[] = [
    {
      title: "Commandes totales",
      value: statsData?.general?.totalCommandes || 0,
      subtitle: "Nombre total de commandes créées sur la période",
      icon: Package,
      color: "text-green-600",
    },
    {
      title: "Chiffre d'affaires",
      value: formatPrice(statsData?.revenus?.total) || 0,
      subtitle: "Montant total des commandes payées",
      icon: Landmark,
      color: "text-yellow-600",
    },
    {
      title: "Commandes livrées",
      value: statsData?.general?.commandesParStatut?.livree?.count || 0,
      subtitle: "Commandes livrées avec succès aux clients.",
      icon: PackageCheck,
      color: "text-blue-600",
    },
    {
      title: "Revenu des frais",
      value: formatPrice(statsData?.revenus?.totalFrais) || 0,
      subtitle: "Montant total des frais de livraison perçus.",
      icon: Banknote,
      color: "text-violet-600",
    },
  ];
  return <StatisticGrid stats={stats} className="p-0 lg:p-0  max-md:hidden" />;
};
