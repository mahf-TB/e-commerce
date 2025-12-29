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

interface SemiCircleStatutProps {
  data: OrderStatusData;
}

export function SemiCircleStatut({ data }: SemiCircleStatutProps) {
  const statuses = [
    {
      label: "En attente",
      value: data.en_attente || 0,
      color: "#f59e0b", // amber-500
      textColor: "text-amber-700",
    },
    {
      label: "En préparation",
      value: data.en_preparation || 0,
      color: "#64748b", // slate-500
      textColor: "text-slate-700",
    },
    {
      label: "Expédiée",
      value: data.expediee || 0,
      color: "#6366f1", // indigo-500
      textColor: "text-indigo-700",
    },
    {
      label: "Livrée",
      value: data.livree || 0,
      color: "#14b8a6", // teal-500
      textColor: "text-teal-700",
    },
    {
      label: "Complétée",
      value: data.completed || 0,
      color: "#a855f7", // purple-500
      textColor: "text-purple-700",
    },
    {
      label: "Annulée",
      value: data.annulee || 0,
      color: "#f43f5e", // rose-500
      textColor: "text-rose-700",
    },
  ];

  const total = statuses.reduce((sum, status) => sum + status.value, 0);
  
  // Calculer les angles pour chaque segment
  let currentAngle = 0;
  const segments = statuses.map((status) => {
    const percentage = total > 0 ? status.value / total : 0;
    const angle = percentage * 180; // Semi-cercle = 180 degrés
    const segment = {
      ...status,
      percentage: percentage * 100,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
    };
    currentAngle += angle;
    return segment;
  });

  // Créer le SVG du semi-cercle
  const radius = 90;
  const strokeWidth = 14;
  const center = radius + strokeWidth / 2;
  const viewBoxSize = (radius + strokeWidth) * 2;

  const createArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  return (
    <Card className="rounded border-gray-200 shadow-none bg-gray-50">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-900 font-poppins">
          Commandes par statut
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Semi-Circle Chart */}
        <div className="flex justify-center items-center">
          <svg
            width="100%"
            height="auto"
            viewBox={`0 0 ${viewBoxSize} ${center + strokeWidth / 2 + 20}`}
            className="max-w-md"
          >
            {segments.map((segment, index) => (
              segment.value > 0 && (
                <g key={index}>
                  <path
                    d={createArc(segment.startAngle, segment.endAngle)}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth={strokeWidth}
                  >
                    <title>{`${segment.label}: ${segment.value} (${segment.percentage.toFixed(1)}%)`}</title>
                  </path>
                </g>
              )
            ))}
            {/* Centre text - Total */}
            <text
              x={center}
              y={center -20}
              textAnchor="middle"
              className="lg:text-2xl font-black fill-gray-900"
            >
              {total}
            </text>
            <text
              x={center}
              y={center}
              textAnchor="middle"
              className="lg:text-sm text-xs fill-gray-600"
            >
              Total commandes
            </text>
          </svg>
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {segments.map((status, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-8 rounded-full"
                style={{ backgroundColor: status.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-600 truncate">
                  {status.label}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={cn("text-lg font-black", status.textColor)}>
                    {status.value}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({status.percentage.toFixed(0)}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}




