import BadgeButton from "@/components/BadgeButton";
import { Button } from "@/components/ui/button";
import { EllipsisIcon, PenBox, Printer } from "lucide-react";
import ImageProductList from "./ImageProductList";
import type { Produit } from "@/types";
import { formatDate, formatPrice } from "@/utils/helpers";

type ProductDetailsProps = {
  product: Produit | undefined;
  isLoading: boolean;
};

const ProductDetails = ({ product, isLoading } : ProductDetailsProps) => {

    const marque = product?.marque;
    const categorie = product?.categorie;

    const stoctActuel = product?.variants.reduce((acc, variant) => acc + variant.qte, 0) || 0;
    const stockMinimum = product?.variants.reduce((acc, variant) => acc + variant.seuil, 0) || 0;
    const totalValue = product?.variants.reduce((acc, variant) => acc + (variant.qte * variant.prixUnitaire), 0) || 0;
  return (
    <div className="font-poppins space-y-6 pl-4 ">
      <div className="block w-full text-3xl font-semibold text-start text-gray-900 dark:text-gray-300 whitespace-normal wrap-break-word">
        {product?.nom}
      </div>
      <div className="flex gap-4">
        <Button
          variant={"outline"}
          className="flex items-center gap-1 rounded bg-gray-950 text-white px-2 py-2"
        >
          <PenBox size={18} />
          <span className="">Modifier</span>
        </Button>
        <Button
          className="flex items-center gap-1 rounded  px-2 py-2"
          variant={"outline"}
        >
          <Printer size={18} />
          <span className="">Imprimer</span>
        </Button>

        <BadgeButton className="rounded" icon={EllipsisIcon} />
      </div>
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-lg font-semibold font-poppins">
          Informations du produit
        </h2>
        <div className="grid grid-cols-[140px_1fr] gap-3 text-sm text-left">
          {/* <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm"></div> */}
          <span className="text-muted-foreground">Date de creation</span>
          <span className="font-medium">{product?.createdAt ? formatDate(product.createdAt) : ''}</span>

          <span className="text-muted-foreground">Marque</span>
          <span className="font-medium">{marque?.nom}</span>

          <span className="text-muted-foreground">Catégorie</span>
          <span className="font-medium">{categorie?.nom}</span>

          <span className="text-muted-foreground">Stock actuel</span>
          <span className="font-medium">{stoctActuel} </span>

          <span className="text-muted-foreground">Stock minimum</span>
          <span className="font-medium">{stockMinimum} </span>

          <span className="text-muted-foreground">Quantité vendue</span>
          <span className="font-medium">45</span>

          <span className="text-muted-foreground">Total</span>
          <span className="font-medium">{formatPrice(totalValue)}</span>
        </div>

        <h2 className="text-lg font-semibold font-poppins">Photo du produit</h2>
        <div
          className="flex gap-2 items-center w-full overflow-x-auto whitespace-nowrap px-1 py-2 snap-x snap-mandatory"
          role="list"
          aria-label="Images du produit"
        >
          {product?.images.map((img, i) => (
            <ImageProductList key={i} id={i} img={`${(import.meta as any).env?.VITE_BACKEND_URL}${img.url}`} />
          ))}
        </div>
      </div>
      <div className="h-px bg-gray-300 -ml-4"></div>
    </div>
  );
};

export default ProductDetails;
