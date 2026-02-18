import { dashboardKeys } from "@/src/query-key-factories/dashboard";
import { fetchDashboardData } from "@/src/services/dashboard";
import { queryOptions } from "@tanstack/react-query";

export const dashboardQueryOptions = <T>(userId: string) =>
	queryOptions({
		queryKey: dashboardKeys.getDashboard(userId),
		queryFn: () => fetchDashboardData<T>(),
		enabled: !!userId,
	});
