import type { CSSProperties } from "react";
import { toast, type ExternalToast } from "sonner";

export type ToastVariant =
  | "normal"
  | "action"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "loading"
  | "default";

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
    case "loading":
      return toast.loading(message, payload);
    case "action":
      return toast(message, { ...payload, action: payload.action });
    case "normal":
    case "default":
    default:
      return toast(message, payload);
  }
}
