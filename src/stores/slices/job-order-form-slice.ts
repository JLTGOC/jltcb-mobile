import type { JobOrderFormSchema } from "@/src/schemas/makeJobOrderFormSchema";
import type { Store } from "@/src/types/store";
import type { StateCreator } from "zustand";

interface JobOrderFormState {
  jobOrderFormData: Partial<JobOrderFormSchema>;
}

interface JobOrderFormActions {
  setJobOrderFormData: (jobOrderFormData: Partial<JobOrderFormSchema>) => void;
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
  reset: () => {
    set(store.getInitialState());
  },
});
