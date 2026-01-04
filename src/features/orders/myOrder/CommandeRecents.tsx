import type { CommandeClient } from "@/types";
import { OrderCard } from "./OrderCard";
import { PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CommandeRecentes({order}: {order?: CommandeClient}) {
const navigate= useNavigate();
  return (
    <div className="w-full rounded-sm shadow-none gap-3">
      <div className="pb-4">
        <h2 className="font-poppins text-xl font-semibold">
          Ma dernière commande
        </h2>
      </div>
      {order ? (
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
