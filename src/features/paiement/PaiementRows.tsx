import { Badge } from "@/components/ui/badge";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import Dropdown, { DropdownItems } from "@/components/utils/dropdown";
import UserAvatar from "@/components/utils/user-avatar";
import type { EtatPaiement } from "@/types";
import { formatDate, formatPrice, getLibellePayement, getPaiementColorClass } from "@/utils/helpers";
import {
  Banknote,
  Bitcoin,
  CreditCard,
  EllipsisVertical,
  PenBox,
  ReceiptText,
  Trash,
} from "lucide-react";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

export interface PaiementRowProps {
  id: string | number;
  montant: number;
  mode: string;
  image: string;
  customer?: string;
  date: string;
  paiement: string;
  onView?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

/**
 * Composant PaiementRow - Retourne uniquement les <td> (pas la <tr>)
 * À utiliser avec TableRowTooltips qui rend la <tr>
 */
export const PaiementRow = forwardRef<HTMLTableRowElement, PaiementRowProps>(
  (props, ref) => {
    const {
      id,
      mode,
      image,
      customer,
      montant,
      paiement,
      date,
      onView,
      onEdit,
      onDelete,
    } = props;
    const navigate = useNavigate();
    const Icon = (mode: string) => {
      if (mode === "card") return <CreditCard size={14} />;
      else if (mode === "espece") return <Banknote size={14} />;
      else return <Bitcoin size={14} />;
    };
    return (
      <tr ref={ref} className="hover:bg-slate-200  transition-colors">
        {/* NUMERO DE COMMANDE */}
        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
          #{id}
        </td>

        {/* PAIEMENT */}
        <td className="px-4 py-2 text-sm">
          <Badge className={getPaiementColorClass(paiement as EtatPaiement)}>
            {getLibellePayement(paiement as EtatPaiement)}
          </Badge>
        </td>

        {/*  total montant */}
        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  whitespace-nowrap">
          {formatPrice(montant)}
        </td>

        {/* Adresse */}
        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
          {mode ? (
            <Badge
              variant={"outline"}
              className="gap-1 items-center rounded-md px-2 py-1"
            >
              {Icon(mode)}
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Badge>
          ) : (
            "N/A"
          )}
        </td>

        {/* CLIENT */}
        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  ">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <UserAvatar src={image} fallback="CN" size={32} />
            <div className="flex flex-col">
              <span>{customer}</span>
            </div>
          </div>
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
              onClick={() => onView && onView(id)}
            />
            <DropdownItems
              icon={<PenBox size={18} />}
              title="Modifier"
              onClick={() => navigate(`${id}`)}
            />
            <DropdownItems
              icon={<Trash size={18} />}
              title="Supprimer"
              variant="destructive"
              onClick={() => onDelete && onDelete(id)}
            />
          </Dropdown>
        </td>
      </tr>
    );
  }
);
