import StatisticGrid, { type Stat } from "@/components/statistic-grid";
import { Button } from "@/components/ui/button";
import CommandeRecentes from "@/features/orders/myOrder/CommandeRecents";
import useAuthUser from "@/hooks/use-auth-user";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
const defaultStats: Stat[] = [
  {
    title: "Commandes",
    value: 0,
    subtitle: "Commandes passées",
    icon: <Package size={18} />,
    color: "text-green-600",
  },
  {
    title: "Dépense",
    value: 0,
    subtitle: "Commandes passées",
    icon: <Package size={18} />,
    color: "text-red-600",
  },
];
const AccountPage = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuthUser();
  return (
    <div className="space-y-4">
      {/* <StatisticGrid  className='p-0 lg:p-0' /> */}
      <div className="flex gap-10">
        <div className=" w-3/4">
          <CommandeRecentes />
        </div>
        <div className="w-2/4  rounded-sm shadow-none gap-3 space-y-2">
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
              <span className="font-poppins">{user?.prenom + " " + user?.nom || "John Doe"}</span>
              <span className="font-poppins text-muted-foreground">Email</span>
              <span className="font-poppins">{user?.email || "john.doe@example.com"}</span>
              <span className="font-poppins text-muted-foreground">
                Téléphone
              </span>
              <span className="font-poppins">{user?.telephone || "+1 234 567 890"}</span>
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
    </div>
  );
};

export default AccountPage;
