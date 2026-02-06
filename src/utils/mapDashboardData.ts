import type { DashboardFolderSection, DashboardUser } from "../types/dashboard";

export const mapDashboardData = <T extends { user: DashboardUser }>(
	apiData: T,
	sectionsConfig: DashboardFolderSection<T>[],
) => {
	const mappedSections = sectionsConfig.map((section) => {
		const categoryKey = section.sectionKey as keyof T;
		const categoryData = apiData[categoryKey];

		return {
			...section,
			data: section.data.map((item) => {
				const count =
					categoryData && typeof categoryData === "object"
						? categoryData[item.countKey as keyof typeof categoryData]
						: 0;

				return {
					...item,
					count: typeof count === "number" ? count : 0,
				};
			}),
		};
	});

	return {
		user: apiData.user,
		sections: mappedSections,
	};
};
