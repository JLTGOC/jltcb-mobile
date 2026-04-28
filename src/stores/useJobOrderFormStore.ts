import { create } from "zustand";

import { createLogisticsFormSlice } from "@/src/stores/slices/job-order-form-slices/createLogisticsFormSlice";
import { createQuotationReferenceSlice } from "@/src/stores/slices/job-order-form-slices/createQuotationReferenceSlice";
import type { JobOrderFormStore } from "@/src/types/store";

export const useJobOrderFormStore = create<JobOrderFormStore>()((...a) => ({
  ...createQuotationReferenceSlice(...a),
  ...createLogisticsFormSlice(...a),
  reset: () => {
    const [set, , store] = a;
    set(store.getInitialState());
  },
}));
