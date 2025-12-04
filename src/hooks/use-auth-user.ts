import { useQuery } from "@tanstack/react-query";
import { fetchMe, hasToken } from "@/services/authService";
import type { User } from "@/types";

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
  return {
    ...query,
    isAuthenticated,
  };
}

export default useAuthUser;
