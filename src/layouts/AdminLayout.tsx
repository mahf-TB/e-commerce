// src/layouts/AdminLayout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import ServerStatusBanner from "@/components/utils/ServerStatusBanner";
import { AppSidebar } from "@/features/AppSidebar";
import useAuthUser from "@/hooks/use-auth-user";
import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const { data, isLoading } = useAuthUser();
  // Protect admin space: only admin/manager/support can access
  if (!isLoading && (data?.role === "customer" || data?.role === "guest")) {
    return <Navigate to="/" replace />;
  }


  if (isLoading) return null; // or a spinner component
  return (
    <SidebarProvider>
      <ServerStatusBanner />
      <AppSidebar />
      <div className="bg-white min-h-screen w-full">
        <main>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
