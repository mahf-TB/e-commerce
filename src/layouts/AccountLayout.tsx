import UserAvatar from "@/components/user-avatar";
import useAuthUser from "@/hooks/use-auth-user";
import { cn } from "@/lib/utils";
import { getFullName, maskEmail } from "@/utils/helpers";
import { Bell, Heart, LayoutDashboard, Package } from "lucide-react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";

const AccountLayout = () => {
   const { data, isLoading } = useAuthUser();
  const { pathname } = useLocation();
  const navItems = [
    { to: "/account/dashboard", label: "Mon compte", icon: <LayoutDashboard size={18} /> },
    { to: "/account/orders", label: "Commandes", icon: <Package size={18} /> },
    { to: "/account/wishlist", label: "Favoris", icon: <Heart size={18} /> },
    {
      to: "/account/notifications",
      label: "Notifications",
      icon: <Bell size={18} />,
    },
  ];
  
  // Protect account space: only customers can access
  if (!isLoading && data?.role !== "customer") {
    return <Navigate to="/" replace />;
  }
  
  if (isLoading) return null; // or a spinner component

  return (
    <div className={cn(" w-full")}>
      <div className="w-full flex py-4 gap-5 mt-5">
        <aside className="w-1/5 sticky top-40 h-fit px-4  ">
          <div className="py-2 flex items-center gap-2  mb-4 overflow-hidden">
            <UserAvatar fallback="CN" size={50} src={data?.photo}/>
            <div className="hidden md:block">
              <p className="text-lg font-medium">{getFullName(data)}</p>
              <p className="text-sm line-clamp-1">
                {maskEmail(data?.email)}
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.to) ||  pathname === "/account" && item.to === "/account/dashboard";
              return (
                <NavLink
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
        <main className="w-4/5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;
