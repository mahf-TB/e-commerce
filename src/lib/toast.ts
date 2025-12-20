import type { CSSProperties } from "react";
import { toast, type ExternalToast } from "sonner";

export type ToastVariant = "success" | "error" | "info" | "warning";

export type ToastOptions = Omit<ExternalToast, "style"> & { 
  style?: CSSProperties;
};

export function showToast(
  variant: ToastVariant,
  message: string,
  options?: ToastOptions
) {
  const payload = { 
    ...options,
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
