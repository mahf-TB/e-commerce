import NotificationsList from "@/features/notifications/NotificationsList";
import { useNotifications } from "@/hooks/use-notifications";

const NotificationsListPage = () => {
  const { items: fetchedItems } = useNotifications();
  return (
    <div className="p-6">
      <div className="">
        {fetchedItems && fetchedItems.length > 0 ? (
          <NotificationsList items={fetchedItems} />
        ) : (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Aucune notification
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsListPage;
