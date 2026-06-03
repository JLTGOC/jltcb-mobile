import type {
  LogisticsServiceType,
  LogisticsTransportMode,
} from "./quotations";

export interface ShipmentListResponse {
  ops_names: OperationsNames[];
  shipments: ShipmentSummary[];
  pagination: Pagination;
}

type OperationsNames = string;

export interface ShipmentSummary extends BaseShipment {
  general_info: {
    id: number;
    reference_number: string;
    job_order_id: number;
    client: string;
    company_name: string;
    person_in_charge: string;
    person_in_charge_full_name: string | null;
    person_in_charge_image: string | null;
    status: ShipmentStatus;
    commodity: string;
    date: string;
  };
  shipment_information: {
    bl_number: string | null;
    origin: string;
    destination: string;
    eta: string | null;
    etd: string | null;
    service_type: LogisticsServiceType | null;
    service_level: string | null;
    transport_mode: LogisticsTransportMode | null;
    account_handler: string;
    created_at: string;
    updated_at: string;
  };
}

export interface ShipmentDetails extends BaseShipment {
  general_info: {
    id: number;
    reference_number: string;
    job_order_id: number;
    quotation_id: number;
    client: Client;
    person_in_charge: PersonInChargeDetails;
    status: ShipmentStatus;
    date: string;
  };
  commodity_details: {
    commodity: string;
    cargo_type: string;
    container_size: string | null;
  };
  shipment_information: {
    bl_number: string | null;
    origin: string;
    destination: string;
    eta: string | null;
    etd: string | null;
    sub_services: string[];
    service_type: LogisticsServiceType | null;
    service_level: string | null;
    transport_mode: LogisticsTransportMode | null;
    account_handler: string;
    remarks: string | null;
  };
  consignee_details: {
    company_name: string;
    company_address: string | null;
    contact_person: string;
    contact_number: string;
    email: string;
  };
  history: ActivityHistoryItem[];
}

export interface BaseShipment {
  total_quotation_files: number;
  total_client_documents: number;
  quotation_proposals: Document<"PROPOSAL">[];
  client_documents: Document<"REQUESTED">[];
}

export type ShipmentStatus =
  | "NOT YET DEPARTED"
  | "IN TRANSIT"
  | "ARRIVED"
  | "BERTHED"
  | "DISCHARGED"
  | "DELIVERED";

interface Client {
  id: number;
  full_name: string;
  company_name: string;
  contact_number: string;
  email: string;
  image_path: string;
}

interface PersonInChargeDetails {
  username: string;
  role: string | null;
  full_name: string | null;
  image_path: string | null;
  email: string | null;
  contact_number: string | null;
}

interface Document<T extends "PROPOSAL" | "REQUESTED"> {
  id: number;
  uploaded_by: number;
  quotation_id: number;
  file_url: string;
  file_type: string;
  type: T;
  file_name: string;
  created_at: string;
  updated_at: string;
}

interface Pagination {
  prev_cursor: string | null;
  next_cursor: string | null;
  prev_page_url: string | null;
  next_page_url: string | null;
}

interface ActivityHistoryItem {
  id: number;
  action: string;
  user: string;
  datetime: string;
}
