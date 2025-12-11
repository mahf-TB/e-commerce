import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { CommandeClient } from "@/types";
import { OrderCard } from "./OrderCard";

// MOCK pour l’exemple
const lastOrderMock: CommandeClient = {
  id: "1",
  reference: "CMD-20251110-0001",
  nombreProduits: 4,
  nomDestinataire: "Alex John",
  dateCreation: "13:45, 10 nov. 20255",
  statut: "en_attente",
  etatPaiement: "en_attente",
  typeLivraison: "standard",
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
      image: "/images/article1.jpg",
      quantite: 1,
      prixUnitaire: 340,
    },
  ],
};

export default function CommandeRecentes() {
  const order = lastOrderMock as CommandeClient;

  return (
    <Card className="w-full p-5 rounded-sm shadow-none gap-3">
      <CardHeader className="p-0">
        <CardTitle className="font-poppins">Dernière commande</CardTitle>
      </CardHeader>
      <OrderCard order={order} />
    </Card>
  );
}
