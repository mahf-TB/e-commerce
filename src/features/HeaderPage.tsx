import { BadgeButton } from "@/components/BadgeButton";
import SearchInput from "@/components/search-input";
import Tooltips from "@/components/tooltips";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import {
  Bell,
  Heart,
  LogOut,
  Package,
  ShoppingBag,
  ShoppingCartIcon,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthUser from "@/hooks/use-auth-user";
import { logout } from "@/services/authService";
import Dropdown, { DropdownItems } from "@/components/dropdown";
import { useState } from "react";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthInvalidate } from "@/hooks/use-auth-invalidate";

const HeaderPage = () => {
  const navigate = useNavigate();
  const { removeAuthUser } = useAuthInvalidate();
  const { data, isAuthenticated, isLoading } = useAuthUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/connexion");
      await removeAuthUser();
    } catch (error) {}
  };

  const fallbackAvatar = () => {
    if (!data) return "";
    if (data.username) return data.username.slice(0, 2).toUpperCase();
    const first = (data.prenom || "").trim().charAt(0);
    const last = (data.nom || "").trim().charAt(0);
    const initials = (first + last).toUpperCase();
    return initials || (data.email?.charAt(0).toUpperCase() ?? "");
  };
  if (isLoading) return null; // ou un indicateur de chargement

  return (
    <div className="w-full bg-white z-50 border-b border-gray-300  sticky top-0">
      <div className="container mx-auto p-4 flex items-center justify-between gap-5 ">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xl cursor-pointer"
        >
          <ShoppingBag className="" size={22} />
          <h1 className="font-poppins font-black whitespace-nowrap">Mark-E</h1>
        </div>
        <div className="relative w-xl flex items-center">
          <SearchInput placeholder="Rechercher un produit..." />
          <Button className="absolute right-0 rounded-l-none rounded-r max-md:hidden">
            Rechercher
          </Button>
        </div>
        <div className="flex items-center gap-2 md:gap-5 justify-end">
          <Tooltips text="Panier">
            <BadgeButton
              icon={ShoppingCartIcon}
              count={7}
              onClick={() => console.log("Notifications")}
            />
          </Tooltips>
          <Tooltips text="Notifications">
            <BadgeButton
              icon={Bell}
              count={197}
              onClick={() => console.log("Notifications")}
            />
          </Tooltips>
          {isAuthenticated ? (
            <Tooltips text="Profile">
              <div
                onClick={() => setDropdownOpen(true)}
                className="cursor-default"
              >
                <UserAvatar
                  size={32}
                  src={data?.photo}
                  fallback={fallbackAvatar()}
                />
              </div>
            </Tooltips>
          ) : (
            <Button
              onClick={() => navigate("/connexion")}
              className="rounded-md bg-gray-950"
            >
              Connexion
            </Button>
          )}
          <Dropdown
            className="mt-4 bg-gray-950 text-white"
            open={dropdownOpen}
            setOpen={setDropdownOpen}
          >
            <DropdownMenuLabel className="flex items-start gap-3">
              <UserAvatar
                size={32}
                src={data?.photo}
                fallback={fallbackAvatar()}
                fallbackClassName="bg-gray-50 text-gray-900"
              />
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-medium text-sm text-white">
                  {`${data?.prenom || ""} ${data?.nom || ""}`.trim() ||
                    data?.username}
                </span>
                <span className="truncate font-normal text-muted/70 text-xs">
                  {data?.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-muted-foreground" />
            <DropdownItems
              icon={<UserCircle size={18} />}
              title="Mon compte"
              onClick={() => navigate("/account")}
            />
            <DropdownItems
              icon={<Package size={18} />}
              title="Commandes"
              onClick={() => navigate("/account/orders")}
            />
            <DropdownItems
              icon={<Package size={18} />}
              title="Produits"
              onClick={() => navigate("/products")}
            />
            <DropdownItems
              icon={<Heart size={18} />}
              title="Favoris"
              onClick={() => navigate("/account/wishlist")}
            />
            <DropdownItems
              icon={<Bell size={18} />}
              title="Notifications"
              onClick={() => navigate("/account/notifications")}
            />
            <DropdownMenuSeparator className="bg-muted-foreground" />
            <DropdownItems
              icon={<LogOut size={18} />}
              title="Déconnexion"
              variant="destructive"
              className="my-1 hover:text-white! hover:bg-red-600/90!"
              onClick={handleLogout}
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default HeaderPage;
