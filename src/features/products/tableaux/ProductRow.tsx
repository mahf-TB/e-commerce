import BadgeItem from "@/components/BadgeItem";
import CardSheetModal from "@/components/CardSheetModal";
import Dropdown, { DropdownItems } from "@/components/dropdown";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { useProduct } from "@/hooks/use-product";
import { changeStatutProduct } from "@/services/produitService";
import { formatDate, formatPrice } from "@/utils/helpers";
import {
  EllipsisVertical,
  ImagePlusIcon,
  PenBox,
  ReceiptText,
  Shield,
  ShieldOff,
  Trash
} from "lucide-react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails";

export interface ProductRowProps {
  id: string | number;
  code: string;
  produit: string;
  description: string;
  image: string;
  category: string;
  variantes: number;
  quantite: number;
  prix: number;
  nombreAvis: number;
  noteMoyenne: number;
  date: string;
  statut: string;
  onView?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({
  id,
  code,
  produit,
  image,
  category,
  variantes,
  quantite,
  prix,
  nombreAvis,
  noteMoyenne = 0,
  date,
  statut,
}) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | number | null>(
    null
  );

  const { data: productDetail, isLoading: isProductLoading } = useProduct(
    selectedId ?? undefined
  );

  const handleView = useCallback((id: string | number) => {
    setSelectedId(id);
    setOpenModal(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenModal(false);
    setSelectedId(null);
  }, []);

  return (
    <tr className="hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors">
      {/* CLIENT */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  ">
        <div className="flex items-center gap-2  whitespace-nowrap">
          {image && (
            <img
              alt={produit}
              className="size-9 rounded-md"
              height={32}
              src={image}
              width={32}
            />
          )}

          <div className="max-w-72 line-clamp-1 flex flex-col">
            <div className="line-clamp-1">{produit}</div>
            <div className="text-xs text-green-700 ">{code}</div>
          </div>
        </div>
      </td>
      {/* NUMERO DE COMMANDE */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
        {category}
      </td>

      {/*  totalArticles */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  whitespace-nowrap">
        {variantes} articles
      </td>
      {/*  totalArticles */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  whitespace-nowrap">
        {quantite}
      </td>

      {/*  total montant */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  whitespace-nowrap">
        {formatPrice(prix)}
      </td>
      {/*  total montant */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  whitespace-nowrap">
        <div className="flex items-center gap-1 text-xs ">
          <span className="text-amber-400">★</span>
          <span>{noteMoyenne.toFixed(1)}</span>
          {nombreAvis > 0 && (
            <span className="text-slate-500">({nombreAvis})</span>
          )}
        </div>
      </td>
      {/* STATUT */}
      <td className="px-4 py-2 text-sm">
        <BadgeItem
          statut={
            statut === "active"
              ? "Publié"
              : statut === "inactive"
              ? "Inactif"
              : "Archivé"
          }
          className={` ${
            statut === "active"
              ? "bg-green-500"
              : statut === "inactive"
              ? "bg-red-500"
              : "bg-gray-400"
          }`}
        />
      </td>

      {/* DATE */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
        {formatDate(date)}
      </td>

      {/* ACTIONS */}
      <td className="px-4 py-2 text-right text-sm whitespace-nowrap">
        <Dropdown
          btnShow={
            <button className="rounded-md border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all px-1 py-1">
              <EllipsisVertical size={16} />
            </button>
          }
        >
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownItems
            icon={<ReceiptText size={18} />}
            title="Voir détails"
            onClick={() => handleView(id)}
          />
          <DropdownItems
            icon={<PenBox size={18} />}
            title="Modifier"
            onClick={() => navigate(`${id}`)}
          />
          <DropdownItems
            icon={<ImagePlusIcon size={18} />}
            title="Gérer les images"
            onClick={() => navigate(`${id}/images`)}
          />
          {statut === "active" ? (
            <DropdownItems
              icon={<ShieldOff size={18} />}
              title="Désactiver le produit"
              onClick={() => changeStatutProduct(id, { statut: "inactive" })}
            />
          ) : (
            <DropdownItems
              icon={<Shield size={18} />}
              title="Activer le produit"
              onClick={() => changeStatutProduct(id, { statut: "active" })}
            />
          )}

          <DropdownItems
            icon={<Trash size={18} />}
            title="Supprimer"
            variant="destructive"
            onClick={() => changeStatutProduct(id, { statut: "archived" })}
          />
        </Dropdown>
        {/* Modal pour details d'un produits */}
        <CardSheetModal openModal={openModal} setOpenModal={handleClose}>
          <ProductDetails
            product={productDetail}
            isLoading={isProductLoading}
          />
        </CardSheetModal>
      </td>
    </tr>
  );
};
