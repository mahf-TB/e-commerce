import { Button } from "@/components/ui/button";
import NotificationsList from "@/features/notifications/NotificationsList";
import { useMarkAllAsRead, useNotifications } from "@/hooks/use-notifications";
import { useState } from "react";

const NotificationsListPage = () => {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const { items: fetchedItems, total } = useNotifications({
    unreadOnly: filter === "unread" ? true : undefined,
    page: 1,
    limit: 100,
  });
  const markAll = useMarkAllAsRead();
  return (
    <div className="px-6 flex justify-center">
      <div className="md:w-4/5">
        <div className="flex items-center justify-between gap-2 border-b">
          <div className="flex gap-2">
            <Button
              variant={"ghost"}
              className={`px-3 py-0 rounded-none ${
                filter === "all" ? "border-gray-900 border-b-2" : "bg-transparent"
              }`}
              onClick={() => setFilter("all")}
            >
              Tous
            </Button>
            <Button
              variant={"ghost"}
              className={`px-3 py-0 rounded-none ${
                filter === "unread" ? "border-gray-900 border-b-2" : "bg-transparent"
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
          {fetchedItems && fetchedItems.length > 0 ? (
            <NotificationsList items={fetchedItems} />
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Aucune notification
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsListPage;
