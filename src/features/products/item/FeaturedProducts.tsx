import ImagesCard from "./ImagesCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Heart,
  MessageSquareHeart,
  Minus,
  Plus,
  Star,
} from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/utils/helpers";
import Tooltips from "@/components/tooltips";

type FeaturedProductProps = {
  product: any; // replace with a proper Product type when available
};

export function FeaturedProducts({ product }: FeaturedProductProps) {
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);


  return (
    <section className="flex flex-col md:flex-row items-start mt-5 gap-6">
      <div className="sticky top-25">
        <ImagesCard images={product.images} />
      </div>
      <div className="flex-2 flex flex-col lg:flex-row w-full gap-6">
        <main className="w-full md:flex-2 max-md:pb-0 rounded-md">
          <h2 className="text-2xl font-semibold mb-2 font-poppins">
            {product?.nom ?? "Titre indisponible"}
          </h2>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star fill="currentColor" size={16} />
              <span className="font-semibold font-poppins">
                {product?.note ?? "0"}
              </span>
              <span className="text-sm text-gray-500">
                ({product?.nombreAvis ?? 0} avis)
              </span>
            </div>
            {product?.reduction && (
              <Badge className="ml-1" variant="destructive">
                -{product.reduction}%
              </Badge>
            )}
          </div>
          {/* Variants */}
          {product?.variants && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Options sur variant</h4>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map((v: any, idx: number) => (
                  <Button
                    key={idx}
                    variant={selectedVariant === idx ? "default" : "outline"}
                    size="sm"
                    className="rounded"
                    onClick={() => setSelectedVariant(idx)}
                  >
                    {v.variant}
                  </Button>
                ))}
              </div>
            </div>
          )}
          <ul className="mb-4 list-disc ml-5">
            {String(product?.description ?? "Aucune description")
              .split("/")
              .map((p) => p.trim())
              .filter(Boolean)
              .map((part, idx) => (
                <li key={idx} className="text-sm text-gray-600 mb-1">
                  {part}
                </li>
              ))}
          </ul>

          <div className="mb-4 flex items-start flex-col gap-1">
            <div className="text-2xl font-bold font-poppins">
              Prix : {formatPrice(product?.prixUnitaire ?? 0)}
            </div>
            <div className="text-sm text-gray-500  flex items-center gap-1">
              <Brain size={18} />
              <span className="font-medium">{product?.etatStock ?? "—"}</span>
            </div>
            {/* {listPrice > price && (
                <div className="text-sm text-gray-500 line-through">{listPrice.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</div>
              )} */}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Tooltips text={"Ajouter ce produit dans votre panier"}>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-600/90 text-slate-100 font-semibold rounded-md"
                // onClick={()=>navigate("/checkout")}
              >
                Ajouter dans le panier
              </Button>
            </Tooltips>
            <Tooltips text={"Donner votre avis sur ce produit"}>
              <Button
                className={"px-3 py-1 rounded-md text-[11px] font-medium "}
              >
                <MessageSquareHeart />
              </Button>
            </Tooltips>
            <Tooltips text={"Ajouter aux favoris"}>
              <Button
                className={"px-3 py-1 rounded-md text-[11px] font-medium "}
              >
                <Heart />
              </Button>
            </Tooltips>
          </div>
          <div>
          </div>
        </main>

        <aside className="w-full lg:w-80 bg-white rounded p-4 max-md:pt-0 h-fit lg:sticky lg:top-25">
          <div className="text-sm text-gray-500 mb-2">
            Résumé de la commande
          </div>
          {/* Add to cart */}

          <div className="flex items-center justify-between mb-2">
            <span>{`${quantity} * ${product.prixUnitaire} ar`}</span>
            <div className="flex items-center justify-end gap-0 rounded px-2 py-1">
              <Button
                type="button"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity((q) => Math.max(1, q - 1));
                }}
                className="h-6 w-6 text-muted hover:text-muted/50"
                disabled={quantity <= 1}
              >
                <Minus size={14} />
              </Button>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-10 text-center text-xs bg-transparent border-0 outline-none"
                min="1"
              />
              <Button
                type="button"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity((q) => q + 1);
                }}
                className="h-6 w-6 text-muted hover:text-muted/50"
              >
                <Plus size={14} />
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Sous-total</span>
            <span className="font-medium">
              {formatPrice(product.prixUnitaire * quantity)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Frais</span>
            <span className="font-medium">
              {formatPrice(5000)}
            </span>
          </div>

          <Button variant="default" className="w-full mt-5">
            Passer la commande
          </Button>
        </aside>
      </div>
    </section>
  );
}
