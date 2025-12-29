import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Marque } from "@/hooks/use-marques";
import { Building2, Pencil, Trash2 } from "lucide-react";

interface MarqueCardProps {
  marque: Marque;
  onEdit: (marque: Marque) => void;
  onDelete: (marqueId: string) => void;
}

export function MarqueCard({ marque, onEdit, onDelete }: MarqueCardProps) {
  return (
    <Card className="group relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer p-0 rounded">
      {/* Actions Icons */}
      <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 bg-white/95 backdrop-blur-sm hover:bg-white shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(marque);
          }}
        >
          <Pencil className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 bg-white/95 backdrop-blur-sm hover:bg-white hover:text-destructive shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(String(marque._id || marque.id));
          }}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>

      {/* Image Container */}
      <div className="aspect-square flex items-center justify-center ">
        {marque.logo ? (
          <img
            src={marque.logo}
            alt={marque.nom}
            className="max-h-32 max-w-32 object-contain"
          />
        ) : (
          <Building2 className="size-16 text-muted-foreground/20" />
        )}
      </div>

      {/* Info Overlay - Expands on Hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/75 via-black/70 to-transparent backdrop-blur-sm transition-all duration-300 ease-out">
        <div className="p-3">
          <h3 className="font-semibold text-sm text-white text-center mb-1">
            {marque.nom}
          </h3>
          {marque.description && (
            <p className="text-white/90 text-xs leading-relaxed text-center max-h-0 overflow-hidden group-hover:max-h-32 transition-all duration-300">
              {marque.description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
