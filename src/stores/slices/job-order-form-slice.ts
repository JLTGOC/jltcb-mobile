import type { LogisticsServiceFormSchema } from "@/src/schemas/job-order/logistics-service-form-schema";
import type { Store } from "@/src/types/store";
import type { StateCreator } from "zustand";

interface LogisticsServiceFormState {
  logisticsServiceFormData: Partial<LogisticsServiceFormSchema>;
  quotationReference?: string;
}

interface LogisticsServiceFormActions {
  setLogisticsServiceFormData: (
    logisticsServiceFormData: Partial<LogisticsServiceFormSchema>,
  ) => void;
  setQuotationReference: (quotationReference: string) => void;
  reset: () => void;
}

export type LogisticsServiceFormSlice = LogisticsServiceFormState &
  LogisticsServiceFormActions;

export const createLogisticsServiceFormSlice: StateCreator<
  Store,
  [],
  [],
  LogisticsServiceFormSlice
> = (set, _get, store) => ({
  logisticsServiceFormData: {},
  setLogisticsServiceFormData: (logisticsServiceFormData) =>
    set((state) => ({
      logisticsServiceFormData: {
        ...state.logisticsServiceFormData,
        ...logisticsServiceFormData,
      },
    })),

  setQuotationReference: (quotationReference) =>
    set({
      quotationReference,
    }),

  reset: () => {
    set(store.getInitialState());
  },
});
