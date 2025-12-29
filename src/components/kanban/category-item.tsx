import { Button } from '@/components/ui/button';
import type { Category } from '@/hooks/use-categories';
import { cn } from '@/lib/utils';
import { ChevronRight, Edit, GripVertical, Trash2 } from 'lucide-react';

interface CategoryItemProps {
  category: Category;
  isSelected?: boolean;
  hasChildren?: boolean;
  onClick: () => void;
  onEdit?: (category: Category) => void;
  onDelete?: (categoryId: string) => void;
}

export default function CategoryItem({ 
  category, 
  isSelected, 
  hasChildren, 
  onClick, 
  onEdit, 
  onDelete 
}: CategoryItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex items-center justify-between p-3 rounded border cursor-pointer transition-all",
        isSelected 
          ? "bg-gray-900 text-white border-gray-900" 
          : "bg-white hover:bg-gray-50 border-gray-200"
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <GripVertical className={cn("size-4 shrink-0", isSelected ? "text-white" : "text-muted-foreground")} />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{category.nom}</h4>
          {category.description && (
            <p className={cn(
              "text-xs line-clamp-1 mt-0.5",
              isSelected ? "text-gray-300" : "text-muted-foreground"
            )}>
              {category.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-1 ml-2">
       
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-7 w-7 p-0 opacity-0 group-hover:opacity-100",
              isSelected && "text-white hover:text-white hover:bg-white/20"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(category);
            }}
          >
            <Edit className="size-3" />
          </Button>
        )}
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-destructive opacity-0 group-hover:opacity-100 hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(category._id || category.id);
            }}
          >
            <Trash2 className="size-3" />
          </Button>
        )}
         {hasChildren && (
          <ChevronRight className={cn("size-4", isSelected ? "text-white" : "text-muted-foreground")} />
        )}
      </div>
    </div>
  );
}
