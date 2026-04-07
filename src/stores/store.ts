import { create } from "zustand";
import { createJobOrderFormSlice } from "@/src/stores/slices/job-order-form-slice";
import type { Store } from "@/src/types/store";

export const useStore = create<Store>()((...a) => ({
	...createJobOrderFormSlice(...a),
}));
