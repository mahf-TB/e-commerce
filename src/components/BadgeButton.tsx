import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type BadgeButtonProps = Omit<React.ComponentProps<typeof Button>, "children"> & {
  icon: LucideIcon;
  count?: number;
  showBadge?: boolean;
  badgeClassName?: string;
};

export const BadgeButton = React.forwardRef<HTMLButtonElement, BadgeButtonProps>(
  ({ icon: Icon, count, showBadge = true, badgeClassName, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        aria-label={(props as any)["aria-label"] ?? "Open notifications"}
        className={cn("relative rounded-md shadow-none", className)}
        size={(props as any).size ?? "icon"}
        variant={(props as any).variant ?? "outline"}
        {...(props as any)}
      >
        <Icon aria-hidden="true" size={20} />

        {(showBadge && count && count > 0) && (
          <Badge variant={"destructive"} className={cn("-top-2 -translate-x-1/2 absolute left-full min-w-5 px-1", badgeClassName)}>
            {count > 99 ? "99+" : count}
          </Badge>
        )}
      </Button>
    );
  }
);

BadgeButton.displayName = "BadgeButton";

export default BadgeButton;