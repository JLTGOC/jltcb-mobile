import { queryOptions } from "@tanstack/react-query";

import { fetchDashboard } from "@/services/dashboard";

export const dashboardQueries = {
  all: () => ["dashboard"],
  details: () => [...dashboardQueries.all(), "detail"],
  detail: <T>() =>
    queryOptions({
      queryKey: [...dashboardQueries.details()],
      queryFn: fetchDashboard<T>,
    }),
};
