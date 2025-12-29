// components/app-sidebar.tsx
import { Logo } from "@/components/icon/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { useAuthInvalidate } from "@/hooks/use-auth-invalidate";
import useAuthUser from "@/hooks/use-auth-user";
import { logout } from "@/services/authService";
import {
  fallbackAvatar,
  getFullName,
  isAdmin,
  isManagerAccess,
  maskEmail,
} from "@/utils/helpers";
import {
  ArrowLeftFromLine,
  BellRing,
  CreditCard,
  Ellipsis,
  Home,
  Inbox,
  ListOrdered,
  LogOut,
  Package,
  Search,
  Settings,
  UserCog,
  Users2,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Dropdown, { DropdownItems } from "../components/dropdown";
import { Badge } from "../components/ui/badge";
import { DropdownMenuSeparator } from "../components/ui/dropdown-menu";
import SearchInput from "@/components/search-input";
import InputForm from "@/components/input-form";

const items = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  {
    title: "File d’attente",
    url: "/admin/commande-attente",
    icon: ListOrdered,
    isManagerOnly: true,
  },
  {
    title: "Commandes",
    url: "/admin/commande",
    icon: Inbox,
    isManagerOnly: true,
  },
  { title: "Produits", url: "/admin/produits", icon: Package },
  {
    title: "Paiements",
    url: "/admin/paiement",
    icon: CreditCard,
    isAdminOnly: true,
  },
  { title: "Clients", url: "/admin/clients", icon: Users2 },
];

const items2 = [
  // { title: "Avis clients", url: "/admin/avis", icon: MessageSquare },
  { title: "Notifications", url: "/admin/notifications", icon: BellRing },
  // { title: "Gérer l'utilisateur", url: "/admin/users", icon: UserCog },
  { title: "Parametre", url: "/admin/parametre/account", icon: Settings },
];

export function AppSidebar() {
  const { pathname } = useLocation();
  const { removeAuthUser } = useAuthInvalidate();
  const { user, isLoading } = useAuthUser();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      logout();
      navigate("/admin-login");
      removeAuthUser();
    } catch (error) {}
  };

  if (isLoading) {
    return <AppSidebarSkeleton />;
  }
  return (
    <Sidebar className="text-white">
      <div className="bg-gray-950 absolute inset-0 z-0" />
      <SidebarHeader className="z-50">
        {/* Logo or title */}
        <div className="flex items-end justify-between gap-4 p-3 pr-1">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-xl cursor-pointer"
          >
            <Logo
              width={28}
              height={22}
              className="text-white"
              color="#FFFFFF"
            />
            <h1 className="font-poppins font-black text-white">Mark-E</h1>
          </div>
          <div className="hover:text-gray-500 text-white p-1 rounded-md cursor-pointer transition-colors">
            <ArrowLeftFromLine size={18} />
            {/* <SidebarTrigger /> arrow-left-from-line */}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4">
          <InputForm iconLeft={<Search size={14} />} className="border-muted-foreground/60" placeholder="Rechercher..."/>
        </div>
        <SidebarGroup>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                // Ne pas afficher les items réservés aux managers si l'utilisateur n'a pas accès
                if (item.isManagerOnly && !isManagerAccess(user?.role))
                  return null;
                if (item.isAdminOnly && !isAdmin(user?.role)) return null;

                const isActive =
                  pathname === item.url || pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={`
                        transition-colors rounded
                        ${isActive ? "bg-gray-900 text-white" : "text-gray-400"}
                        hover:bg-gray-800 hover:text-white
                      `}
                      asChild
                    >
                      <NavLink
                        to={item.url}
                        className="flex items-center text-gray-400 text-lg space-x-2 h-10"
                      >
                        <Icon size={18} />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              {isAdmin(user?.role) && (
                <SidebarSeparator className="mx-0 my-2 bg-gray-600" />
              )}
              {items2.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.url || pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={`
                        transition-colors rounded
                        ${isActive ? "bg-gray-900 text-white" : "text-gray-400"}
                        hover:bg-gray-800 hover:text-white
                      `}
                      asChild
                    >
                      <NavLink
                        to={item.url}
                        className="flex items-center text-gray-400 space-x-2 h-10"
                      >
                        <Icon size={18} />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                    {item.title === "Notifications" && (
                      <Badge
                        variant={"destructive"}
                        className="w-5 h-5 absolute right-2.5 top-2.5 text-xs"
                      >
                        24
                      </Badge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator className="mx-0 bg-gray-600" />

      <SidebarFooter className="z-50 ">
        {/* Maybe a settings button or profile */}
        <div className="px-2 flex items-center justify-between">
          <div className="py-2 flex items-center gap-2 overflow-hidden">
            <UserAvatar
              size={32}
              src={user?.photo}
              fallback={fallbackAvatar(user)}
            />
            <div className=" text-white">
              <p className="text-sm font-medium ">{getFullName(user)}</p>
              <p className="text-xs line-clamp-1">{maskEmail(user?.email)}</p>
            </div>
          </div>
          <Dropdown
            align="start"
            btnShow={
              <span className="cursor-pointer text-white hover:bg-gray-800 p-2 rounded-md">
                <Ellipsis size={18} />
              </span>
            }
          >
            <DropdownItems
              title={getFullName(user)}
              description={maskEmail(user?.email)}
              icon={
                <UserAvatar
                  size={32}
                  src={user?.photo}
                  fallback={fallbackAvatar(user)}
                />
              }
            />
            <DropdownMenuSeparator />
            <DropdownItems
              title="Notifications"
              icon={<BellRing size={18} />}
            />
            <DropdownItems
              title="Parametre"
              icon={<Settings size={18} />}
              onClick={() => navigate("/admin/parametre/account")}
            />
            {isAdmin(user.role) && (
              <DropdownItems
                title="Gérer les utilisateur"
                icon={<UserCog size={18} />}
                onClick={() => navigate("/admin/parametre/users")}
              />
            )}

            <DropdownMenuSeparator />
            <DropdownItems
              title="Deconnexion"
              icon={<LogOut size={18} />}
              onClick={handleLogout}
              variant="destructive"
            />
          </Dropdown>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

const AppSidebarSkeleton = () => {
  return (
    <Sidebar className="text-white">
      <div className="bg-gray-950 absolute inset-0 z-0" />
      <SidebarHeader className="z-50">
        <div className="flex items-end justify-between gap-4 p-3 pr-1">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-4 w-20 ml-2" />
          </div>
          <Skeleton className="h-6 w-6 rounded" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {Array.from({ length: 5 }).map((_, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    className={`h-10 flex items-center space-x-2`}
                    asChild
                  >
                    <div className="flex items-center w-full">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 w-32 ml-3" />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarSeparator className="mx-0 my-2 bg-gray-600" />
              {Array.from({ length: 3 }).map((_, i) => (
                <SidebarMenuItem key={`s-${i}`}>
                  <SidebarMenuButton
                    className="h-10 flex items-center space-x-2"
                    asChild
                  >
                    <div className="flex items-center w-full">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 w-32 ml-3" />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator className="mx-0 bg-gray-600" />

      <SidebarFooter className="z-50 ">
        <div className="px-2 flex items-center justify-between">
          <div className="py-2 flex items-center gap-2 overflow-hidden">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="hidden md:block">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32 mt-1" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
