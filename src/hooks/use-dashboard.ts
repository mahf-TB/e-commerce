import {
  getDashboardStats,
  getDashboardStatsForClients,
  type DashboardParams,
  type DashboardStatsResponse,
} from "@/services/dashboardService";
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

export function useDashboardStatsForClient(
  id: string,
  params?: DashboardParams
) {
  const query = useQuery<any>({
    queryKey: ["dashboard", "stats", id, params],
    queryFn: () => getDashboardStatsForClients(id, params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  return {
    ...query,
    stats: query.data,
  };
}
