import { OrderProgressBar } from "@/components/OrderProgressBar";
import Tooltips from "@/components/tooltips";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { CommandeDetail } from "@/types";
import { getLibelleStatut, getStatusColorClass } from "@/utils/helpers";
import { Calendar, Info, MapPin, User } from "lucide-react";
import { Link } from "react-router-dom";

// MOCK pour l’exemple
const lastOrderMock: CommandeDetail = {
  id: "1",
  numeroCommande: "73262",
  nombreProduits: 4,
  nomClient: "Alex John",
  dateCreation: "13:45, 10 nov. 20255",
  statut: "en_attente",
  dateLivraison: "Fri, 13 Nov, 2025",
  adresseLivraison: "Great street, New York Brooklyn 5A, PO: 212891",
  total: 340,
  lignes: [
    {
      id: "i1",
      nomProduit: "Great product name goes here",
      image: "/images/article1.jpg",
      quantite: 1,
      prixUnitaire: 340,
    },
    {
      id: "i2",
      nomProduit: "Table lamp for office or bedroom",
      image: "/images/article1.jpg",
      quantite: 1,
      prixUnitaire: 340,
    },
    {
      id: "i3",
      nomProduit: "Great product name goes here",
      image: "/images/article1.jpg",
      quantite: 2,
      prixUnitaire: 87,
    },
  ],
};

export default function CommandeRecentes() {
  const order = lastOrderMock;

  return (
    <Card className="w-full p-5 rounded-sm shadow-none gap-3">
      <CardHeader className="p-0">
        <CardTitle className="font-poppins">Dernière commande</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-3 border-t border-gray-300">
        {/* En-tête infos principales */}
        <div className="flex items-start justify-between mb-4 ">
          <div className="flex flex-col gap-3 w-full">
            <div className="text-base text-gray-600 font-semibold font-poppins tracking-wide uppercase">
              Commande N°: {order.numeroCommande}
            </div>
            <Tooltips text={getLibelleStatut(order.statut)}>
              <OrderProgressBar statut={order.statut} />
            </Tooltips>
            <div className="text-xs text-foreground flex items-center gap-2">
              <Calendar className="size-3.5 inline-block" />
              <div className="text-xs text-foreground">
                {order.dateCreation}
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
              <div className="text-xs text-foreground">{order.nomClient}</div>
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
            to={`/mes-commandes/${order.id}`}
            className="text-sm text-primary font-medium hover:underline"
          >
            Voir le détail
          </Link>
        </div>

        {/* Liste des lignes */}
        {order.lignes.map((ligne) => (
          <div
            key={ligne.id}
            className="flex items-center justify-between bg-muted/70 rounded-md px-3 py-2.5 mb-2 last:mb-0"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-md overflow-hidden bg-muted">
                <img
                  src={ligne?.image}
                  alt={ligne.nomProduit}
                  className="object-cover"
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
              <span className="text-xs text-muted-foreground"></span>
              <Separator
                orientation="vertical"
                className="h-3 bg-accent-foreground/20"
              />
              <span className="text-xs font-semibold text-foreground">
                {(ligne.prixUnitaire * ligne.quantite).toLocaleString("fr-FR")}{" "}
                Ar
              </span>
            </div>
          </div>
        ))}
        {/* Ligne stats */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
              Total
            </div>
            <div className="text-2xl font-bold text-foreground">
              {order.total.toLocaleString("fr-FR")} Ar
            </div>
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
              Produits
            </div>
            <div className="text-2xl font-bold text-foreground">
              {order.nombreProduits}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
