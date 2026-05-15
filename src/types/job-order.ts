import type { ReactNode } from "react";

import type {
	AccreditedType,
	BillingType,
	ClientType,
	ServiceLevelType,
} from "@/types/jobOrderEnums";

export const JOB_TYPES_SUMMARY = [
	"Logistics Services",
	"Regulatory Services",
] as const;
export type JobTypeSummary = (typeof JOB_TYPES_SUMMARY)[number];

export const JOB_TYPES = ["LOGISTICS", "REGULATORY"] as const;
export type JobType = (typeof JOB_TYPES)[number];

export const CARGO_TYPES = ["CONTAINERIZED", "LCL"] as const;
export type CargoType = (typeof CARGO_TYPES)[number];

interface BaseJobOrder<T extends JobType> {
	id: number;
	reference_number: string;
	quotation_id: number;
	as_id: number;
	operations_id: number | null;
	finance_id: number | null;
	subject: string;
	email_body: string;
	client: Client;
	created_at: string;
	updated_at: string;
	quotation_file: QuotationFile;
	documents: Document[];
	job_type: T;
}

export interface LogisticsJobOrder extends BaseJobOrder<"LOGISTICS"> {
	service: LogisticsService;
	shipment: Shipment;
	target: Target;
	billing_details: BillingDetails;
}

export interface RegulatoryJobOrder
	extends Omit<BaseJobOrder<"REGULATORY">, "client"> {
	client: Client & {
		service_type: string;
	};
	shipment: null;
	target: null;
	billing_details: null;
}

export type JobOrder = LogisticsJobOrder | RegulatoryJobOrder;

export interface Client {
	consignee: string;
	shipper: string;
	client_type: ClientType;
	accredited: AccreditedType;
	remarks: string;
}

export interface LogisticsService {
	service_level: ServiceLevelType;
	bl_no: string;
	eta: string;
	etd: string;
}

export interface Shipment {
	commodity: string;
	cargo_type: CargoType;
	container_size: string | null;
	hs_code: string | null;
	rod: string | null;
	permits: string | null;
	if_coordinated: string | null;
	special_remarks: string | null;
}

export interface Target {
	target_delivery_date: string;
	target_completion_date: string | null;
	special_remarks: string;
}

export interface BillingDetails {
	terms_of_payment: string;
	billing_date: string | null;
	shall_be_billed: BillingType;
}

export interface QuotationFile {
	id: number;
	file_name: string;
	file_url: string;
	file_type: string;
}

export interface Document {
	id: number;
	file_name: string;
	file_url: string;
	file_type: string;
}

export interface JobOrderSummary {
	id: number;
	reference_number: string;
	service: JobTypeSummary;
	client: string;
	date_created: string;
	quotation_id: number;
	quotation_reference_number: string;
	assigned_to: "Available" | (string & {});
	reassignment_request_id: number | null;
}

export interface JobOrderResponse {
	job_orders: JobOrderSummary[];
	my_job_orders: JobOrderSummary[] | null;
}

interface CreateJobOrderBaseRequestBody<T extends JobType> {
	quotation_reference_number: string;
	job_type: T;
	subject: {
		subject: string;
		email_body: string;
	};
	client: {
		client_type: ClientType;
		accredited: AccreditedType;
		remarks: string;
	};
}

export interface CreateLogisticsJobOrderRequestBody
	extends CreateJobOrderBaseRequestBody<"LOGISTICS"> {
	service: {
		service_level: string;
		bl_no: string;
		eta: string;
		etd: string;
	};
	shipment: {
		hs_code: string;
		rod: string;
		permits: string;
		if_coordinated: string;
		special_remarks: string;
	};
	target: {
		delivery_date: string;
		completion_date: string;
		special_remarks: string;
	};
	billing: {
		terms_of_payment: string;
		billing_date: string;
		shall_be_billed: string;
	};
}

export interface CreateRegulatoryJobOrderRequestBody
	extends CreateJobOrderBaseRequestBody<"REGULATORY"> {
	client: CreateJobOrderBaseRequestBody<"REGULATORY">["client"] & {
		service_type: string;
	};
}

export type CreateJobOrderRequestBody =
	| CreateLogisticsJobOrderRequestBody
	| CreateRegulatoryJobOrderRequestBody;

interface SummaryCardContent {
	label: string;
	value?: string | null;
}

export interface SummaryCardData {
	title: string;
	renderIcon: () => ReactNode;
	content: SummaryCardContent[];
}

export type SummaryItem =
	| { type: "subject"; key: "subject" }
	| { type: "summary"; key: string; item: SummaryCardData };
