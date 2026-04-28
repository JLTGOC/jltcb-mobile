// Quotation Types

export type QuoteForm = {
  id: (string | number)[];
  account_specialist: string;
  removed_documents?: (string | number)[];
  reference_number?: string;
  status: string;
  remarks?: string;
  services?: string;
  company?: CompanyData;
  service?: ServiceData;
  commodity?: Commodity;
  shipment?: Shipment;
  documents?: ClientFile[];
  quotation_file?: Quotationfile[];
};

export type BaseQuotesListItem = {
  client_name: string;
  commodity: string;
  date: string;
  id: number;
  reference_number: string;
  status: "NEW" | "ACCEPTED";
  conversation_id: string | null;
};

export interface AcceptedQuoteItem extends BaseQuotesListItem {
  status: "ACCEPTED";
  conversation_id: string;
}

export interface NewQuoteItem extends BaseQuotesListItem {
  status: "NEW";
  conversation_id: string | null;
}

export type QuotesListItem = AcceptedQuoteItem | NewQuoteItem;

export type QuotesParams = {
  status?: "REQUESTED" | "RESPONDED";
  search?: string;
};

export type QuoteParam = {
  id?: number;
};

export type StringKeys =
  | "company_name"
  | "company_address"
  | "contact_person"
  | "cp_contact_number"
  | "email"
  | "full_name"
  | "position"
  | "contact_number"
  | "business_type";

export type Field = {
  label: string;
  key: StringKeys;
};

export type Quotationfile = {
  id: number;
  file_name: string;
  file_url: string;
  file_type: string;
};

export type ClientFile = {
  id: number;
  file_name: string;
  file_url: string;
  mimeType: string;
};

export type CompanyData = {
  name?: string;
  address?: string;
  contact_person?: string;
  email?: string;
  position?: string;
  contact_number?: string;
  business_type?: string;
};

export type ServiceData = {
  type?: string;
  transport_mode?: string;
  options?: string[];
};

export type Commodity = {
  commodity?: string;
  cargo_type?: string;
  cargo_volume?: number;
  container_size?: string;
};

export type Shipment = {
  origin?: string;
  destination?: string;
};

export type FieldConfig = {
  label: string;
  key: keyof CompanyData;
  required: boolean;
};

export type ConsigneeDetails = {
  company_address: string;
  company_name: string;
  contact_number: string;
  contact_person: string;
  email: string;
};

export type GeneralInfo = {
  account_specialist_id: number;
  client_id: number;
  reference_number: string;
  status: "REQUESTED" | "PENDING" | "COMPLETED";
};

export type ShipmentDetails = {
  commodity: string;
  created_at: string;
  destination: string;
  origin: string;
  service_type: string;
  transport_mode: string;
  updated_at: string;
  volume: string;
};

export type ClientQuoteResponse = {
  consignee_details: ConsigneeDetails;
  general_info: GeneralInfo;
  shipment_details: ShipmentDetails;
};

export type QuoteEnums = {
  autofill_details?: {
    full_name?: string;
    company?: {
      address?: string;
      contact_number?: string;
      email?: string;
    };
  };
  autofill_names?: string[];
  business_types?: string[];
  regulatory_assistance_types?: string[];
  service_types?: string[];
  transport_modes?: string[];
  service_options?: string[];
  cargo_type?: string[];
  container_size?: string[];
};
