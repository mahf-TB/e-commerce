import CategoriesKanban from "@/components/kanban/categories-kanban";
import SegmentedControl from "@/components/segmented-control";
import useCategories, { useCreateCategory, type Category } from "@/hooks/use-categories";
import { useState } from "react";

function CategoriesKanbanPage() {
  const { items: categories, isLoading } = useCategories();
  const { mutateAsync: createCategory } = useCreateCategory();
  const [mode, setMode] = useState("kanban");

  const handleEditCategory = (category: Category) => {
    console.log("Éditer catégorie:", category);
    // Ouvrir un dialog ou modal pour éditer
  };

  const handleDeleteCategory = (categoryId: string) => {
    console.log("Supprimer catégorie:", categoryId);
    // Confirmer puis supprimer
  };

  const onAddCategory = async (data: { nom: string; description?: string; parent?: string }) => {
    await createCategory(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Chargement des catégories...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestion des catégories</h1>
          <p className="text-muted-foreground">
            Organisez vos catégories et sous-catégories par glisser-déposer
          </p>
        </div>
        <div className="flex items-center gap-2">
            <SegmentedControl
              value={mode}
              onValueChange={setMode}
              options={[
                {
                  value: "kanban",
                  label: "Vue Kanban",
                },
                {
                  value: "grid",
                  label: "Vue Grille",
                },
              ]}
            />

        </div>
      </div>

      {/* Kanban Board */}
      {mode === "kanban" ? (
        <CategoriesKanban
          categories={categories}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
          onAddCategory={onAddCategory}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat._id || cat.id}
              className="border rounded-md p-4  bg-card  shadow-xs hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium">{cat.nom}</h3>
              <p className="text-sm text-muted-foreground">{cat.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Wrapper export : vérifie le rôle avant d'afficher le dashboard
import RequireRole from "@/components/RequireRole";

export default function CategoriesKanbanPageWrapper() {
  return (
    <RequireRole allowedRoles={["admin"]}>
      <CategoriesKanbanPage />
    </RequireRole>
  );
}