import { queryOptions } from "@tanstack/react-query";

import { fetchJobOrderFormEnums } from "@/services/jobOrder";
import type { JobOrderEnumsFormatted } from "@/types/jobOrderEnums";
import { jobOrderQueries } from ".";

export const jobOrderFormQueries = {
  all: () => [...jobOrderQueries.all(), "form"],
  enums: (quotationReference?: string) =>
    queryOptions({
      queryKey: [jobOrderFormQueries.all(), "enums", { quotationReference }],
      queryFn: () => fetchJobOrderFormEnums(quotationReference),
      select: ({ data }) =>
        Object.fromEntries(
          Object.entries(data).map(([key, values]) => [
            key,
            Array.isArray(values)
              ? values.map((item: string) => ({ id: item, title: item }))
              : values,
          ]),
        ) as JobOrderEnumsFormatted,
    }),
};
