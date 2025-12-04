import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import authService from "../services/authService";
import useAuthUser from "@/hooks/use-auth-user";

interface Props {
  children: React.ReactNode;
  redirectTo?: string;
}

const PublicRoutes: React.FC<Props> = ({ children, redirectTo = "/" }) => {
  const token = authService.getToken();
  const location = useLocation();
  const { isLoading } = useAuthUser();

  if (isLoading) return null; // ou afficher un spinner

  if (token) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoutes;
