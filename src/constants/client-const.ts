import type { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";

import Container20 from "@/assets/get_quote/container20.png";
import Container40 from "@/assets/get_quote/container40.png";
import type { FieldConfig, QuoteForm } from "@/types/client-quotation";

// Initial Form - used for populating the form
export const initialQuoteForm: QuoteForm = {
  id: [],
  account_specialist: "",
  removed_documents: [],
  reference_number: "",
  status: "",
  remarks: "",
  services: "",
  company: {
    company_name: "",
    company_address: "",
    contact_person: "",
    cp_contact_number: "",
    email: "",
    full_name: "",
    position: "",
    contact_number: "",
    business_type: "",
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

type StepConfig = {
  section: keyof QuoteForm;
  fields: FieldConfig[];
};

const regulatoryCompanyFields: FieldConfig[] = [
  { label: "FULL NAME", key: "full_name", required: true },
  { label: "COMPANY NAME", key: "company_name", required: true },
  { label: "COMPANY ADDRESS", key: "company_address", required: true },
  { label: "POSITION", key: "position", required: true },
  { label: "CONTACT NUMBER", key: "contact_number", required: true },
  { label: "EMAIL", key: "email", required: true },
  { label: "CONTACT PERSON", key: "contact_person", required: false },
  {
    label: "CONTACT PERSON's CONTACT NUMBER",
    key: "cp_contact_number",
    required: false,
  },
];

const logisticsCompanyFields: FieldConfig[] = [
  { label: "CONSIGNEE", key: "company_name", required: true },
  { label: "COMPANY ADDRESS", key: "company_address", required: true },
  { label: "CONTACT PERSON", key: "contact_person", required: true },
  { label: "CONTACT NUMBER", key: "cp_contact_number", required: true },
  { label: "EMAIL", key: "email", required: true },
];

export const getStepConfigs = (
  formData: QuoteForm,
): Record<number, StepConfig> => {
  const isRegulatory = formData.service?.transport_mode === "REGULATORY";

  return {
    0: {
      section: "company",
      fields: isRegulatory ? regulatoryCompanyFields : logisticsCompanyFields,
    },
    1: {
      section: "service",
      fields: [],
    },
    2: {
      section: "commodity",
      fields: [],
    },
  };
};

// Constants
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
] as const;
export const commodities = ["CASTABLE 16 REFRACTOR"];
export const cargo_type = ["CONTAINERIZED", "LCL"];

export type ContainerSize = "1x20" | "1x40";
export interface ContainerSizeOption {
  image: ImageSourcePropType;
  size: ContainerSize;
  style?: StyleProp<ViewStyle>;
}
export const container_sizes: ContainerSizeOption[] = [
  { image: Container20, size: "1x20", style: { width: 48, height: 48 } },
  { image: Container40, size: "1x40", style: { width: 72, height: 53 } },
] as const;
