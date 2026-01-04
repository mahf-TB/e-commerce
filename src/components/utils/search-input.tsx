import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React, { type CSSProperties, type ReactElement } from "react";
import { Input } from "../ui/input";

export interface SearchInputProps {
  placeholder?: string;
  isMobile?: boolean;
  classNames?: string[];
  style?: CSSProperties;
  icon?: ReactElement;
  value?: string;
  onChange?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  isMobile = false,
  classNames = [],
  value,
  style = {},
  icon = <Search size={20} className="text-gray-400" />,
  onChange,
}) => {
  return (
    <div className={cn("relative flex-1 max-w-xl", classNames)} style={style}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        {icon}
      </div>

      <Input
        type="text"
        value={value}
        placeholder={
          placeholder ??
          (isMobile
            ? "Rechercher..."
            : "Rechercher des commandes..."
          )
        }
        className={cn(
          "w-full pl-10 pr-4 py-1 h-9 border border-gray-200 rounded",
          "focus:outline-none focus:ring-2 focus:ring-gray-500"
        )}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
