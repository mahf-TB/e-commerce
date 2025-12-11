"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/helpers";
import { useId } from "react";

type PlanOption = {
  label: string;
  price: string | number;
  value: string;
  popular?: boolean;
  description?: string;
};

type PricingRadioProps = {
  legend: string;
  options: PlanOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  containerClassName?: string;
  className?: string;
};

export function PricingRadio({
  legend,
  options,
  defaultValue,
  value,
  onValueChange,
  containerClassName,
  className,
}: PricingRadioProps) {
  const id = useId();

  return (
    <fieldset className={cn("space-y-4")}>
      <legend className="font-semibold text-foreground text-sm leading-none font-poppins">
        {legend}
      </legend>
      <RadioGroup
        className={cn("-space-y-px gap-0 rounded-xs", containerClassName)}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
      >
        {options.map((item) => (
          <div
            className={cn(
              "relative flex flex-col gap-4 border border-input p-3 outline-none first:rounded-t-md last:rounded-b-md has-data-[state=checked]:z-10 has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent",
              className
            )}
            key={`${id}-${item.value}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  aria-describedby={`${id}-${item.value}-price`}
                  className="after:absolute after:inset-0"
                  id={`${id}-${item.value}`}
                  value={item.value}
                />
                <Label
                  className="inline-flex items-start"
                  htmlFor={`${id}-${item.value}`}
                >
                  {item.label}
                  {item.popular && (
                    <Badge className="-mt-1 ms-2">Populaire</Badge>
                  )}
                </Label>
              </div>
              <div
                className="text-muted-foreground text-xs leading-[inherit]"
                id={`${id}-${item.value}-price`}
              >
                {typeof item.price === "number"
                  ? formatPrice(item.price)
                  : item.price}
              </div>
            </div>

            {item.description && (
              <p className="text-xs text-muted-foreground ml-6 -mt-2">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
