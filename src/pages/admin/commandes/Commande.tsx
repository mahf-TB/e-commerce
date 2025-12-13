import PaginationPage from "@/components/pagination-page";
import { Button } from "@/components/ui/button";
import SemiCircleChart from "@/features/orders/myOrder/GrapheStatus";
import { OrderRow } from "@/features/orders/OrderRows";
import OrderStatusFilter from "@/features/orders/OrderStatusFilter";
import TableListe from "@/features/orders/TableListe";
import { ArrowUp } from "lucide-react";
import  { useState } from "react";

const orderStats = [
  { label: "En attent", value: 50, color: "#fbbf24" },
  { label: "En traitement", value: 90, color: "#6366f1" },
  { label: "Expédiée", value: 120, color: "#3b82f6" },
  { label: "Livrée", value: 110, color: "#10b981" },
  { label: "Annulée", value: 30, color: "#ef4444" },
];
const Commande = () => {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  return (
    <div className="flex items-start">
      <div className="p-4 md:w-3/4  w-full mt-5">
        <div className="flex items-center justify-between mx-5">
          <span className="text-xl font-black font-poppins">Commandes</span>
          <div className="flex items-center gap-2">
            {/* FILTRE */}
            <div className="">
              <OrderStatusFilter value={status} onChange={setStatus} />
            </div>
            <Button
              onClick={() => console.log("hello")}
              className="flex items-center gap-1 rounded bg-gray-950 text-white px-2 py-2"
            >
              <ArrowUp size={18} />
              <span className="">Export</span>
            </Button>
          </div>
        </div>
        <div className="mt-5">
          <TableListe>
            <OrderRow
              id={1}
              orderNumber="#12345"
              customer="Jean Rakoto"
              email="jean@example.com"
              status="En attente"
              totalArticles={2}
              total={29000}
              date="25-11-2025"
              onView={(id) => console.log("Voir", id)}
              onDelete={(id) => console.log("Supprimer", id)}
            />
          </TableListe>
          <PaginationPage
            isList
            currentPage={page}
            totalPages={3}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>
      <div className="p-4 w-1/4 border-l h-screen hidden md:flex flex-col items-center">
        <span className="text-lg font-black font-poppins  whitespace-nowrap">
          Statistiques des commandes
        </span>
        <div>
          {/* // Usage: */}
          <SemiCircleChart stats={orderStats} />
        </div>
      </div>
    </div>
  );
};

export default Commande;
