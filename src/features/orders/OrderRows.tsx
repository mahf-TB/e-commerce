import React from "react";
import { EllipsisVertical, Trash, Eye } from "lucide-react";
import Dropdown, { DropdownItems } from "@/components/dropdown";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/user-avatar";

export interface OrderRowProps {
  id: string | number;
  orderNumber: string;
  customer: string;
  email: string;
  status: string;
  totalArticles: number;
  total: number;
  date: string;
  onView?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

export const OrderRow: React.FC<OrderRowProps> = ({
  id,
  orderNumber,
  customer,
  email,
  status,
  totalArticles,
  total,
  date,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors">
      {/* NUMERO DE COMMANDE */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
        {orderNumber}
      </td>

      {/* CLIENT */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  ">
        <div className="flex gap-1  whitespace-nowrap">
            <UserAvatar src="https://github.com/shadcn.png" fallback="CN" size={20} />
            {customer}
        </div>
      </td>

      {/* EMAIL */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
        {email}
      </td>

      {/* STATUT */}
      <td className="px-4 py-2 text-sm">
        <Badge
          className={` ${
            status === "En attente"
              ? "bg-yellow-500"
              : status === "processing"
              ? "bg-blue-500"
              : status === "shipped"
              ? "bg-indigo-500"
              : status === "delivered"
              ? "bg-green-500"
              : status === "cancelled"
              ? "bg-red-500"
              : "bg-gray-400"
          }`}
        >
          {status}
        </Badge>
      </td>

      {/*  totalArticles */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  whitespace-nowrap">
        {totalArticles} articles
      </td>

       {/*  total montant */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300  whitespace-nowrap">
        {total} ar
      </td>


      {/* DATE */}
      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
        {date}
      </td>

      {/* ACTIONS */}
      <td  className="px-4 py-2 text-right text-sm whitespace-nowrap">
        <Dropdown
          btnShow={
            <button className="rounded-md border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all px-1 py-1">
              <EllipsisVertical size={16} />
            </button>
          }
        >
          <DropdownItems
            icon={<Eye size={18} />}
            title="Voir détails"
            onClick={() => onView && onView(id)}
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
};
