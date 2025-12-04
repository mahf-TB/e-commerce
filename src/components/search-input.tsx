import React, { type ReactElement, type CSSProperties } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

export interface SearchInputProps {
  placeholder?: string;
  isMobile?: boolean;
  classNames?: string[];
  style?: CSSProperties;
  icon?: ReactElement;
  onChange?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  isMobile = false,
  classNames = [],
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
