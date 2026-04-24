import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Building, Package } from "lucide-react-native";

import { quotationQueryOptions } from "@/src/query-options/asLead-quotations/quotationQueryOptions";
import { updateFileName } from "@/src/services/quotations";
import type { ApiResponse } from "@/src/types/api";
import type { Quotation } from "@/src/types/quotations";

function selectQuotationData({ data }: ApiResponse<Quotation>) {
	const {
		company,
		service,
		commodity,
		shipment,
		account_specialist,
		documents,
		remarks,
		regulatory_service,
		client_id: clientId,
		conversation_id: conversationId,
	} = data;

	const shipmentSection = regulatory_service
		? []
		: [
				{
					icon: Package,
					title: "Shipment Details",
					details: [
						["Service Type", service.type],
						["Freight Transport Mode", service.transport_mode],
						["Service", service.options.join(", ")],
						["Commodity", commodity.commodity],
						[
							"Volume (Dimension)",
							`${commodity.cargo_type} ${commodity.container_size ?? ""}`,
						],
						...Object.entries(shipment).map(([key, value]) => [
							key.replace(/_/g, " "),
							value,
						]),
						["Details", remarks ?? ""],
					],
				},
			];

	return {
		clientId,
		conversationId,
		sections: [
			{
				icon: Building,
				title: "Consignee Details",
				details: [
					["Company Name", company.name],
					["Company Address", company.address],
					["Contact Person", company.contact_person],
					["Contact Number", company.contact_number],
					["Email", company.email],
				],
			},
			...shipmentSection,
			{
				icon: Package,
				title: "Person in Charge",
				details: [["Account Specialist", account_specialist]],
			},
		],
		documents: Array.isArray(documents) ? documents : [],
	};
}

export function useQuotationData(id: string) {
	const queryClient = useQueryClient();

	const query = useQuery({
		...quotationQueryOptions(id),
		select: selectQuotationData,
	});

	const renameFileMutation = useMutation({
		mutationFn: async ({
			documentId,
			fileName,
		}: {
			documentId: number;
			fileName: string;
		}) => {
			const quotationId = Number(id);
			if (!quotationId || Number.isNaN(quotationId)) {
				throw new Error("Missing quotation id.");
			}
			return updateFileName(quotationId, documentId, fileName);
		},
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: quotationQueryOptions(id).queryKey,
			}),
	});

	return { query, renameFileMutation };
}
