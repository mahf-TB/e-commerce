// src/layouts/UserLayout.tsx
import { AutoBreadcrumb } from "@/components/AutoBreadcrumb";
import HeaderPage from "@/features/HeaderPage";
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
        <HeaderPage />
        <main className={cn("container mx-auto p-4")}>
          {location.pathname !== "/" &&
            location.pathname !== "/checkout" &&
            location.pathname !== "/sign-in" && <AutoBreadcrumb />}

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
