import { Button } from '@/components/ui/button';
import AddCategoryModal from '@/features/categories/AddCategoryModal';
import type { Category } from '@/hooks/use-categories';
import { cn } from '@/lib/utils';
import { FolderTree, Plus } from 'lucide-react';
import * as React from 'react';
import CategoryItem from './category-item';

interface CategoryColumnProps {
  title: string;
  categories: Category[];
  selectedId?: string;
  onSelectCategory: (category: Category) => void;
  onEditCategory?: (category: Category) => void;
  onDeleteCategory?: (categoryId: string) => void;
  onAddSubCategory?: (data: { nom: string; description?: string; parent?: string }) => Promise<void>;
  parentId?: string;
  allCategories: Category[];
  isLast?: boolean;
}

export default function CategoryColumn({
  title,
  categories,
  selectedId,
  onSelectCategory,
  onEditCategory,
  onDeleteCategory,
  onAddSubCategory,
  parentId,
  allCategories,
  isLast = false,
}: CategoryColumnProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const hasChildren = (catId: string) => {
    return allCategories.some(cat => String(cat.parent) === String(catId));
  };

  return (
    <div className={cn(
      "shrink-0 w-80 bg-gray-50/50 overflow-hidden flex flex-col",
      !isLast && "border-r border-gray-200"
    )}>
      <div className="flex items-center justify-between p-4 bg-white">
        <div>
          <h3 className="font-semibold text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {categories.length} {categories.length > 1 ? 'catégories' : 'catégorie'}
          </p>
        </div>
        {onAddSubCategory && (
          <>
            <Button
              size="icon"
              onClick={() => setIsModalOpen(true)}
              className="h-8 rounded"
            >
              <Plus className="size-4" />
            </Button>
            
            <AddCategoryModal
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
              title={parentId ? "Ajouter une sous-catégorie" : "Ajouter une catégorie"}
              parentId={parentId}
              onSubmit={onAddSubCategory}
            />
          </>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <FolderTree className="size-8 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">Aucune catégorie</p>
          </div>
        ) : (
          categories.map((category) => (
            <CategoryItem
              key={category._id || category.id}
              category={category}
              isSelected={String(category._id || category.id) === selectedId}
              hasChildren={hasChildren(String(category._id || category.id))}
              onClick={() => onSelectCategory(category)}
              onEdit={onEditCategory}
              onDelete={onDeleteCategory}
            />
          ))
        )}
      </div>
    </div>
  );
}
