export const jobOrderKeys = {
	all: () => ["jobOrder"] as const,
  lists: () => [...jobOrderKeys.all(), "list"] as const,
	getEnums: () => [...jobOrderKeys.all(), 'enums'] as const,
};