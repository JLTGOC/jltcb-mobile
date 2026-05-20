export const dashboardKeys = {
  all: () => ["dashboard"] as const,
  getDashboard: (userId: string) =>
    [...dashboardKeys.all(), { userId }] as const,
};
