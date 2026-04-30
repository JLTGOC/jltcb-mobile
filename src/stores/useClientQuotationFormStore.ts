import { create } from "zustand";

import { createLogisticsQuotationFormSlice } from "@/src/stores/slices/client-quotation-form-slices/createLogisticsFormSlice";
import { createQuotationFormHeaderSlice } from "@/src/stores/slices/client-quotation-form-slices/createQuotationFormHeaderSlice";
import { createRegulatoryQuotationFormSlice } from "@/src/stores/slices/client-quotation-form-slices/createRegulatoryFormSlice";
import { createSharedQuotationFormSlice } from "@/src/stores/slices/client-quotation-form-slices/createSharedQuotationFormSlice";
import type { ClientQuotationFormStore } from "@/src/types/store";

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
