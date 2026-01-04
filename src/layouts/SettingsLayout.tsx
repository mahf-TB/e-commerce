import { Logo } from "@/components/icon/logo";
import UserAvatar from "@/components/user-avatar";
import useAuthUser from "@/hooks/use-auth-user";
import { cn } from "@/lib/utils";
import { getFullName, getLibelleRole, hasAdminAccess, isAdmin, maskEmail } from "@/utils/helpers";
import {
  FolderTree,
  HelpCircle,
  Mail,
  MessageSquare,
  Shield,
  Tag,
  UserCircle,
  UserCog,
  X
} from "lucide-react";
import {
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

const AdminSettingsLayout = () => {
  const { data, isLoading } = useAuthUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navItems = [
    {
      to: "/admin/parametre/account",
      label: "Mon compte",
      icon: <UserCircle size={18} />,
    },
    // {
    //   to: "/admin/parametre/general",
    //   label: "Paramètres généraux",
    //   icon: <Settings size={18} />,
    // },
   
    {
      to: "/admin/parametre/categories",
      label: "Catégories",
      icon: <FolderTree size={18} />,
       isAdminOnly: true,
    },
    {
      to: "/admin/parametre/marques",
      label: "Marques",
      icon: <Tag size={18} />,
       isAdminOnly: true,
    },
     {
      to: "/admin/parametre/users",
      label: "Gestion utilisateurs",
      icon: <UserCog size={18} />,
      isAdminOnly: true,
    },
    {
      to: "/admin/parametre/avis",
      label: "Avis clients",
      icon: <MessageSquare size={18} />,
    },
    
    // {
    //   to: "/admin/parametre/livraison",
    //   label: "Livraison",
    //   icon: <Truck size={18} />,
    // },
    // {
    //   to: "/admin/parametre/taxes",
    //   label: "Taxes & Fiscalité",
    //   icon: <Package size={18} />,
    // },
    {
      to: "/admin/parametre/notifications",
      label: "Emails & Notifications",
      icon: <Mail size={18} />,
    },
    // {
    //   to: "/admin/parametre/appearance",
    //   label: "Apparence",
    //   icon: <Palette size={18} />,
    // },
    {
      to: "/admin/parametre/security",
      label: "Sécurité",
      icon: <Shield size={18} />,
      
    },
    // {
    //   to: "/admin/parametre/integrations",
    //   label: "Intégrations",
    //   icon: <Globe size={18} />,
    // },
    {
      to: "/admin/parametre/support",
      label: "Support",
      icon: <HelpCircle size={18} />,
    },
  ];
  // Protect account space: only customers can access
  if (!isLoading && !hasAdminAccess(data?.role)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (isLoading) return null; // or a spinner component

  return (
    <div className={cn("bg-white h-screen w-full flex flex-col overflow-hidden")}>
      <div className="bg-black sticky top-0 z-50 shrink-0">
        <div className="container mx-auto flex items-center justify-between gap-4 p-3 pr-1">
          <div
            onClick={() => navigate(-1)}
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
          <div className="flex items-center md:gap-4 gap-2">
            <div className="flex items-center gap-2 ">
              <UserAvatar fallback="CN" size={40} src={data?.photo} />
              <div className="hidden md:block text-white">
                <p className="text-sm font-medium">{getFullName(data)}</p>
                <p className="text-xs line-clamp-1 text-gray-400">{getLibelleRole(data?.role)}</p>
              </div>
            </div>
            <div
              onClick={() => navigate("/admin/dashboard")}
              className="hover:text-gray-500 text-white p-1 rounded-md cursor-pointer transition-colors"
            >
              <X size={18} />
              {/* <SidebarTrigger /> arrow-left-from-line */}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex items-start flex-1 gap-5 overflow-hidden">
        <aside className="w-1/5 py-5 px-4 hidden md:block overflow-y-auto h-full">
        <div className="py-2 flex items-center gap-2  mb-4 overflow-hidden">
            <UserAvatar fallback="CN" size={50} src={data?.photo}/>
            <div className="hidden md:block">
              <p className="text-lg font-medium">{getFullName(data)}</p>
              <p className="text-sm line-clamp-1">
                {getLibelleRole(data?.role)}
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive =
                pathname.startsWith(item.to) ||
                (pathname === "/admin/parametre" &&
                  item.to === "/admin/parametre/account");
              if (item.isAdminOnly && !isAdmin(data?.role)) {
                return null;
              }
              return (
                <NavLink
                discover="none"
                key={item.to}
                  to={item.to}
                  className={`
                  flex items-center gap-3 px-2 py-2 rounded text-sm 
                  transition-all duration-150
                  ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-950 hover:text-gray-200 hover:bg-gray-900/70"
                  }
                `}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>
        <main className="md:w-4/5 w-full px-4 py-4 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminSettingsLayout;
