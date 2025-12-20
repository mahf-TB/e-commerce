import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

export interface NotificationToggleProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  recommended?: boolean;
  disabled?: boolean;
}

const NotificationToggle: React.FC<NotificationToggleProps> = ({
  id,
  label,
  description,
  checked,
  onCheckedChange,
  recommended = false,
  disabled = false,
}) => {
  return (
    <div className="flex items-start justify-between py-3 border-b last:border-0">
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <Label
            htmlFor={id}
            className="text-sm font-medium cursor-pointer text-gray-900"
          >
            {label}
          </Label>
          {recommended && (
            <Badge
              variant="outline"
              className="text-xs text-blue-600 border-blue-600"
            >
              Recommandé
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  );
};

export default NotificationToggle;
