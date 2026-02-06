import { queryOptions } from "@tanstack/react-query";
import { fetchDashboardData } from "@/src/api/dashboard";
import { dashboardKeys } from "@/src/query-key-factories/dashboard";

export const dashboardQueryOptions = <T>(userId?: number) =>
	queryOptions({
		queryKey: dashboardKeys.getDashboard(userId),
		queryFn: () => fetchDashboardData<T>(),
		enabled: !!userId,
	});
