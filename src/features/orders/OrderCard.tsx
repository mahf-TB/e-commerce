"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MoreHorizontal, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Commande } from "@/types/order"
import { formatPrice, getLibelleStatut, getStatusColorClass } from "@/utils/helpers"

type OrderCardProps = {
  order: Commande
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Card className="border rounded shadow-xs p-0 gap-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-5">
        <div className="space-y-1">
          <p className="font-semibold">
            Commande n°: {order.numeroCommande}
          </p>
          <p className="text-xs text-muted-foreground">
            {order.nombreProduits} produits · Par {order.nomClient} ·{" "}
            {order.dateCreation}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-md text-xs"
          >
            <Download className="mr-1 h-4 w-4" />
            Télécharger la facture
          </Button>
          <Button variant="ghost" size="icon" className="rounded-md">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Infos de commande */}
      <div className="grid  border-b px-5 py-4  text-sm md:grid-cols-[auto,1fr]">
        <div className="space-y-2">
          <div className="flex gap-2">
            <span className="font-medium w-28">Statut:</span>
            <span className={cn("font-semibold", getStatusColorClass(order.statut))}>
              {getLibelleStatut(order.statut)}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium w-28">Date of delivery:</span>
            <span className="text-muted-foreground">
              {order.dateLivraison}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium w-28">Delivered to:</span>
            <span className="text-muted-foreground">
              {order.adresseLivraison}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium w-28">Total:</span>
            <span className="font-semibold">
               {formatPrice(order.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="grid gap-4 px-5 py-4 md:grid-cols-2">
        {order.lignes.map((item) => (
          <div key={item.id} className="flex gap-3 rounded-lg bg-muted/40 p-3">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
              <img
                src={item.image}
                alt={item.nomProduit}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-0.5 text-xs">
              <p className="text-sm font-semibold">
                {item.nomProduit}
              </p>
              <p className="text-muted-foreground">
                Quantity: {item.quantite} × {formatPrice(item.prixUnitaire)}
              </p>
              {item.description && (
                <p className="text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
