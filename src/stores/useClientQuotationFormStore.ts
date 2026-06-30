import { create } from "zustand";

import { createLogisticsQuotationFormSlice } from "@/stores/slices/client-quotation-form-slices/createLogisticsFormSlice";
import { createQuotationFormHeaderSlice } from "@/stores/slices/client-quotation-form-slices/createQuotationFormHeaderSlice";
import { createRegulatoryQuotationFormSlice } from "@/stores/slices/client-quotation-form-slices/createRegulatoryFormSlice";
import { createSharedQuotationFormSlice } from "@/stores/slices/client-quotation-form-slices/createSharedQuotationFormSlice";
import type { ClientQuotationFormStore } from "@/types/store";

export const useClientQuotationFormStore = create<ClientQuotationFormStore>()(
  (...a) => ({
    ...createQuotationFormHeaderSlice(...a),
    ...createSharedQuotationFormSlice(...a),
    ...createLogisticsQuotationFormSlice(...a),
    ...createRegulatoryQuotationFormSlice(...a),
    reset: () => {
      const [set, , store] = a;
      set(store.getInitialState());
    },
  }),
);
