import BadgeItem from "@/components/BadgeItem";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { CommandeStatusStepper } from "@/features/orders/commande/commande-status-stepper";
import useAuthUser from "@/hooks/use-auth-user";
import { showToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { changeCommandeStatut } from "@/services/commandeService";
import type { StatutCommande } from "@/types/order";
import {
  formatDateTime,
  formatPrice,
  hasAdminAccess,
  isClient,
} from "@/utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import ProductOrder from "./ProductOrder";

const colorByPaiement = {
  en_attente: "red-500",
  paye: "green-500",
  remboursee: "purple-500",
} as Record<string, string>;

const BadgeByPaiement = {
  en_attente: "Non payé",
  paye: "Payé",
  remboursee: "Remboursée",
} as Record<string, string>;

export const DetailCommande = ({
  order,
  className,
  onCancel,
}: {
  order: any;
  className?: string;
  onCancel?: () => void;
}) => {
  const client = order?.client || {};
  const queryClient = useQueryClient();
  const { user } = useAuthUser();

  const changeStatutMutation = useMutation({
    mutationFn: ({
      commandeId,
      statutCommande,
    }: {
      commandeId: string;
      statutCommande: StatutCommande;
    }) => changeCommandeStatut(commandeId, { statutCommande }),
    onSuccess: () => {
      showToast("success", "Statut de la commande mis à jour avec succès");
      queryClient.invalidateQueries({
        queryKey: ["commandes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["commandes", order?.id],
      });
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message ||
          "Erreur lors de la mise à jour du statut"
      );
    },
  });

  const handleChangeStatut = (nouveauStatut: StatutCommande) => {
    if (!order?.id) return;
    changeStatutMutation.mutate({
      commandeId: order.id,
      statutCommande: nouveauStatut,
    });
  };

  const handleConfirmer = () => {
    // Si commande en attente -> passer en préparation
    if (order?.statut === "en_attente") {
      handleChangeStatut("en_preparation");
    }
    // Si en préparation -> expédier
    else if (order?.statut === "en_preparation") {
      handleChangeStatut("expediee");
    }
    // Si expédiée -> livrer
    else if (order?.statut === "expediee") {
      handleChangeStatut("livree");
    } 
     // Si livrée -> completed
    else if (order?.statut === "livree") {
      handleChangeStatut("completed");
    }
  };

  const handleAnnuler = () => {
    handleChangeStatut("annulee");
  };

  return (
    <div className={cn("p-4 md:w-3/4 w-full mt-5  px-6 rounded", className)}>
      <div className="flex items-center justify-between mb-4 sticky ">
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            size="icon"
            className="rounded"
            onClick={onCancel}
          >
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h2 className="text-xl font-poppins font-bold flex items-center gap-5">
              <span>{order?.reference}</span>
              <BadgeItem
                statut={BadgeByPaiement[order?.etatPaiement] || "gray-400"}
                className={`bg-${
                  colorByPaiement[order?.etatPaiement] || "gray-400"
                }`}
              />
            </h2>
            <p className="text-sm text-muted-foreground">
              Crée le {order?.creeLe ? formatDateTime(order.creeLe) : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {order?.statut !== "annulee" && order?.statut !== "livree" && (
            <Button
              variant={"destructive"}
              size={"sm"}
              className="text-sm px-8 rounded"
              onClick={handleAnnuler}
              disabled={changeStatutMutation.isPending}
            >
              Annuler
            </Button>
          )}
          {hasAdminAccess(user?.role) &&
            order?.statut !== "annulee" &&
            order?.statut !== "livree" && (
              <Button
                size={"sm"}
                className="text-sm px-8 rounded bg-blue-600"
                onClick={handleConfirmer}
                disabled={changeStatutMutation.isPending}
              >
                {changeStatutMutation.isPending
                  ? "Chargement..."
                  : order?.statut === "en_attente"
                  ? "Préparer la commande"
                  : order?.statut === "en_preparation"
                  ? "Expédier"
                  : "Livrer"}
              </Button>
            )}
          {isClient(user?.role) && order?.statut === "livree" && (
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={handleConfirmer}
              disabled={changeStatutMutation.isPending}
              className="text-sm text-green-600 hover:text-green-600 font-medium rounded border-green-500"
            >
              Commande livrée
            </Button>
          )}
        </div>
      </div>
      {order ? (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-6 overflow-y-auto">
          {/* Section left pour les articles */}
          <div>
            <h3 className="font-bold font-poppins">Produits</h3>
            <div className="mt-2 grid  gap-2">
              {order.items?.map((item: any, idx: number) => (
                <ProductOrder
                  key={idx}
                  id={item.id}
                  image="/images/default-product.jpg"
                  nom={item.nomProduit}
                  code={item.codeVariant}
                  prix={item.prixUnitaire}
                  quantite={item.quantite}
                />
              ))}
              {/* Totaux */}
              <div className="space-y-2 text-sm p-2">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{formatPrice(order.total - order.frais)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remise</span>
                  <span>{formatPrice(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de livraison</span>
                  <span>{formatPrice(order.frais)}</span>
                </div>

                <div className="flex justify-between font-semibold pt-2 border-t border-gray-300 mt-2">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Section right pour les details de la commande */}
          <div className="space-y-3">
            {!isClient(user?.role) && (
              <div className="bg-white p-2 rounded-md flex items-center gap-4">
                <UserAvatar src={client.photo || ""} />
                <div className="">
                  <h3 className="font-poppins">{client.nom}</h3>
                  <h3 className="font-poppins text-xs text-muted-foreground">
                    {client.email}
                  </h3>
                </div>
              </div>
            )}

            <div className="bg-white p-4 rounded-md">
              <h3 className="font-poppins font-bold mb-2">
                Status d'une commande
              </h3>
              <CommandeStatusStepper statut={order?.statut} />
            </div>
            <div className="bg-white p-4 rounded-md">
              <h3 className="font-bold font-poppins mb-2">Livraison</h3>
              <div className="grid grid-cols-[120px_1fr] gap-3 text-sm text-left">
                <span className="text-muted-foreground">Type de livraison</span>
                <span className="font-medium">{order?.typeLivraison}</span>
                <span className="text-muted-foreground">Destinataire</span>
                <span className="font-medium">{order?.nomDestinataire}</span>
                <span className="text-muted-foreground">Téléphone</span>
                <span className="font-medium">
                  {order?.contactDestinataire}
                </span>
                <span className="text-muted-foreground">Adresse</span>
                <span className="font-medium">{order?.adresseLivraison}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Aucune commande sélectionnée</div>
      )}
    </div>
  );
};
