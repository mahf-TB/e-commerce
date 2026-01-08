import AccessDenied from "@/components/utils/AccessDenied";
import useAuthUser from "@/hooks/use-auth-user";
import React from "react";

interface RequireRoleProps {
  allowedRoles: string[];
  children: React.ReactNode;
  page?: string;
}

export default function RequireRole({ allowedRoles, children, page }: RequireRoleProps) {
  const { isLoading, data } = useAuthUser();

  if (isLoading) return null; // or spinner

  const userRole = data?.role;
  const allowed = !!userRole && allowedRoles.includes(userRole);

  if (!allowed) return <AccessDenied title={page} />;

  return <>{children}</>;
}
