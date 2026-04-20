import { mutationOptions } from "@tanstack/react-query";
import { dashboardKeys } from "@/src/query-key-factories/dashboard";
import {
	jobOrderKeys,
	jobOrderListKeys,
} from "@/src/query-key-factories/jobOrders";
import { createJobOrder } from "@/src/services/jobOrder";
import type { CreateJobOrderRequestBody } from "@/src/types/job-order";

export const createJobOrderMutationOptions = (userId: string) =>
	mutationOptions({
		mutationFn: (data: CreateJobOrderRequestBody) => createJobOrder(data),
		meta: {
			invalidatesQuery: [
				dashboardKeys.getDashboard(userId),
				jobOrderKeys.list(),
				jobOrderListKeys.created({ status: "created" }),
			],
		},
	});
