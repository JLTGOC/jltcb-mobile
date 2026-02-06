export const dashboardKeys = {
	all: () => ["dashboard"] as const,
	getDashboard: (userId?: number) =>
		[...dashboardKeys.all(), { userId }] as const,
};
