import BadgeItem from "@/components/BadgeItem";
import Dropdown, { DropdownItems } from "@/components/dropdown";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/user-avatar";
import { formatDate } from "@/utils/helpers";
import { EllipsisVertical, PenBox, ReceiptText, Trash } from "lucide-react";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

export interface UserRowsProps extends HTMLAttributes<HTMLTableRowElement> {
  userId: string | number;
  username: string;
  nom?: string;
  prenom?: string;
  email: string;
  role: string;
  status: string;
  photo: string;
  date: string;
  adresse?: string;
  telephone?: string;
  onView?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  isClient?: boolean;
}

/**
 * Composant UserRows - Retourne uniquement les <td> (pas la <tr>)
 * À utiliser avec TableRowTooltips qui rend la <tr>
 */
export const UserRows = forwardRef<HTMLTableRowElement, UserRowsProps>(
  (
    {
      userId,
      username,
      nom,
      prenom,
      email,
      role,
      status,
      photo,
      adresse,
      telephone,
      date,
      onView,
      onEdit,
      onDelete,
      isClient,
      ...rest
    },
    ref
  ) => {
    const navigate = useNavigate();
    
    return (
      <tr ref={ref} {...rest} className="hover:bg-slate-200  transition-colors">
        {/* CLIENT */}
        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  ">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <UserAvatar
              src={photo}
              fallback={(prenom || username || "").charAt(0).toUpperCase()}
              size={32}
            />
            <div className="flex flex-col">
              <span>{prenom ? `${prenom} ${nom}` : username}</span>
              <span className="text-xs">{email}</span>
            </div>
          </div>
        </td>

        {isClient && (
          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
            {adresse  || "N/A"}
          </td>
        )}
        {isClient && (
          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
            {telephone || "N/A"}
          </td>
        )}
        {/* Adresse */}
        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
          {role}
        </td>

        <td className="px-4 py-2 text-sm">
          <BadgeItem className={status} statut={status} />
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
              onClick={() => onView && onView(userId)}
            />
            <DropdownItems
              icon={<PenBox size={18} />}
              title="Modifier"
              onClick={() => navigate(`${userId}`)}
            />
            <DropdownItems
              icon={<Trash size={18} />}
              title="Supprimer"
              variant="destructive"
              onClick={() => onDelete && onDelete(userId)}
            />
          </Dropdown>
        </td>
      </tr>
    );
  }
);
