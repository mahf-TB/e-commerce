import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactNumber, formatPrice } from "@/utils/helpers";
import { TrendingUp } from "lucide-react";
import {
    Area,
    CartesianGrid,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

interface EvolutionVente {
  date: string;
  nombreCommandes: number;
  chiffreAffaires: number;
}

interface RevenueChartProps {
  data: EvolutionVente[];
}

// Format la date pour l'affichage
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    month: "short",
    day: "numeric",
  }).format(date);
};

// Custom Tooltip
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-popover p-3 shadow-sm shadow-black/5 min-w-[150px]">
        <div className="text-xs font-medium text-muted-foreground tracking-wide mb-2.5">
          {label}
        </div>
        <div className="space-y-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-1 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-muted-foreground">
                  {entry.dataKey === "chiffreAffaires"
                    ? "Montant"
                    : "Commandes"}
                  :
                </span>
              </div>
              <span className="font-semibold text-popover-foreground">
                {entry.dataKey === "chiffreAffaires"
                  ? formatPrice(entry.value)
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function RevenueChart({ data }: RevenueChartProps) {
    
  if (!data || data.length === 0) {
    return (
      <Card className="rounded border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Évolution des ventes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-gray-500">
            Aucune donnée disponible
          </div>
        </CardContent>
      </Card>
    );
  }

  // Préparer les données pour le graphique
  const chartData = data.map((item) => ({
    date: formatDate(item.date),
    chiffreAffaires: item.chiffreAffaires, // Garder les valeurs originales
    nombreCommandes: item.nombreCommandes,
  }));

  // Calculer le total
  const totalRevenue = data.reduce((sum, item) => sum + item.chiffreAffaires, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.nombreCommandes, 0);

  return (
    <Card className="rounded border-gray-200 shadow-none">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold mb-2">
              Volume des commandes
            </CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-gray-600">Montant total: </span>
                <span className="font-bold text-green-600">
                  {formatPrice(totalRevenue)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Nombre: </span>
                <span className="font-bold text-blue-600">
                  {formatCompactNumber(totalOrders)}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Inclut toutes les commandes (payées, en attente, remboursées, annulées)
            </p>
          </div>
          <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
            <TrendingUp className="size-4" />
            <span>Volume total</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCompactNumber(value)}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="chiffreAffaires"
              stroke="#16a34a"
              strokeWidth={2}
              fill="url(#colorRevenue)"
              dot={{ fill: "#16a34a", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="nombreCommandes"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ fill: "#2563eb", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600" />
            <span className="text-gray-600">Montant total</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="text-gray-600">Nombre</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
