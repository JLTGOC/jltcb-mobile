import type { LogisticsQuotationFormData } from "@/src/schemas/client-quotation-form/logistics-quotation-form-schema";
import type { RegulatoryQuotationFormData } from "../schemas/client-quotation-form/regulatory-quotation-form-schema";
import type {
	CreateLogisticsQuotationRequestBody,
	CreateRegulatoryQuotationRequestBody,
} from "../types/quotations";

export const transformToLogisticsQuotePayload = (
	data: LogisticsQuotationFormData,
): CreateLogisticsQuotationRequestBody => ({
	services: "LOGISTICS",
	company: {
		name: data.companyName,
		address: data.companyAddress,
		contact_person: data.companyContactPerson,
		contact_number: data.companyContactNumber,
		email: data.companyEmail,
	},
	service: {
		type: data.serviceType,
		transport_mode: data.serviceTransportMode,
		options: data.serviceOptions,
	},
	commodity: {
		commodity: data.commodityCommodity,
		cargo_type: data.commodityCargoType,
		container_size: data.commodityContainerSize,
	},
	shipment: {
		origin: data.shipmentOrigin,
		destination: data.shipmentDestination,
	},
	documents: data.documents,
	remarks: data.remarks,
});

export const transformToRegulatoryQuotePayload = (
	data: RegulatoryQuotationFormData,
): CreateRegulatoryQuotationRequestBody => ({
	services: "REGULATORY",
	full_name: data.fullName,
	company: {
		name: data.companyName,
		address: data.companyAddress,
		contact_person: data.companyContactPerson,
		contact_number: data.companyContactNumber,
		email: data.companyEmail,
		position: data.companyPosition,
		business_type: data.companyBusinessType,
		cp_contact_number: data.companyContactPersonContactNumber,
	},
	type_of_regulatory_assistance: data.type_of_regulatory_assistance,
	service_level: data.service_level,
	message: data.message,
	documents: data.documents,
	remarks: data.remarks,
});
