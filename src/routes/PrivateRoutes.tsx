import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthUser from "@/hooks/use-auth-user";

interface Props {
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { isLoading, isAuthenticated } = useAuthUser();

  if (isLoading) return null; // or a spinner component

  if (!isAuthenticated) {
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoutes;
