import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock, MessageSquare, User } from "lucide-react";

export type TicketStatus = "open" | "in-progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  createdAt: string;
  updatedAt: string;
  author?: string;
  messagesCount?: number;
}

interface SupportTicketCardProps {
  ticket: SupportTicket;
  onClick?: () => void;
}

const statusConfig = {
  open: { label: "Ouvert", className: "bg-blue-100 text-blue-700 border-blue-200" },
  "in-progress": { label: "En cours", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  resolved: { label: "Résolu", className: "bg-green-100 text-green-700 border-green-200" },
  closed: { label: "Fermé", className: "bg-gray-100 text-gray-700 border-gray-200" },
};

const priorityConfig = {
  low: { label: "Basse", className: "bg-gray-100 text-gray-600" },
  medium: { label: "Moyenne", className: "bg-blue-100 text-blue-600" },
  high: { label: "Haute", className: "bg-orange-100 text-orange-600" },
  urgent: { label: "Urgente", className: "bg-red-100 text-red-600" },
};

export function SupportTicketCard({ ticket, onClick }: SupportTicketCardProps) {
  const status = statusConfig[ticket.status];
  const priority = priorityConfig[ticket.priority];

  return (
    <Card
      className="p-4 hover:shadow-md transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {ticket.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {ticket.description}
          </p>
        </div>
        <Badge variant="outline" className={cn("shrink-0", status.className)}>
          {status.label}
        </Badge>
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Badge variant="secondary" className={priority.className}>
            {priority.label}
          </Badge>
        </div>
        
        <span className="px-2 py-1 bg-gray-100 rounded text-gray-700">
          {ticket.category}
        </span>

        {ticket.author && (
          <div className="flex items-center gap-1">
            <User className="size-3.5" />
            <span>{ticket.author}</span>
          </div>
        )}

        <div className="flex items-center gap-1 ml-auto">
          <Clock className="size-3.5" />
          <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
        </div>

        {ticket.messagesCount !== undefined && (
          <div className="flex items-center gap-1">
            <MessageSquare className="size-3.5" />
            <span>{ticket.messagesCount}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
