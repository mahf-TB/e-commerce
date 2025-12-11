import { CircleAlertIcon, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type AlertVariant = "danger" | "warning" | "success" | "info";

type AlertComponentProps = {
  trigger?: ReactNode;
  title: string;
  description: string;
  variant?: AlertVariant;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const variantConfig = {
  danger: {
    icon: CircleAlertIcon,
    iconClassName: "text-red-600 border-red-600",
  },
  warning: {
    icon: AlertTriangle,
    iconClassName: "text-amber-600 border-amber-600",
  },
  success: {
    icon: CheckCircle2,
    iconClassName: "text-green-600 border-green-600",
  },
  info: {
    icon: Info,
    iconClassName: "text-blue-600 border-blue-600",
  },
};

export default function AlertComponent({
  trigger,
  title,
  description,
  variant = "danger",
  cancelText = "Annuler",
  confirmText = "Confirmer",
  onConfirm,
  onCancel,
  open,
  onOpenChange,
}: AlertComponentProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            aria-hidden="true"
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full border",
              config.iconClassName
            )}
          >
            <Icon className="opacity-80" size={16} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
