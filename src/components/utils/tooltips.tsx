import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ReactNode, ReactElement } from "react";

interface TooltipUtilsProps {
  children: ReactNode;
  text: string | ReactElement;
  side?: "top" | "right" | "bottom" | "left";
  delay?: number;
  className?: string;
}

export default function Tooltips({
  children,
  text,
  side = "top",
  delay = 200,
  className,
}: TooltipUtilsProps) {
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} className={className}>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
