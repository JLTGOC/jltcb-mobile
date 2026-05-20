import { useMutation } from "@tanstack/react-query";

import { createQuotationMutationOptions } from "@/mutation-options/client-quotations/createQuotationMutationOptions";

import { useAuth } from "./useAuth";

export function useCreateQuotationMutation() {
  const { userData } = useAuth();
  return useMutation(createQuotationMutationOptions(String(userData?.id)));
}
