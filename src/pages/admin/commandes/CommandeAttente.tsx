import InputForm from "@/components/input-form";
import SegmentedControl, {
  type SegmentOption,
} from "@/components/segmented-control";
import { CommandeCard } from "@/features/orders/commande/CommandeCard";
import { DetailCommande } from "@/features/orders/commande/DetailCommande";
import { CommandeCardSkeleton } from "@/features/orders/skeleton/CommandeCardSkeleton";
import { DetailCommandeSkeleton } from "@/features/orders/skeleton/DetailCommandeSkeleton";
import useAuthUser from "@/hooks/use-auth-user";
import { useCommande, useCommandeList } from "@/hooks/use-commande";
import { cn } from "@/lib/utils";
import { Clock, Loader, PackageX, Search } from "lucide-react";
import { useState } from "react";


const options: SegmentOption[] = [
  {
    value: "en_attente",
    label: <span className="flex items-center gap-2">En attente</span>,
    icon: <Clock size={16} />,
  },
  {
    value: "en_preparation",
    label: <span className="flex items-center gap-2">En traitement</span>,
    icon: <Loader size={16} />,
  },
];

const CommandeAttente = () => {
  const { user } = useAuthUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("en_attente");
  const [isHide, setIsHide] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const { items, isLoading } = useCommandeList({
    statutCommande: statusFilter === "en_attente" ? "en_attente" : "expediee,en_preparation,livree",
    search: searchTerm || "",
    traiter: statusFilter !== "en_attente" ? user.id : "",
  });
  const { data: selectedOrderItems } = useCommande(selectedOrder?.id);

  return (
    <div className="flex items-start bg-gray-100">
      <div
        className={cn(
          "w-2/6 border-r hidden md:flex flex-col items-start p-0 h-screen sticky top-0 bg-white",
          !isHide && "w-full border-r"
        )}
      >
        {/* Search header */}
        <div
          className={cn(
            "space-y-3 w-full p-5 pb-3  mt-4",
            !isHide && "flex items-end justify-between"
          )}
        >
          {!isHide && (
            <span className="text-lg font-black font-poppins  whitespace-nowrap m-0">
              File d’attente des commandes
            </span>
          )}
          <div className={cn("flex items-center gap-5")}>
            <InputForm
              placeholder="Rechercher une commande"
              iconLeft={<Search size={16} />}
              className="w-full"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              containerClassName=""
            />
            <SegmentedControl
              options={options}
              value={statusFilter}
              onValueChange={setStatusFilter}
              className="m-0"
              showLabenl={!isHide}
            />
          </div>
        </div>
        {/* List des commandes en file d'attente */}
        <div
          className={`w-full overflow-y-auto grid gap-4 p-5 pt-2 ${
            isHide ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {isLoading ? (
            // Afficher 6 skeletons pendant le loading
            Array.from({ length: 6 }).map((_, idx) => (
              <CommandeCardSkeleton key={`skeleton-${idx}`} />
            ))
          ) : items && items.length > 0 ? (
            // Afficher les cartes si données disponibles
            items.map((order) => (
              <CommandeCard
                key={order.id}
                order={order}
                onClick={() => {
                  setSelectedOrder(order);
                  setIsHide(true);
                }}
                selected={selectedOrder?.id === order.id}
              />
            ))
          ) : (
            // Afficher message vide
            <div className="col-span-full flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4 max-w-md text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gray-200 rounded-full blur-xl opacity-50"></div>
                  <div className="relative bg-gray-100 p-6 rounded-full">
                    <PackageX className="text-gray-400" size={48} strokeWidth={1.5} />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    Aucune commande {statusFilter === "en_attente" ? "en attente" : "en traitement"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {statusFilter === "en_attente" 
                      ? "Les nouvelles commandes apparaîtront ici"
                      : "Aucune commande en cours de traitement pour le moment"
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Detail des commande */}
      {isHide &&
        (selectedOrderItems ? (
          <DetailCommande
            order={selectedOrderItems}
          />
        ) : (
          <DetailCommandeSkeleton />
        ))}
    </div>
  );
};

export default CommandeAttente;
