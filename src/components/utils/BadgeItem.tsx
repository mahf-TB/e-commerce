import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function BadgeItem({
  statut,
  className,
}: {
  statut?: string;
  className?: string;
}) {
  return (
    <Badge className="gap-1.5" variant="outline">
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full bg-emerald-500", className)}
      />
      {statut}
    </Badge>
  );
}
