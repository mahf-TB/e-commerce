import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Bell, Package, PackageCheck, PackageSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCompactNumber } from "@/utils/helpers";
import { NumberTicker } from "./ui/number-ticker";

export type Stat = {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  color?: string;
};

const defaultStats: Stat[] = [
  {
    title: "Commandes totales",
    value: 12,
    subtitle: "Commandes passées",
    icon: <Package size={18} />,
    color: "text-green-600",
  },
  {
    title: "Commandes en cours",
    value: 5000,
    subtitle: "En préparation / expédiées",
    icon: <PackageSearch size={18} />,
    color: "text-yellow-600",
  },
  {
    title: "Commandes livrées",
    value: 98100000,
    subtitle: "Livrées avec succès",
    icon: <PackageCheck size={18} />,
    color: "text-blue-600",
  },
  {
    title: "Notifications non lues",
    value: 410,
    subtitle: "Nouvelles notifications",
    icon: <Bell size={18} />,
    color: "text-violet-600",
  },
];

interface StatisticGridProps {
  stats?: Stat[];
  className?: string;
  isFullPage?: boolean;
}

export default function StatisticGrid({
  stats = defaultStats,
  className,
  isFullPage,
}: StatisticGridProps) {
  return (
    <div className="w-full">
      <div
        className={cn(
          isFullPage
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          "grid gap-4",
          className
        )}
      >
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="shadow-none rounded-md border w-full p-2 py-3 gap-2"
          >
            <CardHeader className="border-0 flex justify-between items-center px-2">
              <CardTitle className="text-gray-800 text-sm font-poppins font-semibold">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent className="space-y-1 px-2">
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "text-2xl font-black text-foreground whitespace-pre-wrap tracking-tight",
                    stat.color
                  )}
                >
                  {/* {formatCompactNumber(stat.value)} */}
                  <NumberTicker
                    value={stat.value}
                    startValue={stat.value > 1000000 ? 1000000 : 0}
                    className={cn(
                      "text-2xl font-black text-foreground whitespace-pre-wrap tracking-tight",
                      stat.color
                    )}
                  />
                </span>
              </div>
              <div className="text-xs text-muted-foreground  border-t pt-2 border-gray-300">
                {stat.subtitle}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
