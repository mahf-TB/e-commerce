import Dropdown, { DropdownItems } from "@/components/dropdown";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Plus } from "lucide-react";

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  bgColor: string;
  textColor: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (

      <Dropdown
        btnShow={
          <Button size={"icon"}>
            <Plus />
          </Button>
        }
      >
        {actions.map((action, index) => (
          <DropdownItems
            key={index}
            onClick={action.onClick}
            title={action.label}
            icon={action.icon}
          />
        ))}
      </Dropdown>
  );
}
