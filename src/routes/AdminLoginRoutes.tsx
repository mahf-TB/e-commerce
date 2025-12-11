import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import authService from "../services/authService";
import useAuthUser from "@/hooks/use-auth-user";

interface Props {
  children: React.ReactNode;
  redirectTo?: string;
}

const AdminLoginRoutes: React.FC<Props> = ({ children, redirectTo = "/admin/dashboard" }) => {
  const token = authService.getToken();
  const location = useLocation();
  const { data: user, isLoading } = useAuthUser();

  if (isLoading) return null; // ou afficher un spinner

  // If authenticated and non-customer, redirect to admin dashboard
  if (token && user?.role !== "customer") {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If authenticated as customer, redirect to home (they can't use admin login)
  if (token && user?.role === "customer") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminLoginRoutes;
