import { useQuery } from "@tanstack/react-query";
import { jobOrderKeys } from "../query-key-factories/jobOrders";
import { fetchJobOrderEnums } from "../services/jobOrders";
import { JobOrderEnumsFormatted } from "../types/jobOrders";

export function useJobOrderEnums() {
  return useQuery({
    queryKey: jobOrderKeys.getEnums(),
    queryFn: fetchJobOrderEnums,
    staleTime: Infinity,
    select: ({ data }) =>
      Object.fromEntries(
        Object.entries(data).map(([key, values]) => [
          key,
          values.map((item: string) => ({ id: item, title: item })),
        ]),
      ) as JobOrderEnumsFormatted,
  });
}
