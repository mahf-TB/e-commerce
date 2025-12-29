'use client';

import type { Category } from '@/hooks/use-categories';
import { FolderTree } from 'lucide-react';
import * as React from 'react';
import CategoryColumn from './category-column';

interface CategoriesKanbanProps {
  categories: Category[];
  onEditCategory?: (category: Category) => void;
  onDeleteCategory?: (categoryId: string) => void;
  onAddCategory?: (data: { nom: string; description?: string; parent?: string }) => Promise<void>;
}

export default function CategoriesKanban({
  categories,
  onEditCategory,
  onDeleteCategory,
  onAddCategory,
}: CategoriesKanbanProps) {
  const [selectedPath, setSelectedPath] = React.useState<Category[]>([]);

  // Obtenir les catégories racines (sans parent)
  const rootCategories = React.useMemo(() => {
    return categories.filter(cat => !cat.parent);
  }, [categories]);

  // Obtenir les sous-catégories d'une catégorie
  const getSubCategories = (parentId: string) => {
    return categories.filter(cat => String(cat.parent) === String(parentId));
  };

  // Gérer la sélection d'une catégorie
  const handleSelectCategory = (category: Category, level: number) => {
    const newPath = [...selectedPath.slice(0, level), category];
    setSelectedPath(newPath);
  };

  // Construire les colonnes à afficher
  const columns = React.useMemo(() => {
    const cols: { title: string; categories: Category[]; level: number; parentId?: string }[] = [
      {
        title: 'Catégories principales',
        categories: rootCategories,
        level: 0,
      }
    ];

    selectedPath.forEach((selectedCat, index) => {
      const subCats = getSubCategories(String(selectedCat._id || selectedCat.id));
      if (subCats.length > 0 || index === selectedPath.length - 1) {
        cols.push({
          title: `"${selectedCat.nom}"`,
          categories: subCats,
          level: index + 1,
          parentId: String(selectedCat._id || selectedCat.id),
        });
      }
    });

    return cols;
  }, [rootCategories, selectedPath, categories]);

  return (
    <div className="flex h-[calc(100vh-180px)] rounded bg-white overflow-x-auto overflow-y-hidden">
      {columns.map((column, index) => (
        <CategoryColumn
          key={`${column.level}-${column.parentId || 'root'}`}
          title={column.title}
          categories={column.categories}
          selectedId={selectedPath[column.level] ? String(selectedPath[column.level]._id || selectedPath[column.level].id) : undefined}
          onSelectCategory={(cat) => handleSelectCategory(cat, column.level)}
          onEditCategory={onEditCategory}
          onDeleteCategory={onDeleteCategory}
          onAddSubCategory={onAddCategory}
          parentId={column.parentId}
          allCategories={categories}
          isLast={index === columns.length - 1}
        />
      ))}
      
      {columns.length === 1 && (
        <div className="flex-1 flex items-center justify-center text-center p-8">
          <div>
            <FolderTree className="size-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-medium text-lg mb-2">Sélectionnez une catégorie</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Cliquez sur une catégorie à gauche pour voir ses sous-catégories
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
