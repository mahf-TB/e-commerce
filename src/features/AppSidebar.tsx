// components/app-sidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Home,
  Inbox,
  ShoppingBag,
  Ellipsis,
  LogOut,
  Bell,
  Settings,
  Package,
  CreditCard,
  Users2,
  BellRing,
  ArrowLeftFromLine,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import Dropdown, { DropdownItems } from "../components/dropdown";
import { DropdownMenuSeparator } from "../components/ui/dropdown-menu";
import { Badge } from "../components/ui/badge";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "@/services/authService";
import { useAuthInvalidate } from "@/hooks/use-auth-invalidate";

const items = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Commandes", url: "/admin/commande", icon: Inbox },
  { title: "Produits", url: "/admin/produits", icon: Package },
  { title: "Paiements", url: "/admin/dashboard", icon: CreditCard },
  { title: "Clients", url: "/admin/clients", icon: Users2 },
];

const items2 = [
  { title: "Notifications", url: "/admin/dashboard", icon: Bell },
  { title: "Parametre", url: "/admin/dashboard", icon: Settings },
];

export function AppSidebar() {
  const { pathname } = useLocation();
   const { removeAuthUser } = useAuthInvalidate();
  const navigate = useNavigate();
    const handleLogout = async () => {
      try {
        await logout();
        navigate("/admin-login");
         await removeAuthUser();
      } catch (error) {}
    };
  return (
    <Sidebar className="text-white">
      <div className="bg-gray-950 absolute inset-0 z-0" />
      <SidebarHeader className="z-50">
        {/* Logo or title */}
        <div className="flex items-end justify-between gap-4 p-3 pr-1">
          <div className="flex items-center gap-2 text-xl">
            <ShoppingBag className="" size={22} />
            <h1 className="font-poppins font-black">Mark-E</h1>
          </div>
          <div className="hover:text-gray-500 p-1 rounded-md cursor-pointer transition-colors">
            <ArrowLeftFromLine size={18} />
            {/* <SidebarTrigger /> arrow-left-from-line */}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                     className={`
                        transition-colors
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
              <SidebarSeparator className="mx-0 my-2 bg-gray-600" />
              {items2.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={`
                        transition-colors
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

      <SidebarFooter className="z-50">
        {/* Maybe a settings button or profile */}
        <div className="px-2 flex items-center justify-between">
          <div className="py-2 flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Abraham Illcoon</p>
              <p className="text-xs">ma@exemple.com</p>
            </div>
          </div>
          <Dropdown
            align="start"
            btnShow={
              <span className="cursor-pointer hover:bg-gray-800 p-2 rounded-md">
                <Ellipsis size={18} />
              </span>
            }
          >
            <DropdownItems
              title="Abraham Illcoon"
              description="ma@exemple.com"
              icon={
                <Avatar className="rounded-lg">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              }
            />
            <DropdownMenuSeparator />
            <DropdownItems
              title="Notifications"
              icon={<BellRing size={18} />}
            />
            <DropdownItems title="Parametre" icon={<Settings size={18} />} />
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
