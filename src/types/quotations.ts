import type { ElementType } from "react";

import type { ContainerSize, options } from "@/constants/client-const";
import type { ClientType } from "@/types/jobOrderEnums";

import type { File } from ".";
import type { CargoType } from "./job-order";

export const ASSIGNMENT_STATUSES = [
	"AVAILABLE",
	"REASSIGNMENT REQUESTED",
	"ASSIGNED",
] as const;
export type AssignmentStatus = (typeof ASSIGNMENT_STATUSES)[number];

export const LOGISTICS_SERVICE_LEVELS = ["IMPORT", "EXPORT"] as const;
export type LogisticsServiceLevel = (typeof LOGISTICS_SERVICE_LEVELS)[number];

export const LOGISTICS_TRANSPORT_MODES = ["SEA", "AIR"] as const;
export type LogisticsTransportMode = (typeof LOGISTICS_TRANSPORT_MODES)[number];

export type LogisticsServiceOptions = (typeof options)[number];

export interface ASRequestedQuotationSummary {
	client_id: number;
	client_full_name: string;
	quotations_count: number;
	date: string;
	quotations: ASRequestedQuotation[];
}

export type BaseQuotationServiceDetails =
	| { service: "REGULATORY"; service_type: "BUSINESS SOLUTION" }
	| { service: "LOGISTICS"; service_type: "IMPORT" | "EXPORT" };

export type BaseASQuotation = {
	id: number;
	client_name: string;
	reference_number: string;
	issued_quotation_id: string | null;
	commodity: string;
	date: string;
	conversation_id: string | null;
	prepared_by: string;
} & BaseQuotationServiceDetails;

export type ASRespondedQuotation = BaseASQuotation & {
	status: "RESPONDED";
	accepted_at: null;
};

export type ASAcceptedQuotation = BaseASQuotation & {
	status: "ACCEPTED";
	accepted_at: string;
};

interface LogisticsServiceSummary {
	commodity: string;
	service_level: LogisticsServiceLevel;
	transport_mode: LogisticsTransportMode;
	origin: string;
	destination: string;
}

interface RegulatoryServiceSummary {
	application_type: ClientType;
}

type RequestedQuotationAssignmentDetails =
	| {
			assignment_status: "AVAILABLE";
			as_username: "Available";
			as_full_name: null;
			assigned_at: null;
	  }
	| {
			assignment_status: "ASSIGNED" | "REASSIGNMENT REQUESTED";
			as_username: string;
			as_full_name: string;
			assigned_at: string;
	  };

type RequestedQuotationServiceDetails =
	| {
			service: "REGULATORY";
			logistics_service: null;
			regulatory_service: RegulatoryServiceSummary;
	  }
	| {
			service: "LOGISTICS";
			logistics_service: LogisticsServiceSummary;
			regulatory_service: null;
	  };

export type ASRequestedQuotation = {
	id: number;
	date: string;
	client_full_name: string;
	status: "REQUESTED";
	conversation_id: string | null;
	prepared_by: string | null;
	issued_quotation_id: string | null;
} & RequestedQuotationAssignmentDetails &
	RequestedQuotationServiceDetails;

interface BaseQuotation {
	id: number;
	reference_number: string;
	client_id: number;
	client: string;
	account_specialist: string | null;
	status: QuotationStatus;
	created_at: string;
	updated_at: string;
	issued_quotation_id: number | null;
	company: Company;
	quotation_file: QuotationFile[] | string;
	documents: Document[] | string;
	remarks: string | null;
	conversation_id: string | null;
}

export interface LogisticsQuotation extends BaseQuotation {
	service: LogisticsService;
	commodity: Commodity;
	shipment: Shipment;
	regulatory_service: null;
}

export interface RegulatoryQuotation extends BaseQuotation {
	service: null;
	commodity: null;
	shipment: null;
	regulatory_service: RegulatoryService;
}

export type Quotation = LogisticsQuotation | RegulatoryQuotation;

export interface Company {
	name: string;
	address: string;
	contact_person: string;
	contact_number: string;
	email: string;
	position: string;
	business_type: string;
}

export interface LogisticsService {
	type: LogisticsServiceLevel;
	transport_mode: LogisticsTransportMode;
	options: LogisticsServiceOptions[];
}

export interface RegulatoryService {
	type_of_regulatory_assistance: string[];
	service_level: ClientType;
	message: string;
}

export interface Commodity {
	commodity: string;
	cargo_type: string;
	container_size: string;
}

export interface Shipment {
	origin: string;
	destination: string;
}

export interface Document {
	id: number;
	file_name: string;
	file_url: string;
	file_type: string;
	created_at: string;
	updated_at: string;
}

export interface QuotationFile {
	id: number;
	file_name: string;
	file_url: string;
	file_type: string;
	created_at: string;
	updated_at: string;
}

export type QuotationStatus =
	| "REQUESTED"
	| "RESPONDED"
	| "ACCEPTED"
	| "DISCARDED";

export interface QuotationFilter<T extends QuotationStatus = QuotationStatus> {
	filter: T;
	search?: string;
}

export interface QuotationDetailsSection {
	icon: ElementType;
	title: string;
	details: string[][];
}

export interface UpdateAsArgs {
	quotationId: number;
	asId: number;
}

export interface CreateLogisticsQuotationRequestBody {
	services: "LOGISTICS";
	company: {
		name: string;
		address: string;
		contact_person: string;
		contact_number: string;
		email: string;
	};
	service: {
		type: LogisticsServiceLevel;
		transport_mode: LogisticsTransportMode;
		options: ["ALL IN"] | string[];
	};
	commodity: {
		commodity: string;
		cargo_type: CargoType;
		container_size?: ContainerSize;
	};
	shipment: {
		origin: string;
		destination: string;
	};
	documents: File[];
	remarks?: string;
}

export interface CreateRegulatoryQuotationRequestBody {
	services: "REGULATORY";
	full_name: string;
	company: {
		name: string;
		address: string;
		position: string;
		contact_number: string;
		email: string;
		business_type: string;
		contact_person: string;
		cp_contact_number: string;
	};
	type_of_regulatory_assistance: string[];
	service_level: ClientType;
	message: string;
	documents: File[];
	remarks?: string;
}

export type CreateQuotationRequestBody =
	| CreateLogisticsQuotationRequestBody
	| CreateRegulatoryQuotationRequestBody;
