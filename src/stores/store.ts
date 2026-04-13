import { createLogisticsServiceFormSlice } from "@/src/stores/slices/job-order-form-slice";
import type { Store } from "@/src/types/store";
import { create } from "zustand";

export const useStore = create<Store>()((...a) => ({
  ...createLogisticsServiceFormSlice(...a),
}));
