
import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type FormInputProps = React.ComponentProps<"input"> & {
  label?: string
  hideLabel?: boolean
  requiredMark?: boolean
  containerClassName?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

export default function InputForm({
  id,
  label,
  hideLabel = false,
  requiredMark = false,
  containerClassName,
  iconLeft,
  iconRight,
  className,
  required,
  type = "text",
  ...props
}: FormInputProps) {
  const generatedId = React.useId()
  const inputId = id ?? props.name ?? generatedId

  const isPasswordField = type === "password"
  const [isVisible, setIsVisible] = React.useState(false)

  const effectiveType = isPasswordField ? (isVisible ? "text" : "password") : type

  const toggleVisibility = () => setIsVisible(prev => !prev)

  return (
    <div className={cn("*:not-first:mt-1", containerClassName)}>
      {!hideLabel && label && (
        <Label htmlFor={inputId} className="font-medium text-xs">
          {label}
          {(required || requiredMark) && (
            <span className="text-destructive ml-1">*</span>
          )}
        </Label>
      )}

      <div className="relative flex items-center">
        {iconLeft && (
          <span className="pointer-events-none absolute left-3 text-muted-foreground">
            {iconLeft}
          </span>
        )}

        <Input
          id={inputId}
          required={required}
          type={effectiveType}
          className={cn(
            "rounded shadow-none",
            iconLeft && "pl-9",
            // si password -> espace pour le bouton oeil
            isPasswordField ? "pr-9" : iconRight && "pr-9",
            className
          )}
          {...props}
        />

        {/* Bouton oeil si type=password */}
        {isPasswordField && (
          <button
            type="button"
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            className="absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeOffIcon aria-hidden="true" size={16} />
            ) : (
              <EyeIcon aria-hidden="true" size={16} />
            )}
          </button>
        )}

        {/* Icône droite classique si pas password */}
        {!isPasswordField && iconRight && (
          <span className="absolute right-3 text-muted-foreground">
            {iconRight}
          </span>
        )}
      </div>
      {/* Erreur affiche */}
      {/* <p
        aria-live="polite"
        className="mt-2 text-xs peer-aria-invalid:text-destructive"
        role="alert"
      >
        Email is invalid
      </p> */}
    </div>
  )
}

