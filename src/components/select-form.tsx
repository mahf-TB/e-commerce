import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React, { useId } from "react";
import { Label } from "./ui/label";

export interface SelectOption {
  label: string;
  value: string;
}

type SelectFormProps = {
  id?: any;
  label?: string;
  labelTitle?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  icon?: React.ElementType;
  required?: boolean;
};

const SelectForm: React.FC<SelectFormProps> = ({
  id,
  label,
  labelTitle,
  placeholder = "Select option",
  options,
  value,
  onChange,
  className,
  disabled,
  required,
  icon,
}) => {
  const generatedId = id ?? useId();
  const Icon = icon || null;
  return (
    <div className={cn(label && "*:not-first:mt-1")}>
      <Label htmlFor={generatedId} className="font-medium text-xs">
        {label}
         {(required) && (
            <span className="text-destructive ml-1">*</span>
          )}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={generatedId} className={cn("shadow-none rounded whitespace-nowrap", className ?? "w-[150px]")}> 
          {Icon && <Icon size={16} className="text-gray-400" />}
          <SelectValue  placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {labelTitle && <SelectLabel>{labelTitle}</SelectLabel>}
            {options.length > 0 &&
              options.map((option) => (
                <SelectItem
                  disabled={disabled}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectForm;
