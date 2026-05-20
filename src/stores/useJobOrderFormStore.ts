import { create } from "zustand";

import { createLogisticsFormSlice } from "@/stores/slices/job-order-form-slices/createLogisticsFormSlice";
import { createQuotationReferenceSlice } from "@/stores/slices/job-order-form-slices/createQuotationReferenceSlice";
import type { JobOrderFormStore } from "@/types/store";

export const useJobOrderFormStore = create<JobOrderFormStore>()((...a) => ({
  ...createQuotationReferenceSlice(...a),
  ...createLogisticsFormSlice(...a),
  reset: () => {
    const [set, , store] = a;
    set(store.getInitialState());
  },
}));
