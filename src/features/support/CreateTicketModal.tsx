import InputForm from "@/components/input-form";
import SelectForm from "@/components/select-form";
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
import { showToast } from "@/lib/toast";
import { AlertCircle, GripVertical, Tag } from "lucide-react";
import { useState } from "react";
import type { TicketPriority } from "./SupportTicketCard";

interface CreateTicketModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  onSubmit?: (data: {
    title: string;
    description: string;
    category: string;
    priority: TicketPriority;
  }) => Promise<void>;
}

const categories = [
  { value: "technique", label: "Problème technique" },
  { value: "commande", label: "Question sur commande" },
  { value: "paiement", label: "Problème de paiement" },
  { value: "compte", label: "Gestion de compte" },
  { value: "produit", label: "Question sur produit" },
  { value: "autre", label: "Autre" },
];

const priorities = [
  { value: "low", label: "Basse" },
  { value: "medium", label: "Moyenne" },
  { value: "high", label: "Haute" },
  { value: "urgent", label: "Urgente" },
];

export function CreateTicketModal({
  open,
  onOpenChange,
  trigger,
  onSubmit,
}: CreateTicketModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [ticketData, setTicketData] = useState({
    title: "",
    description: "",
    category: "technique",
    priority: "medium" as TicketPriority,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOpen = open !== undefined ? open : internalOpen;
  const handleOpenChange = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ticketData.title.trim()) {
      showToast("error", "Le titre est requis");
      return;
    }

    if (!ticketData.description.trim()) {
      showToast("error", "La description est requise");
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(ticketData);
      }

      showToast("success", "Ticket créé avec succès");

      setTicketData({
        title: "",
        description: "",
        category: "technique",
        priority: "medium",
      });

      handleOpenChange(false);
    } catch (error: any) {
      showToast(
        "error",
        error?.response?.data?.message ||
          error?.message ||
          "Erreur lors de la création du ticket"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5 rounded border border-muted-foreground">
        <DialogHeader className="contents space-y-0 text-left bg-gray-900">
          <DialogTitle className="border-b p-4 font-poppins text-white bg-gray-950 flex items-center gap-1 uppercase font-medium">
            <GripVertical size={16} /> Créer un ticket de support
          </DialogTitle>
          <DialogDescription className="sr-only">
            Créer un nouveau ticket de support
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="overflow-y-auto">
            <div className="px-6 pt-4 pb-6 space-y-4">
              <InputForm
                name="title"
                label="Titre du ticket"
                type="text"
                value={ticketData.title}
                required
                onChange={(e) =>
                  setTicketData({ ...ticketData, title: e.target.value })
                }
                placeholder="Ex: Problème de connexion"
                iconLeft={<Tag size={14} />}
                className="bg-gray-50"
              />

              <div className="grid grid-cols-2 gap-3">
                <SelectForm
                  label="Catégorie"
                  value={ticketData.category}
                  onChange={(value) =>
                    setTicketData({ ...ticketData, category: value })
                  }
                  options={categories}
                  className="bg-gray-50"
                />

                <SelectForm
                  label="Priorité"
                  icon={AlertCircle}
                  value={ticketData.priority}
                  onChange={(value) =>
                    setTicketData({ ...ticketData, priority: value as TicketPriority })
                  }
                  options={priorities}
                  className="bg-gray-50"
                />
              </div>

              <TextareaForm
                name="description"
                label="Description détaillée"
                value={ticketData.description}
                required
                onChange={(e: any) =>
                  setTicketData({ ...ticketData, description: e.target.value })
                }
                placeholder="Décrivez votre problème en détail..."
                rows={5}
                className="bg-gray-50"
              />
            </div>
          </div>

          <DialogFooter className="border-t px-6 py-4">
            <DialogClose asChild className="rounded px-5">
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Annuler
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="rounded px-10"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Création..." : "Créer le ticket"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
