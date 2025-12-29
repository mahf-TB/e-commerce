import useAuthUser from "@/hooks/use-auth-user";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import authService from "../services/authService";

interface Props {
  children: React.ReactNode;
  redirectTo?: string;
}

const AdminLoginRoutes: React.FC<Props> = ({ children, redirectTo = "/admin/dashboard" }) => {
  const location = useLocation();

  // Si l'utilisateur est authentifié (fetchMe a réussi), rediriger selon le rôle
  const { data: user, isLoading , isAuthenticated} = useAuthUser();

  if (isLoading) return null; // ou afficher un spinner

  if (isAuthenticated && user?.role && user.role !== "customer") {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (isAuthenticated && user?.role === "customer") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Si un token existe mais que l'auth n'est pas confirmée (ex: serveur indisponible),
  // on laisse afficher la page de login pour éviter des boucles de redirection.

  return children;
};

export default AdminLoginRoutes;
