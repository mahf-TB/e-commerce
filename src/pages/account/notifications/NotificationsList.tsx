import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showToast } from "@/lib/toast";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
    Bell,
    CheckCheck,
    Filter,
    MoreVertical,
    Package,
    ShoppingBag,
    Tag,
    Trash2,
} from "lucide-react";
import { useState } from "react";

// Types pour les notifications
interface Notification {
  id: string;
  type: "order" | "marketing" | "alert" | "info";
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  link?: string;
}

// Icône selon le type
const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "order":
      return <Package size={20} className="text-blue-600" />;
    case "marketing":
      return <Tag size={20} className="text-green-600" />;
    case "alert":
      return <Bell size={20} className="text-orange-600" />;
    default:
      return <ShoppingBag size={20} className="text-gray-600" />;
  }
};

// Badge selon le type
const getTypeBadge = (type: Notification["type"]) => {
  switch (type) {
    case "order":
      return (
        <Badge variant="outline" className="text-blue-600 border-blue-600">
          Commande
        </Badge>
      );
    case "marketing":
      return (
        <Badge variant="outline" className="text-green-600 border-green-600">
          Promotion
        </Badge>
      );
    case "alert":
      return (
        <Badge variant="outline" className="text-orange-600 border-orange-600">
          Alerte
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-gray-600 border-gray-600">
          Info
        </Badge>
      );
  }
};

const NotificationsList = () => {
  // Mock data - À remplacer par l'API
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "order",
      title: "Commande expédiée",
      message: "Votre commande #12345 a été expédiée et arrivera dans 2-3 jours.",
      read: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // Il y a 2h
    },
    {
      id: "2",
      type: "marketing",
      title: "Vente flash - 30% de réduction",
      message: "Profitez de 30% de réduction sur tous les produits électroniques jusqu'à minuit !",
      read: false,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // Il y a 5h
    },
    {
      id: "3",
      type: "order",
      title: "Commande livrée",
      message: "Votre commande #12344 a été livrée avec succès.",
      read: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Il y a 1 jour
    },
    {
      id: "4",
      type: "alert",
      title: "Produit de retour en stock",
      message: "Le produit 'iPhone 15 Pro' que vous suivez est maintenant disponible !",
      read: true,
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // Il y a 2 jours
    },
    {
      id: "5",
      type: "info",
      title: "Mise à jour de votre profil",
      message: "Vos informations personnelles ont été mises à jour avec succès.",
      read: true,
      createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // Il y a 3 jours
    },
  ]);

  const [filter, setFilter] = useState<"all" | "unread">("all");

  // Filtrer les notifications
  const filteredNotifications = notifications.filter((notif) =>
    filter === "all" ? true : !notif.read
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Marquer comme lu
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    showToast("success", "Notification marquée comme lue");
  };

  // Marquer toutes comme lues
  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
    showToast("success", "Toutes les notifications marquées comme lues");
  };

  // Supprimer une notification
  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    showToast("success", "Notification supprimée");
  };

  // Supprimer toutes les notifications lues
  const handleDeleteAllRead = () => {
    setNotifications((prev) => prev.filter((notif) => !notif.read));
    showToast("success", "Notifications lues supprimées");
  };

  return (
    <div className="">
      <div className="space-y-6 flex flex-col items-center">
        <Card className="shadow-none rounded w-3/4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Bell size={20} className="text-gray-600" />
                  <CardTitle>Notifications</CardTitle>
                  {unreadCount > 0 && (
                    <Badge className="bg-red-600 text-white">
                      {unreadCount}
                    </Badge>
                  )}
                </div>
                <CardDescription>
                  Consultez toutes vos notifications et alertes.
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                {/* Filtre */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded">
                      <Filter size={14} className="mr-2" />
                      {filter === "all" ? "Toutes" : "Non lues"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setFilter("all")}>
                      Toutes les notifications
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("unread")}>
                      Non lues uniquement
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded">
                      <MoreVertical size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleMarkAllAsRead}>
                      <CheckCheck size={14} className="mr-2" />
                      Tout marquer comme lu
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleDeleteAllRead}
                      className="text-red-600"
                    >
                      <Trash2 size={14} className="mr-2" />
                      Supprimer les lues
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">
                  Aucune notification à afficher
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {filter === "unread"
                    ? "Toutes vos notifications sont lues"
                    : "Vous n'avez reçu aucune notification"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                      notification.read
                        ? "bg-white"
                        : "bg-blue-50/50 border-blue-200"
                    }`}
                  >
                    {/* Icône */}
                    <div className="p-2 bg-white rounded-lg border">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3
                          className={`font-medium text-sm ${
                            notification.read
                              ? "text-gray-900"
                              : "text-gray-900 font-semibold"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        {getTypeBadge(notification.type)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {formatDistanceToNow(notification.createdAt, {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </span>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              Marquer comme lu
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(notification.id)}
                          >
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Indicateur non lu */}
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsList;
