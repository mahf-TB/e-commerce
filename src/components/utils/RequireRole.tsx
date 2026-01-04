import AccessDenied from "@/components/utils/AccessDenied";
import useAuthUser from "@/hooks/use-auth-user";
import React from "react";

interface RequireRoleProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function RequireRole({ allowedRoles, children }: RequireRoleProps) {
  const { isLoading, data } = useAuthUser();

  if (isLoading) return null; // or spinner

  const userRole = data?.role;
  const allowed = !!userRole && allowedRoles.includes(userRole);

  if (!allowed) return <AccessDenied />;

  return <>{children}</>;
}
