# Kanban pour Catégories

## Vue d'ensemble

Le composant `CategoriesKanban` permet d'afficher et d'organiser les catégories avec leurs sous-catégories dans une interface Kanban drag-and-drop.

## Structure

```
src/
├── components/
│   └── kanban/
│       ├── categories-kanban.tsx   # Composant Kanban adapté aux catégories
│       └── default.tsx              # Composant Kanban de base
└── pages/
    └── admin/
        └── categories-kanban.tsx    # Page exemple d'utilisation
```

## Fonctionnalités

### 1. Organisation par parent
- **Colonne "root"** : catégories principales (sans parent)
- **Colonnes par catégorie** : sous-catégories regroupées par parent

### 2. Actions disponibles
- ✏️ **Éditer** une catégorie (bouton Edit)
- 🗑️ **Supprimer** une catégorie (bouton Delete)
- 🔄 **Réorganiser** par glisser-déposer (drag & drop)
- 📊 **Badge de comptage** affiche le nombre de sous-catégories

### 3. Affichage
- 📁 Icône de dossier pour chaque catégorie
- 📝 Description (si disponible)
- 📅 Date de création

## Utilisation

### Intégration simple

```tsx
import CategoriesKanban from "@/components/kanban/categories-kanban";
import useCategories from "@/hooks/use-categories";

export default function MyPage() {
  const { items: categories } = useCategories();

  return (
    <CategoriesKanban
      categories={categories}
      onEditCategory={(cat) => console.log("Éditer:", cat)}
      onDeleteCategory={(id) => console.log("Supprimer:", id)}
      onReorganize={(structure) => console.log("Réorganiser:", structure)}
    />
  );
}
```

### Props du composant

```typescript
interface CategoriesKanbanProps {
  categories: Category[];                                    // Liste de toutes les catégories
  onEditCategory?: (category: Category) => void;            // Callback édition
  onDeleteCategory?: (categoryId: string) => void;          // Callback suppression
  onReorganize?: (structure: Record<string, Category[]>) => void; // Callback réorganisation
}
```

### Structure de données

```typescript
type Category = {
  _id: any;
  id: string;
  nom: string;
  description?: string | null;
  parent?: number | null;        // ID de la catégorie parent
  createdAt?: string;
  updatedAt?: string;
};
```

## Modes d'affichage

### Mode Kanban (recommandé)
Vue organisée en colonnes avec drag & drop activé.

```tsx
<CategoriesKanban categories={categories} />
```

### Mode Grille (alternatif)
Vue en grille classique pour comparaison.

```tsx
<div className="grid grid-cols-4 gap-4">
  {categories.map(cat => (
    <CategoryCard key={cat.id} category={cat} />
  ))}
</div>
```

## Responsive

- **Mobile (< 768px)** : 1 colonne
- **Tablet (768-1024px)** : 2 colonnes
- **Desktop (1024-1280px)** : 3 colonnes
- **Large (> 1280px)** : 4 colonnes

## Ajouter dans les routes

```tsx
// src/routes/AppRoutes.tsx
import CategoriesKanbanPage from "@/pages/admin/categories-kanban";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { 
        path: "parametre/categories", 
        element: <CategoriesKanbanPage /> 
      },
    ],
  },
]);
```

## Personnalisation

### Modifier le nombre de colonnes

```tsx
<KanbanBoard className="grid auto-rows-fr grid-cols-2 lg:grid-cols-5">
```

### Changer les couleurs de badges

```tsx
<Badge variant="secondary">  {/* ou: default, outline, destructive */}
  {subCategories.length}
</Badge>
```

### Ajouter des filtres

```tsx
const [filteredCategories, setFilteredCategories] = useState(categories);

// Filtrer par recherche
const searchCategories = (query: string) => {
  const filtered = categories.filter(cat => 
    cat.nom.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredCategories(filtered);
};
```

## Exemple complet avec gestion d'état

```tsx
import { useState } from "react";
import CategoriesKanban from "@/components/kanban/categories-kanban";
import useCategories, { type Category } from "@/hooks/use-categories";
import { showToast } from "@/lib/toast";

export default function CategoriesManager() {
  const { items: categories, refetch } = useCategories();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setShowDialog(true);
  };

  const handleDelete = async (categoryId: string) => {
    if (!confirm("Supprimer cette catégorie ?")) return;
    
    try {
      // await deleteCategory(categoryId);
      showToast("success", "Catégorie supprimée");
      refetch();
    } catch (error) {
      showToast("error", "Erreur lors de la suppression");
    }
  };

  const handleReorganize = async (newStructure: Record<string, Category[]>) => {
    try {
      // await saveNewOrganization(newStructure);
      showToast("success", "Organisation mise à jour");
    } catch (error) {
      showToast("error", "Erreur lors de la réorganisation");
    }
  };

  return (
    <div className="p-6">
      <CategoriesKanban
        categories={categories}
        onEditCategory={handleEdit}
        onDeleteCategory={handleDelete}
        onReorganize={handleReorganize}
      />
      
      {/* Dialog d'édition */}
      {showDialog && (
        <EditCategoryDialog 
          category={selectedCategory}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}
```

## API Backend attendue

Pour la réorganisation, envoyer la nouvelle structure :

```typescript
PUT /api/categories/reorder
{
  "categories": [
    { "id": "1", "parent": null, "order": 0 },
    { "id": "2", "parent": "1", "order": 0 },
    { "id": "3", "parent": "1", "order": 1 }
  ]
}
```

## Notes

- Les catégories sont automatiquement regroupées par parent
- Le drag & drop fonctionne à la fois pour les colonnes et les cartes
- Les modifications ne sont pas sauvegardées automatiquement (utiliser `onReorganize`)
- Tester avec des données réelles pour vérifier les performances avec +100 catégories
