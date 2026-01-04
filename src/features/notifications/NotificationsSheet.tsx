import CardSheetModal from "@/components/utils/CardSheetModal";
import { useMarkAllAsRead, useNotifications } from "@/hooks/use-notifications";
import { useMemo, useState } from "react";
import NotificationsList from "./NotificationsList";
import { Button } from "@/components/ui/button";

interface NotificationsSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function NotificationsSheet({
  open,
  setOpen,
}: NotificationsSheetProps) {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const { items , total } = useNotifications({
    unreadOnly: filter === "unread" ? true : undefined,
    page: 1,
    limit: 100,
  });
  const markAll = useMarkAllAsRead();


  return (
    <CardSheetModal
      titre="Notifications"
      description="Vos notifications récentes"
      openModal={open}
      setOpenModal={setOpen}
    >
      <div className="mt-0">
        <div className="flex items-center justify-between gap-2 border-b">
          <div className="flex gap-2">
            <Button
              variant={"ghost"}
              className={`px-3 py-0 rounded-none ${
                filter === "all" ? "border-gray-900 border-b-2" : "bg-white"
              }`}
              onClick={() => setFilter("all")}
            >
              Tous
            </Button>
            <Button
              variant={"ghost"}
              className={`px-3 py-0 rounded-none ${
                filter === "unread" ? "border-gray-900 border-b-2" : "bg-white"
              }`}
              onClick={() => setFilter("unread")}
            >
              Non lus ({total})
            </Button>
          </div>

          <div>
            <Button
              disabled={total === 0 || markAll.isPending}
              variant={"ghost"}
              onClick={() => markAll.mutate()}
              className="px-3 py-1 "
            >
              Marquer tout comme lu
            </Button>
          </div>
        </div>

        <div className="mt-3">
          {items && items.length > 0 ? (
            <NotificationsList items={items} />
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Aucune notification
            </div>
          )}
        </div>
      </div>
    </CardSheetModal>
  );
}
