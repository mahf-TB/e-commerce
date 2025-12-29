import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/utils/helpers";
import { Clock, Package } from "lucide-react";

interface RecentOrder {
  id: string;
  customer: string;
  amount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
}

interface RecentOrdersProps {
  orders: RecentOrder[];
}

const statusConfig = {
  pending: {
    label: "En attente",
    className: "bg-yellow-100 text-yellow-700 border-yellow-700",
  },
  processing: {
    label: "En cours",
    className: "bg-blue-100 text-blue-700 border-blue-700",
  },
  shipped: {
    label: "Expédiée",
    className: "bg-purple-100 text-purple-700 border-purple-700",
  },
  delivered: {
    label: "Livrée",
    className: "bg-green-100 text-green-700 border-green-700",
  },
  cancelled: {
    label: "Annulée",
    className: "bg-red-100 text-red-700 border-red-700",
  },
};

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card className="p-3 rounded bg-white border-gray-200 shadow-none gap-2">
      <div className="flex items-center justify-between mb-2 font-poppins">
        <h3 className="text-lg font-semibold text-gray-900">
          Commandes récentes
        </h3>
        <Package className="size-5 text-gray-500" />
      </div>
      <div className="space-y-4">
        {orders.map((order) => {
          const status = statusConfig[order.status];
          return (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 rounded bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1 font-poppins">
                  Commande #{order.id}{" "}
                  <Badge variant="secondary" className={status.className}>
                    {status.label}
                  </Badge>
                </p>
                <p className="text-sm text-gray-600">{order.customer}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatPrice(order.amount)}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="size-3" />
                  {order.date}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
