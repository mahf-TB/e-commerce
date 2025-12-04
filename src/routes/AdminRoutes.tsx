import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthUser from "@/hooks/use-auth-user";

interface Props {
  children: React.ReactNode;
}

const AdminRoutes: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { data: user, isLoading, error } = useAuthUser();

  if (isLoading) return null; // or a spinner component

  if (!user || error || user.role !== "admin") {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoutes;
