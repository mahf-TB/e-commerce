import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";

export interface NotificationSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const NotificationSection: React.FC<NotificationSectionProps> = ({
  icon,
  title,
  description,
  children,
  className = "",
}) => {
  return (
    <Card className={`shadow-none rounded w-3/4 ${className}`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-0">{children}</CardContent>
    </Card>
  );
};

export default NotificationSection;
