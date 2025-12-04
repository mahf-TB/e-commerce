import React from "react";
import { EllipsisVertical, Trash, Eye, PenBox } from "lucide-react";
import Dropdown, { DropdownItems } from "@/components/dropdown";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

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
  description,
  image,
  category,
  variantes,
  quantite,
  prix,
  date,
  statut,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors">
      {/* CLIENT */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  ">
        <div className="flex items-center gap-2  whitespace-nowrap">
          <img
            alt={produit}
            className="size-9 rounded-md"
            height={32}
            src={image}
            width={32}
          />
          <div>
            {produit}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {code}
            </div>
          </div>
        </div>
      </td>
      {/* NUMERO DE COMMANDE */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
        {category}
      </td>

      {/* STATUT */}
      <td className="px-4 py-2 text-sm">
        <Badge
          className={` ${
            statut === "active"
              ? "bg-green-500"
              : statut === "inactive"
              ? "bg-red-500"
              : "bg-gray-400"
          }`}
        >
          {statut}
        </Badge>
      </td>

      {/*  totalArticles */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  whitespace-nowrap">
        {variantes} articles
      </td>

      {/*  total montant */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  whitespace-nowrap">
        {prix} ar
      </td>

      {/* DATE */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
        {date}
      </td>

      {/* ACTIONS */}
      <td className="px-4 py-2 text-right text-sm whitespace-nowrap">
        <Dropdown
          btnShow={
            <button className="rounded-md border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all px-1 py-1">
              <EllipsisVertical size={16} />
            </button>
          }
        >
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownItems
              icon={<Eye size={18} />}
              title="Voir détails"
              onClick={() => onView && onView(id)}
            />
            <DropdownItems
              icon={<PenBox size={18} />}
              title="Modifier"
              onClick={() => onView && onView(id)}
            />
            <DropdownItems
              icon={<Trash size={18} />}
              title="Supprimer"
              variant="destructive"
              onClick={() => onDelete && onDelete(id)}
            />
          </DropdownMenuGroup>
        </Dropdown>
      </td>
    </tr>
  );
};
