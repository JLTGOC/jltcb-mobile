import type { StateCreator } from "zustand";

import type { ExtendedLogisticsQuotationFormData } from "@/schemas/client-quotation-form/logistics-quotation-form-schema";
import type { ClientQuotationFormStore } from "@/types/store";

const initialState: LogisticsQuotationFormState = {
  logisticsFormData: {
    companyContactPerson: "",
    serviceType: undefined,
    serviceTransportMode: undefined,
    serviceOptions: [],
    commodityCommodity: "",
    commodityCargoType: undefined,
    commodityContainerSize: undefined,
    shipmentOrigin: "",
    shipmentDestination: "",
    documents: [],
    remarks: "",
  },
};

interface LogisticsQuotationFormState {
  logisticsFormData: Partial<ExtendedLogisticsQuotationFormData>;
}

interface LogisticsQuotationFormActions {
  setLogisticsFormData: (
    data: Partial<ExtendedLogisticsQuotationFormData>,
  ) => void;
}

export type LogisticsQuotationFormSlice = LogisticsQuotationFormState &
  LogisticsQuotationFormActions;

export const createLogisticsQuotationFormSlice: StateCreator<
  ClientQuotationFormStore,
  [],
  [],
  LogisticsQuotationFormSlice
> = (set) => ({
  ...initialState,
  setLogisticsFormData: (data) =>
    set((state) => ({
      logisticsFormData: {
        ...state.logisticsFormData,
        ...data,
      },
    })),
});
