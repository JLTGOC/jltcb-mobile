import type { JobOrderEnums } from "@/types/jobOrderEnums";

import { apiGet } from "./axiosInstance";

export const fetchJobOrderEnums = (quotation_reference_number?: string) =>
	apiGet<JobOrderEnums>("job-orders/enums", {
		params: { quotation_reference_number },
	});
