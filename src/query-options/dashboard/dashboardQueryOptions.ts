import { queryOptions } from "@tanstack/react-query";

import { dashboardKeys } from "@/query-key-factories/dashboard";
import { fetchDashboardData } from "@/services/dashboard";

export const dashboardQueryOptions = <T>(userId: string) =>
  queryOptions({
    queryKey: dashboardKeys.getDashboard(userId),
    queryFn: () => fetchDashboardData<T>(),
    enabled: !!userId,
  });
