import type { ElementType } from "react";

export interface ASRequestedQuotation {
	name: string;
	request_count: number;
	quotations: Quotation[];
}

export interface Quotation {
	id: number;
	date: string;
	contact_person: string;
	commodity: string;
}

export interface QuotationDetails {
	general_info: GeneralInfo;
	consignee_details: ConsigneeDetails;
	shipment_details: ShipmentDetails;
	documents: Document[];
}

export interface GeneralInfo {
	reference_number: string;
	client_id: number;
	account_specialist: string;
	status: string;
}

export interface ConsigneeDetails {
	company_name: string;
	company_address: string;
	contact_person: string;
	contact_number: string;
	email: string;
}

export interface ShipmentDetails {
	service_type: string;
	transport_mode: string;
	service: string;
	commodity: string;
	volume: string;
	origin: string;
	destination: string;
	details: string;
	created_at: string;
	updated_at: string;
}

export interface Document {
	id: number;
	file_name: string;
	file_url: string;
}

export type QuotationStatus = "REQUESTED" | "RESPONDED";

export interface QuotationFilter {
	filter: QuotationStatus;
	search?: string;
}

export interface QuotationDetailsSection {
	icon: ElementType;
	title: string;
	details: [string, unknown][];
}
