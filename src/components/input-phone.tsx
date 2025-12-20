import { ChevronDownIcon, PhoneIcon } from "lucide-react";
import type React from "react";
import { useId } from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PhoneInputProps = {
  id?: string;
  label?: string;
  hideLabel?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  containerClassName?: string;
  defaultCountry?: RPNInput.Country;
  className?: string;
};

export function InputPhoneNumber({
  id,
  label,
  hideLabel = false,
  value,
  onChange,
  placeholder = "Entrez le numéro de téléphone",
  disabled = false,
  required = false,
  containerClassName,
  className,
  defaultCountry
}: PhoneInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn("*:not-first:mt-1", containerClassName)} dir="ltr">
      {!hideLabel && label && (
        <Label htmlFor={inputId} className="font-medium text-xs">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <RPNInput.default
        className={cn("flex rounded", className)}
        countrySelectComponent={CountrySelect}
        disabled={disabled}
        flagComponent={FlagComponent}
        id={inputId}
        inputComponent={PhoneInputComponent}
        international
        defaultCountry={defaultCountry}
        onChange={(newValue) => onChange(newValue ?? "")}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}

const PhoneInputComponent = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <Input
      className={cn(
        "-ms-px rounded-s-none rounded-r shadow-none focus-visible:z-10",
        className
      )}
      data-slot="phone-input"
      {...props}
    />
  );
};

PhoneInputComponent.displayName = "PhoneInputComponent";

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: { label: string; value: RPNInput.Country | undefined }[];
};

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as RPNInput.Country);
  };

  return (
    <div className="relative inline-flex items-center self-stretch rounded-s border border-input bg-background py-2 ps-3 pe-2 text-muted-foreground outline-none transition-[color,box-shadow] focus-within:z-10 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 hover:bg-accent hover:text-foreground has-disabled:pointer-events-none has-aria-invalid:border-destructive/60 has-disabled:opacity-50 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40">
      <div aria-hidden="true" className="inline-flex items-center gap-1">
        <FlagComponent aria-hidden="true" country={value} countryName={value} />
        <span className="text-muted-foreground/80">
          <ChevronDownIcon aria-hidden="true" size={16} />
        </span>
      </div>
      <select
        aria-label="Sélectionner un pays"
        className="absolute inset-0 text-sm opacity-0"
        disabled={disabled}
        onChange={handleSelect}
        value={value}
      >
        <option key="default" value="">
          Sélectionner un pays
        </option>
        {options
          .filter((x) => x.value)
          .map((option, i) => (
            <option key={option.value ?? `empty-${i}`} value={option.value}>
              {option.label}{" "}
              {option.value &&
                `+${RPNInput.getCountryCallingCode(option.value)}`}
            </option>
          ))}
      </select>
    </div>
  );
};

type FlagComponentProps = RPNInput.FlagProps;

const FlagComponent = ({ country, countryName }: FlagComponentProps) => {
  const Flag = flags[country];

  return (
    <span className="w-5 overflow-hidden rounded-sm">
      {Flag ? (
        <Flag title={countryName} />
      ) : (
        <PhoneIcon aria-hidden="true" size={16} />
      )}
    </span>
  );
};
