import { useQuery } from "@tanstack/react-query";
import { fetchMe, hasToken } from "@/services/authService";
import type { User } from "@/types";
import React from "react";

export function useAuthUser() {
  const hasTokenValue = hasToken();
  const query = useQuery<User>({
    queryKey: ["auth", "me"],
    queryFn: fetchMe,
    enabled: !!hasTokenValue,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
  const isAuthenticated = !!query.data && !query.error;
    const user = query.data as User;
  return {
    ...query,
    data: user,
    isAuthenticated,
  };
}

export default useAuthUser;
