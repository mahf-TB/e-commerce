import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Marque } from "@/hooks/use-marques";
import { Building2, ExternalLink, Pencil, Trash2 } from "lucide-react";

interface MarqueListItemProps {
  marque: Marque;
  onEdit: (marque: Marque) => void;
  onDelete: (marqueId: string) => void;
}

export function MarqueListItem({ marque, onEdit, onDelete }: MarqueListItemProps) {
  return (
    <Card className="border border-gray-200 bg-white transition-all hover:shadow-md hover:border-gray-300">
      <div className="p-4 flex items-center gap-4">
        {/* Logo */}
        <div className="shrink-0 w-16 h-16 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-100 flex items-center justify-center">
          {marque.logo ? (
            <img
              src={marque.logo}
              alt={marque.nom}
              className="max-h-full max-w-full object-contain p-2"
            />
          ) : (
            <Building2 className="size-7 text-muted-foreground/20" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-1">
          <h3 className="font-semibold text-base text-gray-900 leading-tight">
            {marque.nom}
          </h3>
          {marque.description && (
            <p className="text-sm text-muted-foreground line-clamp-1 leading-relaxed">
              {marque.description}
            </p>
          )}
          {marque.siteWeb && (
            <a
              href={marque.siteWeb}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="size-3.5" />
              <span className="truncate max-w-xs">{marque.siteWeb}</span>
            </a>
          )}
        </div>

        {/* Actions */}
        <div className="shrink-0 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded"
            onClick={() => onEdit(marque)}
          >
            <Pencil className="size-3.5 mr-1.5" />
            Éditer
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(String(marque._id || marque.id))}
          >
            <Trash2 className="size-3.5 mr-1.5" />
            Supprimer
          </Button>
        </div>
      </div>
    </Card>
  );
}
