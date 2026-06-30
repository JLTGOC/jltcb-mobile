import type { StateCreator } from "zustand";

import type { JobType } from "@/types/job-order";
import type { ClientQuotationFormStore } from "@/types/store";

const initialState: QuotationFormHeaderState = {
  service: "LOGISTICS",
  step: 0,
};

interface QuotationFormHeaderState {
  service: JobType;
  step: number;
}

interface QuotationFormHeaderActions {
  setService: (service: JobType) => void;
  setStep: (step: number) => void;
}

export type QuotationFormHeaderSlice = QuotationFormHeaderState &
  QuotationFormHeaderActions;

export const createQuotationFormHeaderSlice: StateCreator<
  ClientQuotationFormStore,
  [],
  [],
  QuotationFormHeaderSlice
> = (set) => ({
  ...initialState,
  setService: (service) => set({ service }),
  setStep: (step) => set({ step }),
});
