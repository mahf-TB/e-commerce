import NotificationListItem from "./NotificationItem";
import type { NotificationItem as N } from "./types";

interface Props {
  items: N[];
}

export default function NotificationsList({ items }: Props) {
  if (!items || items.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">Aucune notification</div>
    );
  }
  return (
    <ul className="space-y-2">
      {items.map((n) => (
        <NotificationListItem key={n.id} item={n} />
      ))}
    </ul>
  );
}
