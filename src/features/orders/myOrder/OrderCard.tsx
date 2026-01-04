"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Dropdown, { DropdownItems } from "@/components/utils/dropdown";
import { OrderProgressBar } from "@/components/utils/OrderProgressBar";
import Tooltips from "@/components/utils/tooltips";
import { useDownloadFacture } from "@/hooks/use-commande";
import { cn } from "@/lib/utils";
import type { CommandeClient } from "@/types/order";
import {
  formatDate,
  formatPrice,
  getLibelleStatut,
  getStatusColorClass,
} from "@/utils/helpers";
import {
  Calendar,
  Download,
  Info,
  Loader2,
  MapPin,
  MoreHorizontal,
  User,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type OrderCardProps = {
  order: CommandeClient;
};

export function OrderCard({ order }: OrderCardProps) {
  const downloadFactureMutation = useDownloadFacture();
  const navigate = useNavigate();
  const handleDownload = (commandeId: string, reference: string) => {
    downloadFactureMutation.mutate({ commandeId, reference });
  };
  return (
    <Card className="w-full p-5 rounded-sm shadow-none gap-3">
      <CardContent className="p-0  border-gray-300">
        {/* En-tête infos principales */}
        <div className="flex items-start justify-between mb-4 ">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between ">
              <div className="text-base text-gray-600 font-semibold font-poppins tracking-wide uppercase">
                N°: {order.reference}
              </div>
              <div className="flex items-center gap-2">
                <Dropdown
                  btnShow={
                    <Button variant="ghost" size="icon" className="rounded-md">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  }
                >
                  <DropdownItems
                    icon={<Info size={16} />}
                    title="Voir details"
                    onClick={() => navigate(`/account/orders/${order.id}`)}
                  />
                  <DropdownItems
                    icon={<Download size={16} />}
                    title="Télécharger la facture"
                     onClick={() => handleDownload(order.id, order.reference)}
                  />
                  {
                    !["annulee", "expediee", "livree", "completed"].includes(
                      order.statut
                    ) && (
                      <DropdownItems
                        icon={<X size={16} />}
                        variant="destructive"
                        title="Annuler la commande"
                        onClick={() => navigate(`/account/orders/${order.id}`)}
                      />
                    )
                  }
                  
                </Dropdown>
              </div>
            </div>
            <Tooltips text={getLibelleStatut(order.statut)}>
              <OrderProgressBar statut={order.statut} />
            </Tooltips>
            <div className="text-xs text-foreground flex items-center gap-2">
              <Calendar className="size-3.5 inline-block" />
              <div className="text-xs text-foreground">
                {formatDate(order.creeLe)}
              </div>
              <Badge
                className={cn(getStatusColorClass(order.statut))}
                variant="outline"
              >
                {getLibelleStatut(order.statut)}
              </Badge>
            </div>
            <div className="text-xs text-foreground flex items-center gap-2">
              <User className="size-3.5  inline-block" />
              <div className="text-xs text-foreground">
                {order.nomDestinataire}
              </div>
            </div>
          </div>
        </div>

        {/* Adresse / info */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="size-3.5 inline-block" />
          <div className="text-xs text-foreground">
            {order.adresseLivraison}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="size-3.5 text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex gap-3 w-50 text-muted ">
                  Adresse utilisée pour cette commande. Vous pouvez la modifier
                  dans votre profil pour les prochaines commandes.
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Titre liste des articles */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="text-xs text-muted-foreground tracking-wide uppercase">
            Articles de la commande
          </div>
          <Link
            to={`/account/orders/${order.id}`}
            className="text-xs text-blue-500 font-medium hover:underline"
          >
            Voir le détail
          </Link>
        </div>

        {/* Liste des lignes */}
        {(order.items ?? []).slice(0, 1).map((ligne) => (
          <div
            key={ligne.id}
            className="flex items-end justify-between bg-muted/70 rounded-md px-3 py-2.5 mb-2 last:mb-0"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-10 min-w-10 rounded-md overflow-hidden bg-muted">
                <img
                  src={ligne.image ?? "/images/default-product.jpg"}
                  alt={ligne.nomProduit}
                  className="object-cover h-10 w-10"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground line-clamp-1">
                  {ligne.nomProduit}
                </span>
                <span className="text-xs text-muted-foreground">
                  x{ligne.quantite}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-semibold text-foreground">
                {formatPrice(ligne.prixUnitaire * ligne.quantite)}
              </span>
            </div>
          </div>
        ))}
        {/* Ligne stats */}
        <div className="flex items-end justify-between mt-5">
          <div className="flex items-center gap-2">
            <Button
              disabled={downloadFactureMutation.isPending}
              onClick={() => handleDownload(order.id, order.reference)}
              variant="outline"
              size="sm"
              className="rounded text-xs"
            >
              {downloadFactureMutation.isPending ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-1 h-4 w-4" />
              )}
              {downloadFactureMutation.isPending
                ? "Génération en cours..."
                : "Télécharger la facture"}
            </Button>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-xs text-muted-foreground font-medium tracking-wide">
              {order.items?.length ?? 0} article(s)
            </div>
            <div className="text-lg font-bold text-foreground">
              {order.total && formatPrice(order.total)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
