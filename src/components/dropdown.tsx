import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, {
  cloneElement,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface DropdownProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuContent> {
  children: ReactNode;
  btnShow?: ReactNode;
  styleCss?:string;
  down?: boolean;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  className?: string;
}
type DropdownChild = ReactElement<DropdownProps>;

export default function Dropdown({
  children,
  btnShow,
  styleCss,
  down,
  open: externalOpen,
  setOpen: externalSetOpen,
  className,
  ...props
}: DropdownProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen ?? internalOpen;
  const setOpen = externalSetOpen ?? setInternalOpen;

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childType: any = (child as any).type;
      if (typeof childType === "string" || childType === React.Fragment) return child;
      return cloneElement(child as DropdownChild, { setOpen });
    }
    return child;
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} >
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <div
          className={cn(
            "flex items-center justify-center rounded-md transition-all duration-300",
            styleCss
          )}
        >
          {btnShow}
          {down && <ChevronDown className="w-4 h-4" />}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent  className={cn("flex flex-col mx-4", className)} {...props}>
        {enhancedChildren}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export interface DropdownItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuItem> {
  icon?: ReactNode;
  title: string;
  description?: string;
  className?: string;
  onClick?: () => void;
  setOpen?: (value: boolean) => void;
}

export const DropdownItems: React.FC<DropdownItemProps> = ({
  icon,
  title,
  description,
  className,
  onClick,
  setOpen,
  ...props
}) => {
  return (
    <DropdownMenuItem
      className={cn("flex gap-3 py-2 mx-1 cursor-pointer", className)}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
        setOpen?.(false);
      }}
      {...props}
    >
      {icon}
      <div className="flex flex-col">
        <div className={cn("flex items-center font-medium font-poppins")}>
          {title}
        </div>
        {description && (
          <span className="text-xs text-gray-400">{description}</span>
        )}
      </div>
    </DropdownMenuItem>
  );
};
