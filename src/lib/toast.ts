import type { CSSProperties } from "react";
import { toast, type ExternalToast } from "sonner";

export type ToastVariant = "success" | "error" | "info" | "warning";

const palette = {
  success: "green",
  error: "red",
  info: "blue",
  warning: "amber",
} as const;

const tone = (color: (typeof palette)[ToastVariant]) => ({
  "--normal-bg": `color-mix(in oklab, light-dark(var(--color-${color}-600), var(--color-${color}-400)) 10%, var(--background))`,
  "--normal-text": `light-dark(var(--color-${color}-600), var(--color-${color}-400))`,
  "--normal-border": `light-dark(var(--color-${color}-600), var(--color-${color}-400))`,
});

const styles: Record<ToastVariant, Record<string, string>> = {
  success: tone("green"),
  error: tone("red"),
  info: tone("blue"),
  warning: tone("amber"),
};

export type ToastOptions = Omit<ExternalToast, "style"> & { style?: CSSProperties };

export function showToast(
  variant: ToastVariant,
  message: string,
  options?: ToastOptions
) {
  const mergedStyle = { ...styles[variant], ...options?.style } as CSSProperties;
  const payload = { ...options, style: mergedStyle } satisfies ExternalToast;

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
