import { jobOrderKeys } from "@/src/query-key-factories/jobOrders";
import { fetchJobOrderEnums } from "@/src/services/jobOrderEnums";
import type { JobOrderEnumsFormatted } from "@/src/types/jobOrderEnums";
import { useQuery } from "@tanstack/react-query";

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
    enabled: !!quotationReference,
  });
}
