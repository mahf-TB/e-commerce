import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon } from "lucide-react";
import type { NotificationItem as N } from "./types";

interface Props {
  item: N;
}

export default function NotificationListItem({ item }: Props) {
  return (
    <li
      key={item.id}
      className={
        "p-3 rounded-md flex items-start gap-3 " + (!item.estLu ? "bg-gray-50" : "bg-white")
      }
    >
      <div className="w-10 h-10 shrink-0 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.titre} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400">
            <ImageIcon size={18} />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-medium text-gray-900 truncate">{item.titre}</div>
          {!item.estLu && <Badge className="bg-red-500">New</Badge>}
        </div>
        {item.message && (
          <p className="text-xs text-gray-600 mt-1 truncate">{item.message}</p>
        )}
        {item.createdAt && (
          <div className="text-xs text-gray-400 mt-1">{item.createdAt}</div>
        )}
      </div>
    </li>
  );
}
