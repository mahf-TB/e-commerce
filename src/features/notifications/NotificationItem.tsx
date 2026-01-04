import { Badge } from "@/components/ui/badge";
import type { NotificationType } from "@/types/notification";
import { formatNotificationDateTime } from "@/utils/helpers";
import { BaggageClaim, Banknote, Image as ImageIcon, MessageSquareDiff, PackageOpen, ShoppingBag } from "lucide-react";
import type { NotificationItem as N } from "./types";
import { cn } from "@/lib/utils";

interface Props {
  item: N;
}

export default function NotificationListItem({ item }: Props) {
  return (
    <li
      key={item.id}
      className={
        "p-3 rounded flex items-start gap-3 " +
        (!item.estLu ? "bg-gray-50" : "bg-transparent")
      }
    >
      <div className="w-10 h-10 shrink-0 rounded overflow-hidden bg-gray-50 flex items-center justify-center">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.titre}
            className="w-full h-full object-cover"
          />
        ) : (    
          <ImageIconNotification statut={item.type} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className={cn("text-sm font-medium text-gray-900 truncate" , item.estLu ? "" : "font-semibold font-poppins")}>
            {item.titre}
          </div>
          {!item.estLu && <Badge className="bg-gray-900">Nouveau</Badge>}
        </div>
        {item.message && (
          <p className="text-xs text-gray-600 mt-1 truncate">{item.message}</p>
        )}
        {item.createdAt && (
          <div className="text-xs text-gray-400 mt-1">
            {formatNotificationDateTime(item.createdAt)}
          </div>
        )}
      </div>
    </li>
  );
}

const ImageIconNotification = ({ statut }: { statut?: NotificationType }) => {
  switch (statut) {
    case "avis_recu":
      return <MessageSquareDiff size={16} className="text-blue-500" />;
    case "commande_creee":
      return <ShoppingBag size={16} className="text-green-500" />;
    case "commande_statut_change":
      return <BaggageClaim size={16} className="text-yellow-500" />;
    case "nouvelle_promo":
      return <PackageOpen size={16} className="text-red-500" />;
    case "paiement_statut_change":
      return <Banknote size={16} className="text-violet-500" />;
    default:
      return <ImageIcon size={16} className="text-gray-500" />;
  }
};
