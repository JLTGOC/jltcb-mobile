import type { FC } from "react";
import type { SvgProps } from "react-native-svg";

import type { ContainerSize, options } from "@/constants/client-const";
import type { ClientType } from "@/types/jobOrderEnums";

import type { File } from ".";
import type { CargoType, JobType } from "./job-order";

export const ASSIGNMENT_STATUSES = [
  "AVAILABLE",
  "REASSIGNMENT REQUESTED",
  "ASSIGNED",
] as const;
export type AssignmentStatus = (typeof ASSIGNMENT_STATUSES)[number];

export const LOGISTICS_SERVICE_TYPES = ["IMPORT", "EXPORT"] as const;
export type LogisticsServiceType = (typeof LOGISTICS_SERVICE_TYPES)[number];

export const LOGISTICS_TRANSPORT_MODES = ["SEA", "AIR"] as const;
export type LogisticsTransportMode = (typeof LOGISTICS_TRANSPORT_MODES)[number];

export type LogisticsServiceOptions = (typeof options)[number];

export interface ClientQuotationListSummary<
  T extends "REQUESTED" | "RESPONDED",
> {
  id: number;
  status: T extends "REQUESTED" ? "NEW" : T;
  reference_number: string;
  commodity: string;
  date: string;
  conversation_id: string | null;
  reassignment_request_id: number | null;
}

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
  issued_quotation_id: number | null;
  commodity: string;
  date: string;
  conversation_id: string | null;
  prepared_by: string;
  reassignment_request_id: number | null;
} & BaseQuotationServiceDetails;

type ReassignmentDetails =
  | {
      reassignment_request_id: number;
      requested_at: string;
    }
  | { reassignment_request_id: null; requested_at: null };

interface LogisticsServiceSummary {
  commodity: string;
  service_level: LogisticsServiceType;
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
} & ReassignmentDetails &
  RequestedQuotationAssignmentDetails &
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
  job_order: {
    reference_number: string | null;
    person_in_charge: string | null;
  };
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
  type: LogisticsServiceType;
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
  client_id?: number;
}

export interface QuotationDetailsSection {
  icon: FC<SvgProps>;
  title: string;
  details: string[][];
}

export interface ReassignASRequestBody {
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
    type: LogisticsServiceType;
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

export interface QuotationListQueryFilter {
  status?: QuotationStatus;
}

export type QuotationListQueryParams = {
  search?: string;
  filter?: QuotationListQueryFilter;
  client_id?: number;
};

export type QuotationFileType = "REQUESTED" | "PROPOSAL";

export type FetchQuoteParamsByService<T extends JobType> = T extends "LOGISTICS"
  ? {
      service: "LOGISTICS";
      service_type?: LogisticsServiceType;
    }
  : T extends "REGULATORY"
    ? {
        service: "REGULATORY";
        service_type: "BUSINESS SOLUTION";
      }
    : never;
