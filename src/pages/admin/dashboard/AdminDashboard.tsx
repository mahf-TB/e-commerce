import DateRangePickerComponent from "@/components/utils/input-DateRangePicker";
import SegmentedControl from "@/components/utils/segmented-control";
import { QuickActions } from "@/features/dashboard/QuickActions";
import { RecentOrders } from "@/features/dashboard/RecentOrders";
import { RevenueChart } from "@/features/dashboard/RevenueChart";
import { SemiCircleStatut } from "@/features/dashboard/SemiCircleStatut";
import { StatCard } from "@/features/dashboard/StatCard";
import { TopProducts } from "@/features/dashboard/TopProducts";
import { useDashboardStats } from "@/hooks/use-dashboard";
import { formatPrice } from "@/utils/helpers";
import {
  DollarSign,
  FileText,
  Package,
  Plus,
  Settings,
  ShoppingCart,
  Tag,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";

// Fonction pour formater la date relative
const formatRelativeDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return "Il y a quelques minutes";
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays === 1) return "Hier";
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  return date.toLocaleDateString("fr-FR");
};

// Mapper les statuts de l'API vers les statuts du composant
const mapStatutCommande = (
  statut: string
): "pending" | "processing" | "shipped" | "delivered" | "cancelled" => {
  const mapping: Record<
    string,
    "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  > = {
    en_attente: "pending",
    en_preparation: "processing",
    expediee: "shipped",
    livree: "delivered",
    completed: "delivered",
    annulee: "cancelled",
  };
  return mapping[statut] || "pending";
};

const AdminDashboard = () => {
const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [periodType, setPeriodType] = useState("all");

  // Utiliser le hook pour récupérer les stats
  const { stats, isLoading } = useDashboardStats({
    dateDebut: dateRange?.from?.toISOString().split("T")[0],
    dateFin: dateRange?.to?.toISOString().split("T")[0],
  });

  // Options pour le SegmentedControl
  const periodOptions = [
    { value: "all", label: "Tout" },
    { value: "today", label: "Aujourd'hui" },
    { value: "month", label: "Mois en cours" },
    // { value: "30days", label: "30 derniers jours" },
  ];

  // Gérer le changement de période
  const handlePeriodChange = (value: string) => {
    setPeriodType(value);
    const now = new Date();

    switch (value) {
      case "all":
        setDateRange(undefined);
        break;
      case "today":
        const aujourdhui = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        setDateRange({ from: aujourdhui, to: now });
        break;
      case "month":
        const premierJourMois = new Date(now.getFullYear(), now.getMonth(), 1);
        setDateRange({ from: premierJourMois, to: undefined });
        break;
      case "30days":
        const il30Jours = new Date(now);
        il30Jours.setDate(now.getDate() - 30);
        setDateRange({ from: il30Jours, to: now });
        break;
    }
  };

  // Mapper les commandes récentes depuis l'API
  const recentOrders = useMemo(() => {
    if (!stats?.commandesRecentes) return [];
    return stats.commandesRecentes.slice(0, 4).map((cmd: any) => ({
      id: cmd.reference || cmd.id,
      customer: cmd.client?.nom || "Client inconnu",
      amount: cmd.total, // Convertir en milliers
      status: mapStatutCommande(cmd.statut),
      date: formatRelativeDate(cmd.date),
    }));
  }, [stats]);

  // Mapper les top produits depuis l'API
  const topProducts = useMemo(() => {
    if (!stats?.topProduits) return [];
    return stats.topProduits.slice(0, 4).map((prod: any) => ({
      id: prod.produitId,
      name: prod.nom,
      sales: prod.quantiteVendue,
      revenue: prod.revenus.toFixed(0), // Convertir en milliers
    }));
  }, [stats]);
  

  // Stats cards avec données de l'API
  const statsCards = [
    {
      title: "Chiffre d'affaires",
      value: stats?.revenus?.total ? formatPrice(stats.revenus.total) : "0",
      icon: DollarSign,
      trend: { value: 12.5, isPositive: true },
      iconColor: "text-green-600",
      // subtitle: "Revenus des commandes payées",
    },
    {
      title: "Total commandes",
      value: stats?.general?.totalCommandes || 0,
      icon: ShoppingCart,
      trend: { value: 8.2, isPositive: true },
      iconColor: "text-blue-600",
      // subtitle: "Toutes les commandes créées",
    },
    {
      title: "Panier moyen",
      value: stats?.revenus?.panierMoyen
        ? formatPrice(stats.revenus.panierMoyen)
        : "0",
      icon: ShoppingCart,
      trend: { value: 5.4, isPositive: true },
      iconColor: "text-purple-600",
      // subtitle: "Valeur moyenne d'une commande",
    },
    {
      title: "Client total",
      value: stats?.clientStats?.total || 0,
      icon: Package,
      trend: { value: 2.3, isPositive: true },
      iconColor: "text-indigo-600",
    },
  ];

  const quickActions = [
    {
      label: "Nouveau produit",
      icon: <Plus className="size-4" />,
      onClick: () => navigate("/admin/produits/ajouter"),
      bgColor: "bg-gray-900",
      textColor: "text-white",
    },
    {
      label: "Voir commandes",
      icon: <FileText className="size-4" />,
      onClick: () =>navigate("/admin/commande"),
      bgColor: "bg-blue-600",
      textColor: "text-white",
    },
    {
      label: "Gérer catégories",
      icon: <Tag className="size-4" />,
      onClick: () => navigate("/admin/parametre/categories"),
      bgColor: "bg-purple-600",
      textColor: "text-white",
    },
    {
      label: "Paramètres",
      icon: <Settings className="size-4" />,
      onClick: () => navigate("/admin/parametre/account"),
      bgColor: "bg-gray-700",
      textColor: "text-white",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 font-poppins">
            Tableau de bord
          </h1>
          <p className="text-sm text-gray-600">
            Vue d'ensemble de votre boutique
          </p>
        </div>
        {/* Date Filter Card */}
        <div className="rounded bg-white border-gray-200">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Quick Actions */}
            <QuickActions actions={quickActions} />
            <div className="flex-1 min-w-[200px]">
              <DateRangePickerComponent
                placeholder="Choisir une plage de dates"
                value={dateRange}
                onChange={setDateRange}
              />
            </div>
            <SegmentedControl
              value={periodType}
              onValueChange={handlePeriodChange}
              options={periodOptions}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-gray-600">Chargement des statistiques...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => {
              return <StatCard key={index} {...stat} />;
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6 lg:col-span-2">
              {/* Revenue Chart */}
              <RevenueChart data={stats?.evolutionVentes || []} />

              {/* Recent Orders - Takes 2 columns */}
              <RecentOrders orders={recentOrders} />
            </div>
            <div className="space-y-6">
              {/* Orders by Status */}
              {stats?.general && (
                <SemiCircleStatut
                  data={{
                    en_attente:
                      stats.general.commandesParStatut.en_attente.count || 0,
                    en_preparation:
                      stats.general.commandesParStatut.en_preparation.count ||
                      0,
                    expediee:
                      stats.general.commandesParStatut.expediee.count || 0,
                    livree: stats.general.commandesParStatut.livree.count || 0,
                    annulee:
                      stats.general.commandesParStatut.annulee.count || 0,
                    completed:
                      stats.general.commandesParStatut.completed.count || 0,
                  }}
                />
              )}
              {/* Top Products */}
              <TopProducts products={topProducts} />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="space-y-6 lg:col-span-2">
            </div>
            <div className="">
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Wrapper export : vérifie le rôle avant d'afficher le dashboard
import RequireRole from "@/components/utils/RequireRole";

export default function AdminDashboardPageWrapper() {
  return (
    <RequireRole allowedRoles={["admin"]} page="aux Dashboard">
      <AdminDashboard />
    </RequireRole>
  );
}
