import { cn } from "@/lib/utils";
import type { StatutCommande } from "@/types";


function getProgressConfig(statut: StatutCommande) {
  switch (statut) {
    case 'en_attente':
      return { percent: 2, color: 'bg-amber-400' };    // jaune
    case 'en_preparation':
      return { percent: 40, color: 'bg-blue-400' };     // bleu
    case 'expediee':
      return { percent: 70, color: 'bg-indigo-500' };   // indigo
    case 'livree':
      return { percent: 100, color: 'bg-emerald-500' }; // vert
    case 'annulee':
      return { percent: 100, color: 'bg-red-500' };     // rouge
    case 'completed':
      return { percent: 100, color: 'bg-green-600' }; 
    default:
      return { percent: 0, color: 'bg-muted' };
  }
}

type Props = {
  statut: StatutCommande;
};

export function OrderProgressBar({ statut }: Props) {
  const totalSegments = 100;
  const { percent, color } = getProgressConfig(statut);
  const activeCount = Math.round((percent / 100) * totalSegments);

  return (
    <div className="w-full mt-1 flex gap-0.5">
      {Array.from({ length: totalSegments }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-2.5 w-0.5 rounded-full flex-1",
            i < activeCount ? color : 'bg-muted'
          )}
        />
      ))}
    </div>
  );
}
