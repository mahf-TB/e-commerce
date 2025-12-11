import InputForm from "@/components/input-form";
import SegmentedControl from "@/components/segmented-control";
import { Search } from "lucide-react";
import  { useState } from "react";
import { OrderCard } from "@/features/orders/myOrder/OrderCard";
import { OrderCardSkeleton } from "@/features/orders/skeleton/OrderCardSkeleton";
import type { CommandeClient } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { listMesCommande } from "@/services/commandeService";
import type { Paginated } from "@/types";

const options = [
  { value: "all", label: "Tous" },
  { value: "en_attente", label: "En attente" },
  { value: "en_preparation", label: "En préparation" },
  { value: "expediee", label: "Expédiée" },
  { value: "livree", label: "Livrée" },
];

const MyOrderPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", statusFilter, searchQuery],
    queryFn: () =>
      listMesCommande({
        page: 1,
        limit: 20,
        search: searchQuery || undefined,
        statutCommande: statusFilter !== "all" ? statusFilter : undefined,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  } as any);

  const commandes = (data as Paginated<CommandeClient>)?.items || [];

  return (
    <div>
      {/* Filtres et recherche */}
      <div className="mb-4 flex gap-4 items-center justify-between flex-wrap">
        
        <InputForm
          placeholder="Recherche commande..."
          className="bg-white"
          iconLeft={<Search size={16} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SegmentedControl
          options={options}
          value={statusFilter}
          onValueChange={setStatusFilter}
        />
      </div>

      {/* État de chargement */}
      {isLoading && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </section>
      )}

      {/* Erreur */}
      {isError && (
        <div className="text-center text-red-500 py-8">
          Une erreur est survenue lors du chargement des commandes.
        </div>
      )}

      {/* Liste des commandes */}
      {!isLoading && !isError && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {commandes.length > 0 ? (
            commandes.map((order) => <OrderCard key={order.id} order={order} />)
          ) : (
            <div className="text-center text-gray-500 py-8 col-span-full">
              Aucune commande trouvée.
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default MyOrderPage;
