import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  onRatingChange?: (rating: number) => void;
  defaultValue?: number;
  size?: number;
  className?: string;
}

export default function StarRating({
  onRatingChange,
  defaultValue = 0,
  size = 24,
  className,
}: StarRatingProps) {
  const [rating, setRating] = useState<number>(defaultValue);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleClick = (value: number) => {
    setRating(value);
    onRatingChange?.(value);
  };
  
  const handleMouseEnter = (value: number) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className={cn("flex gap-2", className)}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isHovered = star <= hoverRating;
        const isSelected = star <= rating;

        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            className="transition-transform duration-200 hover:scale-110  p-1"
            aria-label={`Donner une note de ${star} étoiles`}
          >
            <Star
              size={size}
              className={cn(
                "transition-all duration-200",
                isHovered || isSelected
                  ? "fill-yellow-400 stroke-yellow-400 text-yellow-400"
                  : "stroke-gray-300 text-gray-300"
              )}
            />
          </button>
        );
      })}
      {rating > 0 && (
        <span className="ml-2 text-sm font-medium text-gray-600 flex items-center">
          {rating}/5
        </span>
      )}
    </div>
  );
}
