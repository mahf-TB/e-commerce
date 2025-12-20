import type { CommandeClient } from "@/types";
import { OrderCard } from "./OrderCard";
import { PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// MOCK pour l’exemple
const lastOrderMock: CommandeClient = {
  id: "1",
  reference: "CMD-20251110-0001",
  nombreProduits: 4,
  nomDestinataire: "Alex John",
  statut: "en_attente",
  etatPaiement: "en_attente",
  typeLivraison: "standard",
  modePaiement: "carte_bancaire",
  total: 340,
  frais: 10,
  creeLe: "2025-11-10T13:45:00Z",
  dateLivraison: "Fri, 13 Nov, 2025",
  adresseLivraison: "Great street, New York Brooklyn 5A, PO: 212891",
  items: [
    {
      id: "i1",
      codeVariant: "PROD-001-VAR-RED",
      totalLigne: 340,
      nomProduit: "Great product name goes here",
      produitId: "",
      variantId: "",
      image: "/images/default-product.jpg",
      quantite: 1,
      prixUnitaire: 340,
    },
  ],
};

export default function CommandeRecentes() {
  const order = lastOrderMock as CommandeClient;
const navigate= useNavigate();
  return (
    <div className="w-full rounded-sm shadow-none gap-3">
      <div className="pb-4">
        <h2 className="font-poppins text-xl font-semibold">
          Ma dernière commande
        </h2>
      </div>
      {!order ? (
        <OrderCard order={order} />
      ) : (
        <div className="col-span-full flex items-center justify-center py-20 bg-white rounded border">
          <div className="flex flex-col items-center gap-4 max-w-md text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gray-200 rounded-full blur-xl opacity-50"></div>
              <div className="relative bg-gray-100 p-6 rounded-full">
                <PackageX
                  className="text-gray-400"
                  size={48}
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900">
                Aucune commande... pour le moment !
              </h3>
              <p className="text-sm text-muted-foreground">
                On vous aide à trouver de quoi vous faire plaisir.
              </p>
              <Button variant={"outline"} onClick={() => navigate("/products")} className="rounded">C'est partie pour les achats</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
