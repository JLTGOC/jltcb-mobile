import type { JobOrderFormSchema } from "@/src/schemas/makeJobOrderFormSchema";
import type { Store } from "@/src/types/store";
import type { StateCreator } from "zustand";

interface JobOrderFormState {
  jobOrderFormData: Partial<JobOrderFormSchema>;
  quotationReference?: string;
}

interface JobOrderFormActions {
  setJobOrderFormData: (jobOrderFormData: Partial<JobOrderFormSchema>) => void;
  setQuotationReference: (quotationReference: string) => void;
  reset: () => void;
}

export type JobOrderFormSlice = JobOrderFormState & JobOrderFormActions;

export const createJobOrderFormSlice: StateCreator<
  Store,
  [],
  [],
  JobOrderFormSlice
> = (set, _get, store) => ({
  jobOrderFormData: {},
  setJobOrderFormData: (jobOrderFormData) =>
    set((state) => ({
      jobOrderFormData: { ...state.jobOrderFormData, ...jobOrderFormData },
    })),

  setQuotationReference: (quotationReference) =>
    set({
      quotationReference,
    }),

  reset: () => {
    set(store.getInitialState());
  },
});
