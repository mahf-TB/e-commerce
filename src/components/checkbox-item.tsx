"use client"

import { useId } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type CheckboxItemProps = {
  id?: string
  label: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  description?: string
  containerClassName?: string
}

export function CheckboxItem({
  id,
  label,
  checked,
  onCheckedChange,
  disabled = false,
  description,
  containerClassName,
}: CheckboxItemProps) {
  const generatedId = useId()
  const checkboxId = id ?? generatedId

  return (
    <div className={cn("flex items-start gap-2", containerClassName)}>
      <Checkbox
        id={checkboxId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="mt-1"
      />
      <div className="flex flex-col gap-1">
        <Label
          htmlFor={checkboxId}
          className="text-sm font-medium cursor-pointer"
        >
          {label}
        </Label>
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
