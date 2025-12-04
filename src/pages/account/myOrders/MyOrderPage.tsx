import InputForm from "@/components/input-form";
import SegmentedControl from "@/components/segmented-control";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { OrderCard } from "@/features/orders/OrderCard";
import type { Commande, CommandeDetail } from "@/types/order";

const MyOrderPage = () => {
  const [billing, setBilling] = useState("new");

  const options = [
    { value: "all", label: "Tous" },
    { value: "new", label: "Nouveaux" },
    { value: "pending", label: "En attente" },
  ];

  return (
    <div>
      <div className="mb-4 flex gap-4 items-center justify-end">
        <SegmentedControl
          options={options}
          value={billing}
          onValueChange={setBilling}
        />
        <InputForm
          placeholder="Recherche commande..."
          iconLeft={<Search size={16} />}
        />
      </div>
      <section className="space-y-4">
        {mockOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </section>
    </div>
  );
};

export default MyOrderPage;

const mockOrders: CommandeDetail[] = [
  {
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
  },
  {
    id: "2",
    numeroCommande: "09177",
    nombreProduits: 4,
    nomClient: "Alex John",
    dateCreation: "13:45, 10 nov. 2025",
    statut: "expediee",
    dateLivraison: "Fri, 13 Nov, 2025",
    adresseLivraison: "Great street, New York Brooklyn 5A, PO: 212891",
    total: 280,
    lignes: [
      // autres items...
      {
        id: "i4",
        nomProduit: "Great cup white minimalist style",
        image: "/images/article1.jpg",
        quantite: 1,
        prixUnitaire: 340,
      },
    ],
  },
];
