import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OrderStatusData {
  en_attente: number;
  en_preparation: number;
  expediee: number;
  livree: number;
  annulee: number;
  completed?: number;
}

interface OrdersByStatusProps {
  data: OrderStatusData;
}

export function OrdersByStatus({ data }: OrdersByStatusProps) {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);
  
const statuses = [
    {
        label: "En attente",
        value: data.en_attente || 0,
        color: "bg-amber-500",
        textColor: "text-amber-700",
    },
    {
        label: "En préparation",
        value: data.en_preparation || 0,
        color: "bg-slate-500",
        textColor: "text-slate-700",
    },
    {
        label: "Expédiée",
        value: data.expediee || 0,
        color: "bg-indigo-500",
        textColor: "text-indigo-700",
    },
    {
        label: "Livrée",
        value: data.livree || 0,
        color: "bg-teal-500",
        textColor: "text-teal-700",
    },
    {
        label: "Annulée",
        value: data.annulee || 0,
        color: "bg-rose-500",
        textColor: "text-rose-700",
    },
    {
        label: "Complétée",
        value: data.completed || 1,
        color: "bg-emerald-500",
        textColor: "text-emerald-700",
    },
];

  return (
    <Card className="rounded border-gray-200 shadow-none gap-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-900 font-poppins border-b-2 pb-2">
          Commandes par statut
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Progress Bar */}
        <div className="h-10 flex rounded overflow-hidden">
          {statuses.map((status, index) => {
            const percentage = total > 0 ? (status.value / total) * 100 : 0;
            return percentage > 0 ? (
              <div
                key={index}
                className={cn(status.color, "relative group flex items-center justify-center")}
                style={{ width: `${percentage}%` }}
              >
                <span className="text-white text-xs font-medium">
                  {percentage.toFixed(0)}%
                </span>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {status.label}: {status.value} ({percentage.toFixed(1)}%)
                </div>
              </div>
            ) : null;
          })}
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {statuses.map((status) => (
            <div key={status.label} className={cn("space-y-1 border-l-2 pl-2", status.textColor)}>
              <div className={`text-3xl font-black ${status.textColor}`}>
                {status.value}
              </div>
              <div className="text-xs text-gray-600 uppercase tracking-wide">
                {status.label}
              </div>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}
