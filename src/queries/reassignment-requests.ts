import { queryOptions } from "@tanstack/react-query";

import { fetchReassignmentRequestEnums } from "@/services/reassignment-requests";
import type { ReassignmentRequestEnumsQueryParams } from "@/types/reassignment-requests";

export const reassignmentRequestQueries = {
  all: () => ["reassignment-requests"],
  enums: <T extends ReassignmentRequestEnumsQueryParams>(params?: T) =>
    queryOptions({
      queryKey: [...reassignmentRequestQueries.all(), "enums", params],
      queryFn: () => fetchReassignmentRequestEnums(params),
    }),
};
