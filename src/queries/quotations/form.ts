import { queryOptions } from "@tanstack/react-query";

import { fetchQuotationEnumOptions } from "@/services/quotations";
import type { JobType } from "@/types/job-order";
import type { FetchQuoteParamsByService } from "@/types/quotations";
import { quotationQueries } from ".";

export const quotationFormQueries = {
  all: () => [...quotationQueries.all(), "form"],
  enums: <T extends JobType>(filters: FetchQuoteParamsByService<T>) =>
    queryOptions({
      queryKey: [quotationFormQueries.all(), "enums", filters],
      queryFn: () => fetchQuotationEnumOptions(filters),
    }),
};
