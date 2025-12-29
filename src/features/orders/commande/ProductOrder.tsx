import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";

type ProductItemProps = {
  id: string | number;
  nom: string;
  image: string;
  description?: string;
  code?: string;
  prix: number;
  quantite?: number;
  total?: number;
  onClick?: () => void;
  containerClassName?: string;
  showQuantityControl?: boolean;
  incrementQuantity?: () => void;
  decrementQuantity?: () => void;
  updateQuantity?: (quantity: number) => void;
  removeItem?: () => void;
};


export default function ProductOrder({
  id,
  nom,
  image,
  prix,
  code,
  quantite = 4,
  total,
  onClick,
  containerClassName,
}: ProductItemProps) {
  const totalPrice = total ?? prix * quantite;
  const navigate = useNavigate();
console.log(id);

  return (
    <div
      className={cn(
        "relative flex items-center p-2 rounded border border-transparent hover:border-border hover:bg-accent transition-all  group",
        containerClassName
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Image produit */}
      <div className="relative shrink-0 ">
        <img
          alt={nom}
          className="w-16 h-16 rounded-xs object-cover"
          src={image}
        />
      </div>

      {/* Contenu produit */}
      <div className="flex-1 min-w-0 space-y-1 mx-2">
        <p
          onClick={() => navigate(`/products/${id}`)}
          className="font-medium text-sm text-foreground hover:underline  cursor-pointer line-clamp-2"
        >
          {nom}
        </p>
        {/* Quantité + Prix unitaire */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">{code}</span>
        </div>
      </div>

      {/* Prix total */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">
            {quantite}* {formatPrice(prix)}
          </span>
        </div>
        <div className="flex items-center gap-1 px-2">
          <span className="font-semibold text-sm text-foreground">
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
