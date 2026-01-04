
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useId } from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DateRangePickerProps {
  label?: string;
  placeholder?: string;
  value?: DateRange;
  onChange?: (date: DateRange | undefined) => void;
  className?: string;
  disabled?: boolean;
  description?: string;
  errorMessage?: string;
  dateFormat?: string;
  align?: "start" | "center" | "end";
}

export default function DateRangePickerComponent({
  label ,
  placeholder = "Sélectionner une période",
  value,
  onChange,
  className,
  disabled = false,
  description,
  errorMessage,
  dateFormat = "LLL dd, y",
  align = "start",
}: DateRangePickerProps) {
  const id = useId();

  return (
    <div className={cn("*:not-first:mt-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="group w-full justify-between border-input bg-background px-3 font-normal outline-none outline-offset-0 hover:bg-background focus-visible:outline-[3px] disabled:cursor-not-allowed disabled:opacity-50 rounded"
            id={id}
            variant="outline"
            disabled={disabled}
          >
            <CalendarIcon
              aria-hidden="true"
              className="shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground"
              size={16}
            />
            <span
              className={cn("truncate", !value && "text-muted-foreground")}
            >
              {value?.from ? (
                value.to ? (
                  <>
                    {format(value.from, dateFormat)} -{" "}
                    {format(value.to, dateFormat)}
                  </>
                ) : (
                  format(value.from, dateFormat)
                )
              ) : (
                placeholder
              )}
            </span>
            
          </Button>
        </PopoverTrigger>
        <PopoverContent align={align} className="w-auto p-2">
          <Calendar mode="range" onSelect={onChange} selected={value} />
        </PopoverContent>
      </Popover>
      {description && (
        <p className="mt-2 text-muted-foreground text-xs">{description}</p>
      )}
      {errorMessage && (
        <p className="mt-2 text-destructive text-xs" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
