import StatisticGrid, { type Stat } from "@/components/statistic-grid";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import CommandeRecentes from "@/features/orders/myOrder/CommandeRecents";
import useAuthUser from "@/hooks/use-auth-user";
import { useDashboardStatsForClient } from "@/hooks/use-dashboard";
import {
  fallbackAvatar,
  formatCompactNumber,
  getFullName,
} from "@/utils/helpers";
import { DollarSign, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, isLoading: isLoadUser } = useAuthUser();
  const { data, isLoading } = useDashboardStatsForClient(user?.id);
  const loading = isLoadUser || isLoading;

  const defaultStats: Stat[] = [
    {
      title: "Commandes",
      value: data?.nombreCommandes || 0,
      subtitle: "Commandes passées",
      icon: Package,
      color: "text-green-600",
    },
    {
      title: "Dépense",
      value: formatCompactNumber(data?.totalDepense || 0) + " ar",
      subtitle: "Commandes passées",
      icon: DollarSign,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-4">
      {/* <StatisticGrid  className='p-0 lg:p-0' /> */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-gray-600">Chargement des statistiques...</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-10">
          <div className=" w-3/4">
            <div className="flex items-center gap-4  rounded p-4 mb-4 ">
              <UserAvatar
                size={72}
                src={user?.photo}
                fallback={fallbackAvatar(user)}
              />
              <div>
                <h2 className="text-xl font-semibold font-poppins">
                  Bonjour, {getFullName(user) || user?.prenom || "Client"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Bienvenue dans votre espace. Retrouvez ici vos commandes
                  récentes et vos informations de compte.
                </p>
              </div>
            </div>
            <CommandeRecentes order={data?.derniereCommande} />
          </div>
          <div className="w-2/4  rounded-sm shadow-none gap-3 space-y-2 mt-10">
            <h2 className="font-poppins text-xl font-semibold">Statistiques</h2>
            <StatisticGrid
              stats={defaultStats}
              isFullPage
              className="p-0 lg:p-0 grid-cols-2"
            />
            <h2 className="font-poppins text-xl font-semibold">
              Informations personnelles
            </h2>
            <div className="bg-white rounded p-4 border">
              <p className="text-sm text-muted-foreground">
                Gérez vos informations personnelles, vos adresses et vos
                paramètres de compte.
              </p>
              {/* Détails du compte utilisateur */}
              <div className="mt-4 space-y-2 grid grid-cols-[auto_auto] gap-2 text-sm">
                <span className="font-poppins text-muted-foreground">Nom </span>
                <span className="font-poppins">
                  {user?.prenom + " " + user?.nom || "John Doe"}
                </span>
                <span className="font-poppins text-muted-foreground">
                  Email
                </span>
                <span className="font-poppins">
                  {user?.email || "john.doe@example.com"}
                </span>
                <span className="font-poppins text-muted-foreground">
                  Téléphone
                </span>
                <span className="font-poppins">
                  {user?.telephone || "+1 234 567 890"}
                </span>
                <span className="font-poppins text-muted-foreground">
                  Adresse
                </span>
                <span className="font-poppins">
                  {user?.adresse || "123 Main St, Cityville, Country"}
                </span>
              </div>
              <Button
                variant={"outline"}
                onClick={() => navigate("/account/infos-user")}
                className="rounded mt-5"
              >
                Modifier mes infos
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
