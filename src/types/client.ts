import Container20 from "../assets/get_quote/container20.png";
import Container40 from "../assets/get_quote/container40.png";

// Quotation

export type QuoteForm = {
  account_specialist: string;
  company?: CompanyData;
  service?: ServiceData;
  commodity?: Commodity;
  shipment?: Shipment;
  documents?: ClientFile[];
  remove_documents?: (string | number)[];
};

export type QuotesParams = {
  status?: "REQUESTED" | "RESPONDED";
  search?: string;
};

export type QuoteParam = {
  id?: number;
};

export type StringKeys =
  | "name"
  | "address"
  | "contact_person"
  | "contact_number"
  | "email";

export type Field = {
  label: string;
  key: StringKeys;
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
  contact_number?: string;
  email?: string;
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

export const initialQuoteForm: QuoteForm = {
  account_specialist: "",
  company: {
    name: "",
    address: "",
    contact_person: "",
    contact_number: "",
    email: "",
  },
  service: {
    type: "",
    transport_mode: "",
    options: [],
  },
  commodity: {
    commodity: "",
    cargo_type: "",
    cargo_volume: 1,
    container_size: "",
  },
  shipment: {
    origin: "",
    destination: "",
  },
  documents: [],
};

export type FieldConfig = {
  label: string;
  key: keyof CompanyData;
  required: true;
};

export const transpoMode = ["SEA", "AIR"];
export const serviceType = ["IMPORT", "EXPORT", "BUSINESS SOLUTION"];
export const options = [
  "CUSTOMS CLEARANCE",
  "PEZA PROCESSING & COMPLIANCE",
  "CUSTOMS DISPUTE RESOLUTIONS",
  "POST CLEARANCE SERVICE",
  "SPECIALIZED ENTRY TYPES",
  "CUSTOMS AND TRADE CONSULTANCY",
  "INTERNATIONAL FREIGHT FORWARDING",
  "DOMESTIC FREIGHT FORWARDING",
  "TRUCKINGS SERVICES",
  "PROJECT CARGO",
];
export const commodities = ["CASTABLE 16 REFRACTOR"];
export const cargo_type = ["CONTAINERIZED", "LCL"];
export const container_size = [
  { image: Container20, size: "1x20" },
  { image: Container40, size: "1x40" },
];

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
  status: "REQUESTED" | "PENDING" | "COMPLETED"; // Add other status strings as needed
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
