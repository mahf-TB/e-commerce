import type { CSSProperties } from "react";
import { toast, type ExternalToast } from "sonner";

export type ToastVariant = "success" | "error" | "info" | "warning";

// Classes Tailwind pour chaque variante
const variantClasses: Record<ToastVariant, string> = {
  success: "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100",
  error: "border-red-500 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100",
  info: "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100",
  warning: "border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-100",
};

export type ToastOptions = Omit<ExternalToast, "style" | "className"> & { 
  style?: CSSProperties;
  className?: string;
};

export function showToast(
  variant: ToastVariant,
  message: string,
  options?: ToastOptions
) {
  const className = `${variantClasses[variant]} ${options?.className || ""}`;
  const payload = { 
    ...options, 
    className,
    style: options?.style,
  } satisfies ExternalToast;

  switch (variant) {
    case "success":
      return toast.success(message, payload);
    case "error":
      return toast.error(message, payload);
    case "info":
      return toast.info(message, payload);
    case "warning":
      return toast.warning(message, payload);
    default:
      return toast(message, payload);
  }
}
