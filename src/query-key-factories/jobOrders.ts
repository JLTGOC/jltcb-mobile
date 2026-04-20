export const jobOrderKeys = {
	all: () => ["jobOrders"] as const,
	lists: () => [...jobOrderKeys.all(), "list"] as const,
	list: (search?: string) => [...jobOrderKeys.lists(), { search }] as const,
	details: () => [...jobOrderKeys.all(), "detail"] as const,
	detail: (id: number) => [...jobOrderKeys.details(), id] as const,
	getEnums: (quotationReference?: string) =>
		[...jobOrderKeys.all(), "enums", quotationReference] as const,
};

export const jobOrderListKeys = {
	all: () => ["job-orders"] as const,
	created: (params?: { status?: string; page?: number }) =>
		[...jobOrderListKeys.all(), "created", params ?? {}] as const,
};
