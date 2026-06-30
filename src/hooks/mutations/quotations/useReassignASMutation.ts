import { useMutation } from "@tanstack/react-query";

import { quotationQueries } from "@/queries/quotations";
import { reassignAS } from "@/services/quotations";
import type { ReassignASRequestBody } from "@/types/quotations";

export function useReassignASMutation() {
  return useMutation({
    mutationFn: ({ quotationId, asId }: ReassignASRequestBody) =>
      reassignAS(quotationId, asId),
    meta: {
      invalidates: [
        quotationQueries.list({ filter: { status: "REQUESTED" } }).queryKey,
      ],
    },
  });
}
