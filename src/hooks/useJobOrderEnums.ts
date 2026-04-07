import { useQuery } from "@tanstack/react-query";
import { jobOrderKeys } from "../query-key-factories/jobOrders";
import { fetchJobOrderEnums } from "../services/jobOrderEnums";
import type { JobOrderEnumsFormatted } from "../types/jobOrderEnums";

export function useJobOrderEnums(quotationReference?: string) {
	return useQuery({
		queryKey: jobOrderKeys.getEnums(quotationReference),
		queryFn: () => fetchJobOrderEnums(quotationReference),
		select: ({ data }) =>
			Object.fromEntries(
				Object.entries(data).map(([key, values]) => [
					key,
					Array.isArray(values)
						? values.map((item: string) => ({ id: item, title: item }))
						: values,
				]),
			) as JobOrderEnumsFormatted,
	});
}
