import CardSheetModal from "@/components/CardSheetModal";
import { useNotifications } from "@/hooks/use-notifications";
import NotificationsList from "./NotificationsList";

interface NotificationsSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function NotificationsSheet({
  open,
  setOpen,
}: NotificationsSheetProps) {

  const { items: fetchedItems } = useNotifications();


  return (
    <CardSheetModal
      titre="Notifications"
      description="Vos notifications récentes"
      openModal={open}
      setOpenModal={setOpen}
    >
      <div className="mt-4">
        <div className="">
          {fetchedItems && fetchedItems.length > 0 ? (
            <NotificationsList items={fetchedItems} />
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">Aucune notification</div>
          )}
        </div>
      </div>
    </CardSheetModal>
  );
}
