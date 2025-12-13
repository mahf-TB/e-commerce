import { OrderStepper, type StepItem } from "@/components/order-stepper";
import type { StatutCommande } from "@/types/order";

const statusSteps: StepItem[] = [
  {
    step: 1,
    title: "En attente",
    description: "Commande reçue et en attente de traitement",
  },
  {
    step: 2,
    title: "En préparation",
    description: "Articles en cours de préparation",
  },
  {
    step: 3,
    title: "Expédiée",
    description: "Colis en transit vers la destination",
  },
  {
    step: 4,
    title: "Livrée",
    description: "Commande livrée au client",
  },
];

const statusMap: Record<StatutCommande, number> = {
  en_attente: 1,
  en_preparation: 2,
  expediee: 3,
  livree: 4,
  completed: 5,
  annulee: 0,
};

interface CommandeStatusStepperProps {
  statut: StatutCommande;
  className?: string;
}

/**
 * Composant affichant l'état de progression d'une commande
 * @param statut - Statut actuel de la commande
 * @param className - Classes Tailwind supplémentaires
 */
export function CommandeStatusStepper({
  statut,
  className = "",
}: CommandeStatusStepperProps) {
  const currentStep = statusMap[statut];

  if (statut === "annulee") {
    return (
      <div
        className={`p-4 bg-red-50 border border-red-200 rounded ${className}`}
      >
        <p className="text-red-700 font-medium">Commande annulée</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <OrderStepper
        steps={statusSteps}
        defaultValue={currentStep}
        orientation="vertical"
        className={className}
      />

      <div className="absolute inset-0"></div>
    </div>
  );
}

export default CommandeStatusStepper;
