import { useId } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ReusableTextareaProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  rows?: number;
  className?: string;
  required?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextareaForm({
  id,
  label,
  placeholder = "Leave a comment",
  value,
  onChange,
  rows = 3,
  className = "",
  required = false,
  ...props
}: ReusableTextareaProps) {
  const inputId = id ?? useId();


  return (
    <div className="*:not-first:mt-2">
      {label && (
        <Label htmlFor={inputId} className="font-medium text-xs">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Textarea
        id={inputId}
        className={`resize-none ${className} rounded`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        {...props}
      />
    </div>
  );
}
