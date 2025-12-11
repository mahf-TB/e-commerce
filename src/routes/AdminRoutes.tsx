import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthUser from "@/hooks/use-auth-user";

interface Props {
  children: React.ReactNode;
}

const AdminRoutes: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { data: user, isLoading, isAuthenticated } = useAuthUser();

  if (isLoading) return null; // or a spinner component

  // Only non-customer roles (admin, manager, support) can access admin space
  if (!isAuthenticated || user?.role === "customer") {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoutes;
