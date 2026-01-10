// src/layouts/UserLayout.tsx
import ServerStatusBanner from "@/components/utils/ServerStatusBanner";
import HeaderPage from "@/features/HeaderPage";
import { NavbarMenu } from "@/features/NavbarMenu";
import useAuthUser from "@/hooks/use-auth-user";
import { cn } from "@/lib/utils";
import { Outlet, useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";

const UserLayout = () => {
  const location = useLocation();

  const { data, isAuthenticated, isLoading } = useAuthUser();
  if (isLoading) return null; // ou un indicateur de chargement
  return (
    <div
      className={cn(
        "flex min-h-svh w-full bg-gray-100",
        location.pathname === "/sign-in" ||
          (location.pathname === "/" && "bg-white")
      )}
    >
      <div className="w-full">
        <ServerStatusBanner />
        {!location.pathname.startsWith("/checkout") &&
          (isLoading ? null : (
            <div className="sticky top-0 z-9999">
              <HeaderPage data={data} isAuthenticated={isAuthenticated} />
              <div className="w-full bg-white z-50 border-b border-gray-300 ">
                <div className="container mx-auto">
                  <NavbarMenu />
                </div>
              </div>
            </div>
          ))}
        <main
          className={cn(
            " mx-auto p-4",
            location.pathname === "/" ? "p-0 ml-0 mr-0" : "container"
          )}
        >
          {/* {location.pathname !== "/" &&
            location.pathname !== "/checkout" &&
            location.pathname !== "/sign-in" && <AutoBreadcrumb />} */}

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
