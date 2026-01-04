import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TextareaForm from "./textarea-form";
import StarRating from "./star-rating";
import { useState } from "react";
import Tooltips from "./tooltips";
import { createNewAvis } from "@/services/avisService";
import { showToast } from "@/lib/toast";

type FeedbackPopoverProps = {
  id: string | number;
  btnShow?: React.ReactNode;
  tooltipLabel?: string;
};

export default function FeedbackPopover({
  id,
  btnShow,
  tooltipLabel,
}: FeedbackPopoverProps) {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Réinitialiser les valeurs après l'envoi
      const res = await createNewAvis({
        produit: id.toString(),
        note: rating,
        commentaire: feedback,
      });

      if (res) {
        showToast("success", "Votre avis a été envoyé avec succès.");
        setRating(0);
        setFeedback("");
        setIsOpen(false);
      }
    } catch (error) {
      showToast("error", "Une erreur est survenue. Réessayez plus tard.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <Tooltips side="bottom" text={tooltipLabel || ""}>
          <PopoverTrigger asChild>{btnShow && btnShow}</PopoverTrigger>
        </Tooltips>
        <PopoverContent className="w-80">
          <div className="mb-2">
            <p className="text-xs text-gray-900 font-poppins mb-2">
              Évaluez votre expérience
            </p>
            <StarRating
              onRatingChange={setRating}
              defaultValue={rating}
              size={28}
            />
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <TextareaForm
              aria-label="Envoyer un avis"
              label="Donnez-nous votre avis"
              id="feedback"
              placeholder="Comment pouvons-nous améliorer ?"
              value={feedback}
              onChange={(e: any) => setFeedback(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
              <Button
                type="submit"
                size="sm"
                className="rounded"
                disabled={rating === 0}
              >
                Envoyer
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
