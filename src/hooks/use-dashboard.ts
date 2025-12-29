import { getDashboardStats, type DashboardParams, type DashboardStatsResponse } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";

export function useDashboardStats(params?: DashboardParams) {
  const query = useQuery<DashboardStatsResponse>({
    queryKey: ["dashboard", "stats", params],
    queryFn: () => getDashboardStats(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  return {
    ...query,
    stats: query.data,
  };
}
