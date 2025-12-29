import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthUser from "@/hooks/use-auth-user";

interface Props {
  children: React.ReactNode;
  redirectTo?: string;
}

const PublicRoutes: React.FC<Props> = ({ children, redirectTo = "/" }) => {
  const location = useLocation();
  const { data: user, isLoading , isAuthenticated } = useAuthUser();

  if (isLoading) return null; // ou afficher un spinner

  if (isAuthenticated) {
    // If on admin-login, redirect based on role
    if (location.pathname === "/admin-login") {
      const defaultRedirect = user?.role !== "customer" ? "/admin/dashboard" : "/";
      return <Navigate to={redirectTo || defaultRedirect} state={{ from: location }} replace />;
    }
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoutes;
