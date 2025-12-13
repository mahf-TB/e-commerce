import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { cn } from "@/lib/utils";

export interface StepItem {
  step: number;
  title: string;
  description?: string;
}

export interface OrderStepperProps {
  steps: StepItem[];
  defaultValue?: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
  disabled?: boolean;
}

/**
 * Composant Stepper réutilisable pour afficher une progression d'étapes
 * @param steps - Liste des étapes avec step (numéro), title (titre), et description optionnelle
 * @param defaultValue - Étape active par défaut
 * @param orientation - horizontal ou vertical
 * @param className - Classes Tailwind supplémentaires
 */
export function OrderStepper({
  steps,
  defaultValue = 1,
  orientation = "horizontal",
  className = "",
  disabled = false,
}: OrderStepperProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <Stepper defaultValue={defaultValue} orientation={orientation}>
        {steps.map(({ step, title, description }) => (
          <StepperItem
            className="relative not-last:flex-1 items-start"
            key={step}
            step={step}
          >
            <StepperTrigger disabled={disabled} className="items-start rounded pb-5 last:pb-0 w-full">
              <StepperIndicator
               className=" bg-muted text-muted-foreground  data-[state=active]:bg-blue-600 data-[state=active]:text-white  data-[state=completed]:bg-green-600 data-[state=completed]:text-white"
              />
              <div className="mt-0.5 px-2 text-left flex-1">
                <StepperTitle>{title}</StepperTitle>
                {description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {description}
                  </p>
                )}
              </div>
            </StepperTrigger>
            {step < steps.length && (
              <StepperSeparator
                className={cn(
                  "-order-1 -translate-x-1/2 absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 m-0 group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none",
                  `group-data-[state=completed]/step:bg-green-600`
                )}
              />
            )}
          </StepperItem>
        ))}
      </Stepper>
    </div>
  );
}

export default OrderStepper;
