import { Badge } from "@/components/ui/badge";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import BadgeItem from "@/components/utils/BadgeItem";
import Dropdown, { DropdownItems } from "@/components/utils/dropdown";
import UserAvatar from "@/components/utils/user-avatar";
import { useDownloadFacture } from "@/hooks/use-commande";
import type { EtatPaiement, StatutCommande } from "@/types";
import {
  formatDate,
  formatPrice,
  getLibellePayement,
  getLibelleStatut,
  getPaiementColorClass,
  getStatusColorClass,
} from "@/utils/helpers";
import { Download, EllipsisVertical, ReceiptText, X } from "lucide-react";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

export interface OrderRowProps extends HTMLAttributes<HTMLTableRowElement> {
  orderId: string ;
  orderNumber: string;
  customer: string;
  email: string;
  status: string;
  image?: string;
  totalArticles: number;
  total: number;
  date: string;
  paiement: string;
  adresse: string;
  onView?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

/**
 * Composant OrderRow - Retourne uniquement les <td> (pas la <tr>)
 * À utiliser avec TableRowTooltips qui rend la <tr>
 */
export const OrderRow = forwardRef<HTMLTableRowElement, OrderRowProps>(
  (
    {
      orderId,
      orderNumber,
      customer,
      email,
      image,
      status,
      totalArticles,
      paiement,
      adresse,
      total,
      date,
      onView,
      onEdit,
      onDelete,
      ...rest
    },
    ref
  ) => {
    const navigate = useNavigate();
    const downloadFactureMutation = useDownloadFacture();
    const handleDownload = (commandeId: string, reference: string) => {
      downloadFactureMutation.mutate({ commandeId, reference });
    };
    return (
      <tr ref={ref} {...rest} className="hover:bg-slate-200  transition-colors">
        {/* NUMERO DE COMMANDE */}
        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
          #{orderNumber}
          <span className="block text-xs text-gray-500">
            {totalArticles} articles
          </span>
        </td>

        {/* CLIENT */}
        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  ">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <UserAvatar src={image} fallback="CN" size={32} />
            <div className="flex flex-col">
              <span>{customer}</span>
              <span className="text-xs">{email}</span>
            </div>
          </div>
        </td>

        {/* Adresse */}
        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
          {adresse}
        </td>

        {/* STATUT */}
        <td className="px-4 py-2 text-sm">
          <BadgeItem
            className={getStatusColorClass(status as StatutCommande, "500")}
            statut={getLibelleStatut(status as StatutCommande)}
          />
        </td>

        {/*  total montant */}
        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  whitespace-nowrap">
          {formatPrice(total)}
        </td>

        {/* PAIEMENT */}
        <td className="px-4 py-2 text-sm">
          <Badge
            className={getPaiementColorClass(paiement as EtatPaiement, "400")}
          >
            {getLibellePayement(paiement as EtatPaiement)}
          </Badge>
        </td>

        {/* DATE */}
        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
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
              onClick={() => onView && onView(orderId)}
            />
            <DropdownItems
              icon={<Download size={18} />}
              title="Télécharger la facture"
              onClick={() => handleDownload(orderId, orderNumber)}
            />
            {!["annulee", "livree", "completed", "expediee"].includes(
              status
            ) && (
              <DropdownItems
                icon={<X size={18} />}
                variant="destructive"
                title="Annuler la commande"
                onClick={() => onDelete && onDelete(orderId)}
              />
            )}
          </Dropdown>
        </td>
      </tr>
    );
  }
);
