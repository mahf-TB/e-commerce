"use client";

import { useId, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type SegmentOption = {
  value: string;
  label: React.ReactNode;
};

type SegmentedControlProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: SegmentOption[];
  className?: string;
};

export default function SegmentedControl({
  value,
  onValueChange,
  options,
  className,
}: SegmentedControlProps) {
  const id = useId();

  return (
    <div className={cn("inline-flex h-9 rounded  p-0.5 bg-gray-950/70 shadow-xs", className)}>
      {(() => {
        const count = Math.max(1, options.length);
        const selectedIndex = Math.max(
          0,
          options.findIndex((o) => o.value === value)
        );
        const indicatorWidth = `${100 / count}%`;
        const indicatorTranslate = `${selectedIndex * 100}%`;

        return (
          <RadioGroup
            className="group relative inline-grid items-center gap-0 font-medium text-sm "
            style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}
            data-state={value}
            onValueChange={onValueChange}
            value={value}
          >
            {/* sliding indicator that adapts to number of options */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 z-0 rounded-xs bg-gray-900 shadow-xs transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: indicatorWidth,
                transform: `translateX(${indicatorTranslate})`,
              }}
            />

            {options.map((option, index) => (
              <label
                key={option.value}
                className={cn(
                  "relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors font-poppins",
                  option.value === value
                    ? "text-white"
                    : "text-gray-300 hover:text-gray-200"
                )}
              >
                {option.label}
                <RadioGroupItem
                  className="sr-only"
                  id={`${id}-${index}`}
                  value={option.value}
                />
              </label>
            ))}
          </RadioGroup>
        );
      })()}
    </div>
  );
}
