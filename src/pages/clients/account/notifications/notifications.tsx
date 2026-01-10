import { Button } from "@/components/ui/button";
import NotificationSection from "@/features/notifications/NotificationSection";
import NotificationToggle from "@/features/notifications/NotificationToggle";
import { showToast } from "@/lib/toast";
import {
    Bell,
    Mail,
    MessageSquare,
    Package,
    TrendingUp
} from "lucide-react";
import { useState } from "react";

const Notifications = () => {
  // État pour les notifications de commandes
  const [orderNotifications, setOrderNotifications] = useState({
    confirmation: true,
    shipped: true,
    delivered: true,
    returns: true,
  });

  // État pour les notifications marketing
  const [marketingNotifications, setMarketingNotifications] = useState({
    specialOffers: false,
    personalizedPromos: false,
    newProducts: false,
    flashSales: true,
  });

  // État pour les communications
  const [communicationNotifications, setCommunicationNotifications] = useState({
    newsletter: true,
    blog: false,
    surveys: false,
  });

  // État pour les rappels
  const [reminderNotifications, setReminderNotifications] = useState({
    abandonedCart: true,
    wishlist: true,
    priceAlerts: true,
    backInStock: true,
  });

  const handleSavePreferences = async () => {
    try {
      // TODO: Appeler l'API pour sauvegarder les préférences
      const preferences = {
        orders: orderNotifications,
        marketing: marketingNotifications,
        communications: communicationNotifications,
        reminders: reminderNotifications,
      };

      // await saveNotificationPreferences(preferences);

      showToast("success", "Préférences de notifications enregistrées");
    } catch (error: any) {
      showToast(
        "error",
        error?.response?.data?.message || "Erreur lors de l'enregistrement"
      );
    }
  };

  return (
    <div className="">
      <div className="space-y-6 flex flex-col items-center">
        {/* Commandes et livraisons */}
        <NotificationSection
          icon={<Package size={20} className="text-gray-600" />}
          title="Commandes et livraisons"
          description="Recevez des notifications importantes sur l'état de vos commandes."
        >
          <NotificationToggle
            id="order-confirmation"
            label="Confirmation de commande"
            description="Notification envoyée après chaque achat confirmé"
            checked={orderNotifications.confirmation}
            onCheckedChange={(checked) =>
              setOrderNotifications({ ...orderNotifications, confirmation: checked })
            }
            recommended
          />
          <NotificationToggle
            id="order-shipped"
            label="Commande expédiée"
            description="Soyez informé dès que votre commande est en cours de livraison"
            checked={orderNotifications.shipped}
            onCheckedChange={(checked) =>
              setOrderNotifications({ ...orderNotifications, shipped: checked })
            }
            recommended
          />
          <NotificationToggle
            id="order-delivered"
            label="Commande livrée"
            description="Confirmation de la livraison de votre commande"
            checked={orderNotifications.delivered}
            onCheckedChange={(checked) =>
              setOrderNotifications({ ...orderNotifications, delivered: checked })
            }
            recommended
          />
          <NotificationToggle
            id="order-returns"
            label="Retours et remboursements"
            description="Mises à jour sur vos demandes de retour et remboursements"
            checked={orderNotifications.returns}
            onCheckedChange={(checked) =>
              setOrderNotifications({ ...orderNotifications, returns: checked })
            }
          />
        </NotificationSection>

        {/* Marketing et promotions */}
        <NotificationSection
          icon={<TrendingUp size={20} className="text-gray-600" />}
          title="Marketing et promotions"
          description="Restez informé des offres spéciales et nouveautés."
        >
          <NotificationToggle
            id="marketing-offers"
            label="Offres spéciales"
            description="Recevez nos meilleures promotions et réductions"
            checked={marketingNotifications.specialOffers}
            onCheckedChange={(checked) =>
              setMarketingNotifications({
                ...marketingNotifications,
                specialOffers: checked,
              })
            }
          />
          <NotificationToggle
            id="marketing-personalized"
            label="Promotions personnalisées"
            description="Offres adaptées à vos préférences d'achat"
            checked={marketingNotifications.personalizedPromos}
            onCheckedChange={(checked) =>
              setMarketingNotifications({
                ...marketingNotifications,
                personalizedPromos: checked,
              })
            }
          />
          <NotificationToggle
            id="marketing-new-products"
            label="Nouveaux produits"
            description="Soyez le premier informé des nouveautés"
            checked={marketingNotifications.newProducts}
            onCheckedChange={(checked) =>
              setMarketingNotifications({
                ...marketingNotifications,
                newProducts: checked,
              })
            }
          />
          <NotificationToggle
            id="marketing-flash-sales"
            label="Ventes flash"
            description="Alertes sur les ventes à durée limitée"
            checked={marketingNotifications.flashSales}
            onCheckedChange={(checked) =>
              setMarketingNotifications({
                ...marketingNotifications,
                flashSales: checked,
              })
            }
            recommended
          />
        </NotificationSection>

        {/* Communications */}
        <NotificationSection
          icon={<MessageSquare size={20} className="text-gray-600" />}
          title="Communications"
          description="Gérez les communications générales et newsletters."
        >
          <NotificationToggle
            id="comm-newsletter"
            label="Newsletter"
            description="Recevez notre newsletter hebdomadaire avec conseils et actualités"
            checked={communicationNotifications.newsletter}
            onCheckedChange={(checked) =>
              setCommunicationNotifications({
                ...communicationNotifications,
                newsletter: checked,
              })
            }
          />
          <NotificationToggle
            id="comm-blog"
            label="Actualités et blog"
            description="Nouveaux articles de blog et guides d'achat"
            checked={communicationNotifications.blog}
            onCheckedChange={(checked) =>
              setCommunicationNotifications({
                ...communicationNotifications,
                blog: checked,
              })
            }
          />
          <NotificationToggle
            id="comm-surveys"
            label="Enquêtes de satisfaction"
            description="Participez à l'amélioration de nos services"
            checked={communicationNotifications.surveys}
            onCheckedChange={(checked) =>
              setCommunicationNotifications({
                ...communicationNotifications,
                surveys: checked,
              })
            }
          />
        </NotificationSection>

        {/* Rappels et alertes */}
        <NotificationSection
          icon={<Bell size={20} className="text-gray-600" />}
          title="Rappels et alertes"
          description="Recevez des rappels personnalisés pour ne rien manquer."
        >
          <NotificationToggle
            id="reminder-cart"
            label="Panier abandonné"
            description="Rappel si vous avez laissé des articles dans votre panier"
            checked={reminderNotifications.abandonedCart}
            onCheckedChange={(checked) =>
              setReminderNotifications({
                ...reminderNotifications,
                abandonedCart: checked,
              })
            }
          />
          <NotificationToggle
            id="reminder-wishlist"
            label="Liste de souhaits"
            description="Notifications sur les produits de votre liste de souhaits"
            checked={reminderNotifications.wishlist}
            onCheckedChange={(checked) =>
              setReminderNotifications({
                ...reminderNotifications,
                wishlist: checked,
              })
            }
          />
          <NotificationToggle
            id="reminder-price"
            label="Alertes de prix"
            description="Soyez informé des baisses de prix sur vos produits favoris"
            checked={reminderNotifications.priceAlerts}
            onCheckedChange={(checked) =>
              setReminderNotifications({
                ...reminderNotifications,
                priceAlerts: checked,
              })
            }
            recommended
          />
          <NotificationToggle
            id="reminder-stock"
            label="Réapprovisionnement de stock"
            description="Alerte quand un produit en rupture est à nouveau disponible"
            checked={reminderNotifications.backInStock}
            onCheckedChange={(checked) =>
              setReminderNotifications({
                ...reminderNotifications,
                backInStock: checked,
              })
            }
            recommended
          />
        </NotificationSection>

        {/* Bouton de sauvegarde */}
        <div className="w-3/4 flex justify-end pt-4">
          <Button onClick={handleSavePreferences} className="rounded px-10">
            <Mail size={16} className="mr-2" />
            Enregistrer les préférences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;


      {/* 
      
      CREATE TABLE notification_preferences (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  
  -- Commandes et livraisons
  order_confirmation BOOLEAN DEFAULT TRUE,
  order_shipped BOOLEAN DEFAULT TRUE,
  order_delivered BOOLEAN DEFAULT TRUE,
  order_returns BOOLEAN DEFAULT TRUE,
  
  -- Marketing et promotions
  marketing_special_offers BOOLEAN DEFAULT FALSE,
  marketing_personalized_promos BOOLEAN DEFAULT FALSE,
  marketing_new_products BOOLEAN DEFAULT FALSE,
  marketing_flash_sales BOOLEAN DEFAULT TRUE,
  
  -- Communications
  comm_newsletter BOOLEAN DEFAULT TRUE,
  comm_blog BOOLEAN DEFAULT FALSE,
  comm_surveys BOOLEAN DEFAULT FALSE,
  
  -- Rappels et alertes
  reminder_abandoned_cart BOOLEAN DEFAULT TRUE,
  reminder_wishlist BOOLEAN DEFAULT TRUE,
  reminder_price_alerts BOOLEAN DEFAULT TRUE,
  reminder_back_in_stock BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
      */}