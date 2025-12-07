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
  ShieldUser,
  ShoppingBag,
  ShoppingCart,
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
import { fallbackAvatar, getFullName, maskEmail } from "@/utils/helpers";
import CartPopover from "@/features/cart/PanierPopover";
import { useCartStore } from "@/store/use-panier.store";

const HeaderPage = () => {
  const navigate = useNavigate();
  const { removeAuthUser } = useAuthInvalidate();
  const { data, isAuthenticated, isLoading } = useAuthUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
   const {
      cartItems
    } = useCartStore();
console.log(cartItems);

  const handleLogout = async () => {
    try {
      logout();
      navigate("/connexion");
      removeAuthUser();
    } catch (error) {}
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
          {/* Badge Button Panier */}

          <CartPopover
            tooltipLabel="Panier"
            btnShow={
              <BadgeButton
                icon={ShoppingCartIcon}
                count={cartItems.length}
              />
            }
          />
          {/* Button Notification */}
          <Tooltips text="Notifications">
            <BadgeButton
              icon={Bell}
              count={197}
              onClick={() => console.log("Notifications")}
            />
          </Tooltips>
          {/* User Logo and btn connexion */}
          {isAuthenticated ? (
            <Tooltips text="Profile">
              <div
                onClick={() => setDropdownOpen(true)}
                className="cursor-default"
              >
                <UserAvatar
                  size={32}
                  src={data?.photo}
                  fallback={fallbackAvatar(data)}
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
                fallback={fallbackAvatar(data)}
                fallbackClassName="bg-gray-50 text-gray-900"
              />
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-medium text-sm text-white">
                  {getFullName(data)}
                </span>
                <span className="truncate font-normal text-muted/70 text-xs">
                  {maskEmail(data?.email)}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-muted-foreground" />
            <DropdownItems
              icon={<UserCircle size={18} />}
              title="Mon compte"
              onClick={() => navigate("/account")}
            />
            {data?.role === "admin" && (
              <DropdownItems
                icon={<ShieldUser size={18} />}
                title="Espace Administrateur"
                onClick={() => navigate("/admin/dashboard")}
              />
            )}

            <DropdownItems
              icon={<Package size={18} />}
              title="Commandes"
              onClick={() => navigate("/account/orders")}
            />
            <DropdownItems
              icon={<ShoppingCart size={18} />}
              title="Panier"
              onClick={() => navigate("/cart")}
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
