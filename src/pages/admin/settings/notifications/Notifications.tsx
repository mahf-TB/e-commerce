import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NotificationToggle from "@/features/notifications/NotificationToggle";
import useAuthUser from "@/hooks/use-auth-user";
import { showToast } from "@/lib/toast";
import { isAdmin } from "@/utils/helpers";
import { Mail } from "lucide-react";
import { useState } from "react";

const NotificationsPages = () => {
  const { user } = useAuthUser();
  const [orderEmail, setOrderEmail] = useState(true);
  const [paymentEmail, setPaymentEmail] = useState(true);
  const [stockAlert, setStockAlert] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleSave = () => {
    // TODO: call API to persist settings
    showToast("success", "Paramètres de notification enregistrés");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Mail className="size-6" />
          Emails & Notifications
        </h1>
        <p className="text-muted-foreground mt-1">
          Gérez les types de notifications que vous souhaitez recevoir par email
          ou via l'application.
        </p>
      </div>
      <div className="flex items-start justify-center gap-2">
        <Card className="shadow-none border-none rounded w-3/4">
          <CardHeader>
            <CardTitle>Préférences de notifications</CardTitle>
            <CardDescription>
              Choisissez les notifications à activer pour ce compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 ">
            <div className="divide-y">
              <NotificationToggle
                id="notif-order"
                label="Nouvelle commande"
                description="Recevoir un email lorsqu'une nouvelle commande est passée"
                checked={orderEmail}
                onCheckedChange={setOrderEmail}
                recommended
              />
              <NotificationToggle
                id="notif-payment"
                label="Mise à jour du paiement"
                description="Recevoir un email lors du changement de statut du paiement"
                checked={paymentEmail}
                onCheckedChange={setPaymentEmail}
              />
              <NotificationToggle
                id="notif-stock"
                label="Alertes de stock"
                description="Recevoir une alerte lorsque le stock est faible"
                checked={stockAlert}
                onCheckedChange={setStockAlert}
              />
              {
                /* Additional notification toggles can be added here */
                isAdmin(user?.role) && (
                  <NotificationToggle
                    id="notif-weekly"
                    label="Résumé hebdomadaire"
                    description="Recevoir un résumé hebdomadaire des activités"
                    checked={weeklySummary}
                    onCheckedChange={setWeeklySummary}
                  />
                )
              }

              <NotificationToggle
                id="notif-marketing"
                label="Emails marketing"
                description="Recevoir des promotions et offres spéciales"
                checked={marketingEmails}
                onCheckedChange={setMarketingEmails}
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSave}>Enregistrer</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsPages;
