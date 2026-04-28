import type { StateCreator } from "zustand";

import type { JobOrderFormStore } from "@/src/types/store";

const initialState: QuotationReferenceState = {
  quotationReference: null,
};

interface QuotationReferenceState {
  quotationReference: string | null;
}

interface QuotationReferenceActions {
  setQuotationReference: (quotationReference: string) => void;
}

export type QuotationReferenceSlice = QuotationReferenceState &
  QuotationReferenceActions;

export const createQuotationReferenceSlice: StateCreator<
  JobOrderFormStore,
  [],
  [],
  QuotationReferenceSlice
> = (set) => ({
  ...initialState,
  setQuotationReference: (quotationReference) => set({ quotationReference }),
});
