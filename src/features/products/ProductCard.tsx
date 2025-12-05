import Tooltips from "@/components/tooltips";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ProductStatus = "en-stock" | "limité" | "rupture";

type ProductCardProps = {
  name: string;
  description: string; // ex: "Intel i7, 16GB RAM, RTX 4060"
  price: number; // en dollars ou Ariary
  imageUrl: string;
  rating: number; // ex: 4.7
  reviewsCount: number; // ex: 213
  status: ProductStatus;
};

export function ProductCard({
  name,
  description,
  price,
  imageUrl,
  rating,
  reviewsCount,
  status,
}: ProductCardProps) {
  const formatPrice = (value: number) =>
    `${value.toLocaleString("en-US", { minimumFractionDigits: 0 })} `;
const navigate = useNavigate()
  return (
    <Card className="flex flex-col rounded-2xl  shadow-none overflow-hidden p-0 gap-0">
      {/* Image */}
      <div className="relative h-52 w-full">
        <img src={imageUrl} alt={name} className="w-full h-52 object-cover" />
      </div>

      {/* Contenu */}
      <div className="flex flex-col justify-between h-full gap-1 px-4 py-4">
        {/* Nom */}
        <h3 className="text-base font-semibold line-clamp-1">{name}</h3>
        {/* Description courtes (specs) */}
        <p className="text-xs text-slate-400 line-clamp-2">{description}</p>
        {/* Prix + note */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold ">
            {formatPrice(price)}{" "}
            <span className="font-poppins text-xs font-medium">ar</span>
          </span>
          <div className="flex items-center gap-1 text-xs ">
            <span className="text-amber-400">★</span>
            <span>{rating.toFixed(1)}</span>
            <span className="text-slate-500">({reviewsCount})</span>
          </div>
        </div>

        {/* Boutons */}
        <div className="mt-3 flex items-center gap-2">
          <Tooltips side="bottom" text={"Passer aux commande direct de ce produit"}>
            <Button
              className="flex-1 bg-green-600 hover:bg-green-600/90 text-slate-100 font-semibold rounded-md"
              size="sm"
              disabled={status === "rupture"}
              onClick={()=>navigate("/checkout")}
            >
              Commander
            </Button>
          </Tooltips>

          <Tooltips text={"Ajouter au panier"}>
            <Button
              size="sm"
              disabled={status === "rupture"}
              className={"px-3 py-1 rounded-md text-[11px] font-medium "}
            >
              <ShoppingCart />
            </Button>
          </Tooltips>
        </div>
      </div>
    </Card>
  );
}
