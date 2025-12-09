// src/layouts/UserLayout.tsx
import HeaderPage from "@/features/HeaderPage";
import { NavbarMenu } from "@/features/NavbarMenu";
import { cn } from "@/lib/utils";
import { Outlet, useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";

const UserLayout = () => {
  const location = useLocation();
  return (
    <div
      className={cn(
        "flex min-h-svh w-full bg-gray-100",
        location.pathname === "/sign-in" && "bg-white"
      )}
    >
      <div className="w-full">
        <div className="sticky top-0 z-50">
          <HeaderPage />
          <div className="w-full bg-white z-50 border-b border-gray-300 ">
            <div className="container mx-auto">
              <NavbarMenu />
            </div>
          </div>
        </div>
        <main className={cn("container mx-auto p-4")}>
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
