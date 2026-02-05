import Container20 from "../assets/get_quote/container20.png";
import Container40 from "../assets/get_quote/container40.png";

export type StringKeys =
  | "consignee"
  | "company_address"
  | "contact_person"
  | "contact_number"
  | "email";

export type Field = {
  label: string;
  key: StringKeys;
};

export type CompanyData = {
  consignee?: string;
  company_address?: string;
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
  commmodity?: string;
  cargo_type?: string;
  container_size?: string;
};

export type Shipment = {
  origin?: string;
  destination?: string;
};

export type QuoteForm = {
  company?: CompanyData;
  service?: ServiceData;
  commodity?: Commodity;
  shipment?: Shipment;
};

export const initialQuoteForm: QuoteForm = {
  company: {
    consignee: "",
    company_address: "",
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
    commmodity: "",
    cargo_type: "",
    container_size: "",
  },
  shipment: {
    origin: "",
    destination: "",
  },
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
