import BadgeButton from "@/components/BadgeButton";
import { Button } from "@/components/ui/button";
import {
  EllipsisIcon,
  PenBox,
  Printer,
  Shield,
  ShieldOff,
  Trash,
} from "lucide-react";
import ImageProductList from "./ImageProductList";
import type { Produit } from "@/types";
import { formatDate, formatPrice } from "@/utils/helpers";
import ProductDetailsSkeleton from "../skeleton/ProductDetailsSkeleton";
import React from "react";
import BadgeItem from "@/components/BadgeItem";
import LineChart5 from "@/components/line-chart-5";
import useSystemStore from "@/store/use-system.store";
import { cn } from "@/lib/utils";
import LineChart7 from "@/components/line-chart-7";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import Dropdown, { DropdownItems } from "@/components/dropdown";
import { changeStatutProduct } from "@/services/produitService";
import ActionDetails from "./ActionDetails";

type ProductDetailsProps = {
  product: Produit | undefined;
  isLoading: boolean;
};

const ProductDetails = ({ product, isLoading }: ProductDetailsProps) => {
  const marque = product?.marque;
  const categorie = product?.categorie;
  const variants = product?.variants || [];

  const { expandSheet } = useSystemStore();

  const stoctActuel =
    variants.reduce((acc, variant) => acc + variant.qte, 0) || 0;
  const stockMinimum =
    variants.reduce((acc, variant) => acc + variant.seuil, 0) || 0;
  const totalValue =
    variants.reduce(
      (acc, variant) => acc + variant.qte * variant.prixUnitaire,
      0
    ) || 0;

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }
  return (
    <div className={cn(expandSheet ? "flex justify-between items-start" : "")}>
      <div className="font-poppins space-y-6 px-4 pb-5">
        <div className="block w-full text-3xl font-semibold text-start text-gray-900 dark:text-gray-300 whitespace-normal wrap-break-word">
          {product?.nom || "Détails du produit"}
        </div>
        {/* Action pour produit */}
        <ActionDetails id={product?.id || ""} statut={product?.statut || ""} />
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-lg font-semibold font-poppins">
            Informations du produit
          </h2>
          <div className="grid grid-cols-[140px_1fr] gap-3 text-sm text-left">
            {/* <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm"></div> */}
            <span className="text-muted-foreground">Date de creation</span>
            <span className="font-medium">
              {product?.createdAt ? formatDate(product.createdAt) : ""}
            </span>
            {/* Marque */}
            <span className="text-muted-foreground">Marque</span>
            <span className="font-medium">{marque?.nom}</span>
            {/* Categorie  */}
            <span className="text-muted-foreground">Catégorie</span>
            <span className="font-medium">{categorie?.nom}</span>
            {/* Stock actuel */}
            <span className="text-muted-foreground">Stock actuel</span>
            <span className="font-medium">{stoctActuel} </span>
            {/* Stock minimum */}
            <span className="text-muted-foreground">Stock minimum</span>
            <span className="font-medium">{stockMinimum} </span>
            {/* Quantité vendue */}
            <span className="text-muted-foreground">Quantité vendue</span>
            <span className="font-medium">45</span>
            {/* Valeur totale */}
            <span className="text-muted-foreground">Total</span>
            <span className="font-medium">{formatPrice(totalValue)}</span>
          </div>
          {variants.length > 0 && (
            <>
              <h2 className="text-lg font-semibold font-poppins">Variants</h2>
              <div className="grid grid-cols-[340px_1fr] gap-y-2 text-sm text-left">
                {variants.map((v, i) => (
                  <React.Fragment key={i}>
                    <div className="text-foreground flex flex-col gap-1 p-1">
                      <span className="">{v.variant} </span>
                      <span className="text-muted-foreground text-xs">
                        {formatPrice(v.prixUnitaire)} - Stock: {v.qte}
                      </span>
                      <BadgeItem
                        statut={
                          v.statut === "active"
                            ? "Publié"
                            : v.statut === "inactive"
                            ? "Inactif"
                            : "Archivé"
                        }
                        className={` ${
                          v.statut === "active"
                            ? "bg-green-500"
                            : v.statut === "inactive"
                            ? "bg-red-500"
                            : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="font-medium  p-1 items-center flex">
                      <Dropdown
                        btnShow={
                          <BadgeButton
                            className="rounded"
                            size={"icon"}
                            icon={EllipsisIcon}
                          />
                        }
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownItems
                          icon={<PenBox size={18} />}
                          title="Modifier"
                          // onClick={() =>  onEdit(id)}
                        />
                        {v.statut === "active" ? (
                          <DropdownItems
                            icon={<ShieldOff size={18} />}
                            title="Désactiver"
                            onClick={() =>
                              changeStatutProduct(v.id, { statut: "inactive" })
                            }
                          />
                        ) : (
                          <DropdownItems
                            icon={<Shield size={18} />}
                            title="Activer"
                            onClick={() =>
                              changeStatutProduct(v.id, { statut: "active" })
                            }
                          />
                        )}

                        <DropdownItems
                          icon={<Trash size={18} />}
                          title="Supprimer"
                          variant="destructive"
                          onClick={() =>
                            changeStatutProduct(v.id, { statut: "archived" })
                          }
                        />
                      </Dropdown>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
          <h2 className="text-lg font-semibold font-poppins">
            Photo du produit
          </h2>
          <div
            className="flex gap-2 items-center w-full overflow-x-auto whitespace-nowrap px-1  snap-x snap-mandatory"
            role="list"
            aria-label="Images du produit"
          >
            {product?.images.map((img, i) => (
              <ImageProductList
                key={i}
                id={i}
                img={`${(import.meta as any).env?.VITE_BACKEND_URL}${img.url}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="h-px bg-gray-300 my-4" />
      <div className="sticky top-15 py-5">
        <LineChart5 />
        {/* <LineChart7 /> */}
      </div>
    </div>
  );
};

export default ProductDetails;
