import type { ElementType } from "react";

export interface ASRequestedQuotation {
	name: string;
	request_count: number;
	quotations: Quotation[];
}

export interface ASRespondedQuotation {
	id: number;
  client_name: string;
	reference_number: string;
	commodity: string;
	date: string;
	status: "RESPONDED";
}

export interface Quotation {
	id: number;
	date: string;
	contact_person: string;
	commodity: string;
}

export interface QuotationDetails {
  reference_number: string
  client: string
  account_specialist: string
  status: string
  created_at: string
  updated_at: string
  company: Company
  service: Service
  commodity: Commodity
  shipment: Shipment
  documents: Document[]
}

export interface Company {
  name: string
  address: string
  contact_person: string
  contact_number: string
  email: string
}

export interface Service {
  type: string
  transport_mode: string
  options: string
}

export interface Commodity {
  commodity: string
  cargo_type: string
  cargo_volume: string
  container_size: string
}

export interface Shipment {
  origin: string
  destination: string
}

export interface Document {
  id: number
  file_name: string
  file_url: string
}

export type QuotationStatus = "REQUESTED" | "RESPONDED";

export interface QuotationFilter<T extends QuotationStatus = QuotationStatus> {
	filter: T;
	search?: string;
}

export interface QuotationDetailsSection {
	icon: ElementType;
	title: string;
	details: [string, unknown][];
}
