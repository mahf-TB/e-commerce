import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/utils/EmptyState";
import SegmentedControl from "@/components/utils/segmented-control";
import { MarqueCard } from "@/features/marques/MarqueCard";
import { MarqueListItem } from "@/features/marques/MarqueListItem";
import useBrands, { type Marque } from "@/hooks/use-marques";
import { Building2, Plus } from "lucide-react";
import { useState } from "react";

function MarquesPage() {
  const { items: marques, isLoading } = useBrands();
  const [mode, setMode] = useState<"grid" | "list">("grid");

  const handleAddMarque = () => {
    console.log("Ajouter marque");
    // Ouvrir modal d'ajout
  };

  const handleEditMarque = (marque: Marque) => {
    console.log("Éditer marque:", marque);
    // Ouvrir modal d'édition
  };

  const handleDeleteMarque = (marqueId: string) => {
    console.log("Supprimer marque:", marqueId);
    // Confirmer puis supprimer
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Chargement des marques...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des marques</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez les marques de vos produits
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SegmentedControl
            value={mode}
            onValueChange={(value) => setMode(value as "grid" | "list")}
            options={[
              {
                value: "grid",
                label: "Grille",
              },
              {
                value: "list",
                label: "Liste",
              },
            ]}
          />

          <Button onClick={handleAddMarque} className="rounded shadow-sm">
            <Plus className="size-4 mr-1.5" />
            Nouvelle marque
          </Button>
        </div>
      </div>

      {/* Content */}
      {marques.length === 0 ? (
        <div className="py-12">
          <EmptyState
            media={<Building2 className="size-12" />}
            title="Aucune marque"
            description="Commencez par ajouter votre première marque"
            actions={[{
              label: "Ajouter une marque",
              onClick: handleAddMarque,
            }]}
          />
        </div>
      ) : mode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {marques.map((marque) => (
            <MarqueCard
              key={marque._id || marque.id}
              marque={marque}
              onEdit={handleEditMarque}
              onDelete={handleDeleteMarque}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {marques.map((marque) => (
            <MarqueListItem
              key={marque._id || marque.id}
              marque={marque}
              onEdit={handleEditMarque}
              onDelete={handleDeleteMarque}
            />
          ))}
        </div>
      )}
    </div>
  );
}


// Wrapper export : vérifie le rôle avant d'afficher le dashboard
import RequireRole from "@/components/utils/RequireRole";

export default function MarquesPageWrapper() {
  return (
    <RequireRole allowedRoles={["admin"]}>
      <MarquesPage />
    </RequireRole>
  );
}