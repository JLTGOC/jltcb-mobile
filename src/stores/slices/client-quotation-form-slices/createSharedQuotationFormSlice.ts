import type { StateCreator } from "zustand";

import type { SharedStep1FormData } from "@/src/schemas/client-quotation-form/shared-form-schema";
import type { ClientQuotationFormStore } from "@/src/types/store";

const initialState: SharedQuotationFormState = {
  sharedFormData: {
    companyName: "",
    companyAddress: "",
    companyContactNumber: "09",
    companyEmail: "",
  },
};

interface SharedQuotationFormState {
  sharedFormData: Partial<SharedStep1FormData>;
}

interface SharedQuotationFormActions {
  setSharedFormData: (data: Partial<SharedStep1FormData>) => void;
}

export type SharedQuotationFormSlice = SharedQuotationFormState &
  SharedQuotationFormActions;

export const createSharedQuotationFormSlice: StateCreator<
  ClientQuotationFormStore,
  [],
  [],
  SharedQuotationFormSlice
> = (set) => ({
  ...initialState,
  setSharedFormData: (data) =>
    set((state) => ({
      sharedFormData: {
        ...state.sharedFormData,
        ...data,
      },
    })),
});
