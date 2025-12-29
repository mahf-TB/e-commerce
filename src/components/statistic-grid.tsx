
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
// import { formatCompactNumber } from "@/utils/helpers";
// import { NumberTicker } from "./ui/number-ticker";
import { StatCard } from "@/features/dashboard/StatCard";

export type Stat = {
  title: string;
  value: number | string;
  subtitle: string;
  icon: LucideIcon;
  color?: string;
};

interface StatisticGridProps {
  stats: Stat[];
  className?: string;
  isFullPage?: boolean;
}

export default function StatisticGrid({
  stats,
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
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            iconColor={stat.color}
          />
        ))}
      </div>
    </div>
  );
}
