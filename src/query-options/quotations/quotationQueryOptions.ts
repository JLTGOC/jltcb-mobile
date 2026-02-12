import { queryOptions } from "@tanstack/react-query";
import { Building, Package } from "lucide-react-native";
import { fetchQuotation } from "@/src/api/quotations";
import { quotationKeys } from "@/src/query-key-factories/quotations";

export const quotationQueryOptions = (quotationId: string) =>
	queryOptions({
		queryKey: quotationKeys.getQuotation(quotationId),
		queryFn: () => fetchQuotation(quotationId),
		select: (quotation) => {
			const consigneeDetails = {
				icon: Building,
				title: "Consignee Details",
				details: Object.entries(quotation.data.consignee_details).map(
					([key, value]) => [key.replace(/_/g, " "), value],
				),
			};

			const shipmentDetails = {
				icon: Package,
				title: "Shipment Details",
				details: Object.entries(quotation.data.consignee_details).map(
					([key, value]) => [key.replace(/_/g, " "), value],
				),
			};

			const personInCharge = {
				icon: Package,
				title: "Person in Charge",
				details: [
					[
						"Account Specialist",
						quotation.data.general_info.account_specialist,
					],
				],
			};

			return {
				sections: [consigneeDetails, shipmentDetails, personInCharge],
				documents: Array.isArray(quotation.data.documents)
					? quotation.data.documents
					: [],
			};
		},
	});
