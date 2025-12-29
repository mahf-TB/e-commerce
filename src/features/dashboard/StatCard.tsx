import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconBgColor?: string;
  iconColor?: string;
  subtitle?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  iconBgColor = "bg-gray-900",
  iconColor = "text-white",
  subtitle,
}: StatCardProps) {
  return (
    <Card className="shadow-none rounded border w-full p-2 py-3 gap-2">
      <CardHeader className="border-0 flex justify-between items-center px-2">
        <CardTitle className="text-gray-800 text-sm font-poppins font-semibold">
          {title}
        </CardTitle>
        <Icon size={18} />
      </CardHeader>
      <CardContent className="space-y-1 px-2">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "text-2xl font-black whitespace-pre-wrap tracking-tight",
              iconColor || "text-gray-900"
            )}
          >
            {value || 0}
          </span>
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs border-t pt-2 border-gray-300">
            <span
              className={cn(
                "font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground">vs mois dernier</span>
          </div>
        )}
        {subtitle && (
          <div className="text-xs text-muted-foreground border-t pt-2 border-gray-300">
            {subtitle}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
