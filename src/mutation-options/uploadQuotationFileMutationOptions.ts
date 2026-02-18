import { mutationOptions } from "@tanstack/react-query";
import type { DocumentPickerAsset } from "expo-document-picker";
import { dashboardKeys } from "../query-key-factories/dashboard";
import { quotationKeys } from "../query-key-factories/quotations";
import { uploadQuotationFile } from "../services/quotations";
import type { QuotationStatus } from "../types/quotations";

export const uploadQuotationFileMutationOptions = ({
	userId,
	status,
}: {
	userId: string;
	status?: QuotationStatus;
}) =>
	mutationOptions({
		mutationFn: (variables: {
			quotationId: string;
			file: DocumentPickerAsset;
		}) => uploadQuotationFile(variables.quotationId, variables.file),
		meta: {
			invalidatesQuery: [
				...(status
					? [quotationKeys.getQuotations({ filter: status })]
					: [
							quotationKeys.getQuotations({ filter: "REQUESTED" }),
							quotationKeys.getQuotations({ filter: "RESPONDED" }),
						]),
				dashboardKeys.getDashboard(userId),
			],
		},
	});
