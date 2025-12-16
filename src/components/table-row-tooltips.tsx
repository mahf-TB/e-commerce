import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ReactElement, ReactNode } from "react";

interface TableRowTooltipsProps {
  children: ReactNode;
  text: string | ReactElement;
  side?: "top" | "right" | "bottom" | "left";
  delay?: number;
  className?: string;
}

/**
 * Composant Tooltips spécifique pour les rangées de table (<tr>)
 * Accepte le contenu des <td> comme children et ajoute le tooltip sur la rangée
 */
export default function TableRowTooltips({
  children,
  text,
  side = "top",
  delay = 200,
  className,
}: TableRowTooltipsProps) {
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip>
        <TooltipTrigger asChild>
          <tr className="hover:bg-accent/50 cursor-pointer transition-colors">
            {children}
          </tr>
        </TooltipTrigger>
        <TooltipContent side={side} className={className}>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
