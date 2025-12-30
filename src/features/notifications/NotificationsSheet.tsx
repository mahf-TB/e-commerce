import CardSheetModal from "@/components/CardSheetModal";
import NotificationsList from "./NotificationsList";
import type { NotificationItem } from "./types";

interface NotificationsSheetProps {
  items?: NotificationItem[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function NotificationsSheet({
  items,
  open,
  setOpen,
}: NotificationsSheetProps) {
  const mockItems: NotificationItem[] = [
    {
      id: "n1",
      type: "commande_creee",
      titre: "Nouvelle commande reçue",
      message: "Commande #CMD-20251201-0001 a été passée.",
      createdAt: "2025-12-01T10:12:00Z",
      estLu: false,
    },
    {
      id: "n2",
      type: "paiement_statut_change",
      titre: "Paiement accepté",
      message:
        "Le paiement pour la commande #CMD-20251201-0001 a été confirmé.",
      createdAt: "2025-11-30T14:00:00Z",
      estLu: true,
    },
    {
      id: "n3",
      type: "nouvelle_promo",
      titre: "Stock faible",
      message: "Le produit 'Chaise design' est en dessous du seuil d'alerte.",
      createdAt: "2025-11-29T09:00:00Z",
      estLu: false,
    },
  ];

  const itemsToRender = items && items.length >= 0 ? items : mockItems;

  return (
    <CardSheetModal titre="Notifications" description="Vos notifications récentes" openModal={open} setOpenModal={setOpen}>
      <div className="mt-4">
        <div className="">
          <NotificationsList items={itemsToRender} />
        </div>
      </div>
    </CardSheetModal>
  );
}
