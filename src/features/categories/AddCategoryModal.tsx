import InputForm from "@/components/input-form";
import TextareaForm from "@/components/textarea-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { Category } from "@/hooks/use-categories";
import { showToast } from "@/lib/toast";
import { GripVertical, Tag } from "lucide-react";
import { useState } from "react";

export interface AddCategoryModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  parentId?: string;
  onSubmit?: (data: { nom: string; description?: string; parent?: string }) => Promise<void>;
}

export default function AddCategoryModal({
  open,
  onOpenChange,
  trigger,
  title = "Ajouter une catégorie",
  description = "Créer une nouvelle catégorie",
  parentId,
  onSubmit,
}: AddCategoryModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState({
    nom: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Utiliser l'état externe si fourni, sinon l'état interne
  const isOpen = open !== undefined ? open : internalOpen;
  const handleOpenChange = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!categoryInfo.nom.trim()) {
      showToast("error", "Le nom de la catégorie est requis");
      return;
    }

    setIsSubmitting(true);
    // const toastId = showToast("loading", "Création de la catégorie...");

    try {
      if (onSubmit) {
        await onSubmit({
          nom: categoryInfo.nom.trim(),
          description: categoryInfo.description.trim() || undefined,
          parent: parentId || undefined,
        });
      }


      // Réinitialiser le formulaire
      setCategoryInfo({
        nom: "",
        description: "",
      });

      // Fermer le modal
      handleOpenChange(false);
    } catch (error: any) {
      console.error("Erreur lors de la création de la catégorie:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger && trigger}</DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5 rounded border border-muted-foreground">
        <DialogHeader className="contents space-y-0 text-left bg-gray-900">
          <DialogTitle className="border-b p-4 font-poppins text-white bg-gray-950 flex items-center gap-1 uppercase font-medium">
            <GripVertical size={16} /> {title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitForm}>
          <div className="overflow-y-auto">
            <div className="px-6 pt-4 pb-6">
              <div className="space-y-4">
                <div className="*:not-first:mt-2">
                  <InputForm
                    name="nom"
                    label="Nom de la catégorie"
                    type="text"
                    value={categoryInfo.nom}
                    required
                    onChange={(e) =>
                      setCategoryInfo({ ...categoryInfo, nom: e.target.value })
                    }
                    aria-label="Nom de la catégorie"
                    placeholder="Ex: Électronique"
                    iconLeft={<Tag size={14} />}
                    className="bg-gray-50"
                  />
                </div>
                
                <div className="*:not-first:mt-2">
                  <TextareaForm
                    name="description"
                    label="Description (optionnel)"
                    value={categoryInfo.description}
                    onChange={(e :any) =>
                      setCategoryInfo({ ...categoryInfo, description: e.target.value })
                    }
                    placeholder="Décrivez la catégorie..."
                    rows={3}
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="border-t px-6 py-4">
            <DialogClose asChild className="rounded px-5">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
              >
                Annuler
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="rounded px-10"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
