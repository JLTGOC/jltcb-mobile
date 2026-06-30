import type { StateCreator } from "zustand";

import type { LogisticsJobOrderFormSchema } from "@/schemas/job-order/logistics-service-form-schema";
import type { JobOrderFormStore } from "@/types/store";

const initialState: LogisticsFormState = {
  logisticsFormData: {},
};

interface LogisticsFormState {
  logisticsFormData: Partial<LogisticsJobOrderFormSchema>;
}

interface LogisticsFormActions {
  setLogisticsFormData: (
    logisticsFormData: Partial<LogisticsJobOrderFormSchema>,
  ) => void;
}

export type LogisticsFormSlice = LogisticsFormState & LogisticsFormActions;

export const createLogisticsFormSlice: StateCreator<
  JobOrderFormStore,
  [],
  [],
  LogisticsFormSlice
> = (set) => ({
  ...initialState,
  setLogisticsFormData: (logisticsFormData) =>
    set((state) => ({
      logisticsFormData: {
        ...state.logisticsFormData,
        ...logisticsFormData,
      },
    })),
});
